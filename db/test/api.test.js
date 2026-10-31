const test = require("node:test");
const assert = require("node:assert/strict");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");

process.env.JWT_SECRET = "test-secret";

const app = require("../app");
// Deterministic loot: always rolls a drop and always picks ITEMS[0] (xp_potion_small).
app.set("rng", () => 0);

let mongo;

test.before(async () => {
  // MongoDB publishes no Windows ARM64 builds; on WoA the x64 binary runs via emulation.
  const binary =
    process.platform === "win32" && process.arch === "arm64"
      ? { arch: "x64" }
      : undefined;
  mongo = await MongoMemoryServer.create({ binary });
  await mongoose.connect(mongo.getUri());
});

test.after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

const auth = (token) => ({ Authorization: `Bearer ${token}` });

async function register(username = "hero", password = "secret1", displayName = "Hero") {
  return request(app).post("/api/auth/register").send({ username, password, displayName });
}

test("register returns token + profile, login works", async () => {
  const reg = await register();
  assert.equal(reg.status, 201);
  assert.ok(reg.body.token);
  assert.equal(reg.body.profile.username, "hero");
  assert.equal(reg.body.profile.level, 1);
  assert.equal(reg.body.profile.totalXP, 0);

  const login = await request(app)
    .post("/api/auth/login")
    .send({ username: "HERO", password: "secret1" });
  assert.equal(login.status, 200);
  assert.ok(login.body.token);
});

test("duplicate username (case-insensitive) gives 409", async () => {
  const res = await register("Hero");
  assert.equal(res.status, 409);
});

test("bad password gives 401", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ username: "hero", password: "wrong" });
  assert.equal(res.status, 401);
});

test("short password gives 400", async () => {
  const res = await register("shorty", "123");
  assert.equal(res.status, 400);
});

test("requests without a token get 401", async () => {
  assert.equal((await request(app).get("/api/profile")).status, 401);
  assert.equal((await request(app).get("/api/quests")).status, 401);
});

test("health endpoint is public", async () => {
  const res = await request(app).get("/api/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
});

test("user A cannot read/complete/delete user B's quest (404)", async () => {
  const b = (await register("userb")).body.token;
  const created = await request(app)
    .post("/api/quests")
    .set(auth(b))
    .send({ title: "B's quest", difficulty: "easy", type: "core" });
  assert.equal(created.status, 201);
  const qid = created.body.id;

  const a = (await register("usera")).body.token;
  const aQuests = await request(app).get("/api/quests").set(auth(a));
  assert.ok(!aQuests.body.some((q) => q.id === qid));
  assert.equal(
    (await request(app).post(`/api/quests/${qid}/complete`).set(auth(a))).status,
    404
  );
  assert.equal(
    (await request(app).delete(`/api/quests/${qid}`).set(auth(a))).status,
    404
  );
});

test("quest create -> complete flow returns an outcome", async () => {
  const token = (await register("quester")).body.token;
  const created = await request(app)
    .post("/api/quests")
    .set(auth(token))
    .send({ title: "Epic thing", difficulty: "epic", type: "core" });
  assert.equal(created.status, 201);

  const done = await request(app)
    .post(`/api/quests/${created.body.id}/complete`)
    .set(auth(token));
  assert.equal(done.status, 200);
  const { outcome } = done.body;
  assert.ok(outcome.xpGained >= 1000); // epic base XP (plus achievement XP)
  assert.equal(done.body.quest.completed, true);
  assert.ok(outcome.unlockedAchievements.some((a) => a.id === "first_quest"));
  assert.ok(outcome.unlockedAchievements.some((a) => a.id === "epic_win"));
  assert.equal(outcome.rewards.length, 1); // epic = guaranteed drop
  assert.equal(outcome.rewards[0].id, "xp_potion_small");

  // completing twice -> 409
  const again = await request(app)
    .post(`/api/quests/${created.body.id}/complete`)
    .set(auth(token));
  assert.equal(again.status, 409);
});

test("invalid quest payload gives 400", async () => {
  const token = (await register("invalid")).body.token;
  assert.equal(
    (await request(app).post("/api/quests").set(auth(token)).send({ title: "" })).status,
    400
  );
  assert.equal(
    (
      await request(app)
        .post("/api/quests")
        .set(auth(token))
        .send({ title: "x", difficulty: "legendary" })
    ).status,
    400
  );
});

test("boss steps -> defeat flow", async () => {
  const token = (await register("slayer")).body.token;
  const boss = await request(app)
    .post("/api/bosses")
    .set(auth(token))
    .send({ title: "Learn Spanish", steps: ["vocab", "grammar", "speak"] });
  assert.equal(boss.status, 201);
  assert.equal(boss.body.steps.length, 3);

  // step ids
  const [s0, s1, s2] = boss.body.steps.map((s) => s.id);
  const r1 = await request(app)
    .post(`/api/bosses/${boss.body.id}/steps/${s0}/complete`)
    .set(auth(token));
  assert.equal(r1.status, 200);
  assert.equal(r1.body.boss.defeated, false);
  assert.equal(r1.body.outcome.xpGained, 150);

  await request(app)
    .post(`/api/bosses/${boss.body.id}/steps/${s1}/complete`)
    .set(auth(token));
  const r3 = await request(app)
    .post(`/api/bosses/${boss.body.id}/steps/${s2}/complete`)
    .set(auth(token));
  assert.equal(r3.body.boss.defeated, true);
  assert.ok(r3.body.outcome.xpGained >= 150 + 1000);
  assert.ok(r3.body.outcome.rewards.some((r) => r.id === "xp_potion_small"));
  assert.ok(r3.body.outcome.rewards.some((r) => r.id === "title_boss_slayer"));
  assert.ok(
    r3.body.outcome.unlockedAchievements.some((a) => a.id === "dragon_slayer")
  );

  // repeat completion -> 409
  assert.equal(
    (
      await request(app)
        .post(`/api/bosses/${boss.body.id}/steps/${s0}/complete`)
        .set(auth(token))
    ).status,
    409
  );
});

test("boss with fewer than 2 steps gives 400", async () => {
  const token = (await register("weakboss")).body.token;
  const res = await request(app)
    .post("/api/bosses")
    .set(auth(token))
    .send({ title: "Solo", steps: ["only one"] });
  assert.equal(res.status, 400);
});

test("inventory use/equip", async () => {
  const token = (await register("collector")).body.token;

  // epic quest = guaranteed drop -> xp_potion_small (rng = 0)
  const q = await request(app)
    .post("/api/quests")
    .set(auth(token))
    .send({ title: "epic", difficulty: "epic" });
  await request(app).post(`/api/quests/${q.body.id}/complete`).set(auth(token));

  // boss -> dragon_slayer reward title_boss_slayer + guaranteed drop
  const b = await request(app)
    .post("/api/bosses")
    .set(auth(token))
    .send({ title: "b", steps: ["a", "b"] });
  for (const s of b.body.steps) {
    await request(app)
      .post(`/api/bosses/${b.body.id}/steps/${s.id}/complete`)
      .set(auth(token));
  }

  const inv = await request(app).get("/api/inventory").set(auth(token));
  assert.equal(inv.status, 200);
  const potion = inv.body.find((e) => e.item.id === "xp_potion_small");
  assert.ok(potion.quantity >= 1);

  const before = (await request(app).get("/api/profile").set(auth(token))).body.totalXP;
  const used = await request(app)
    .post("/api/inventory/xp_potion_small/use")
    .set(auth(token));
  assert.equal(used.status, 200);
  assert.equal(used.body.outcome.xpGained, 100);
  const after = (await request(app).get("/api/profile").set(auth(token))).body.totalXP;
  assert.equal(after - before, 100);

  const equip = await request(app)
    .post("/api/inventory/title_boss_slayer/equip")
    .set(auth(token));
  assert.equal(equip.status, 200);
  assert.equal(equip.body.equipped.title, "Boss Slayer");
  const profile = (await request(app).get("/api/profile").set(auth(token))).body;
  assert.equal(profile.equipped.title, "Boss Slayer");
});

test("achievements catalog lists unlocked state", async () => {
  const token = (await register("achiever")).body.token;
  const list = await request(app).get("/api/achievements").set(auth(token));
  assert.equal(list.status, 200);
  assert.ok(list.body.length >= 9);
  assert.ok(list.body.every((a) => a.unlocked === false));
});
