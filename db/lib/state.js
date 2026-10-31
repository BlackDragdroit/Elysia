// Load a user's full game state into the plain shape the shared rules work on,
// and persist the mutated state back to Mongo.
const rules = require("../../shared/gameRules");
const User = require("../models/User");
const Quest = require("../models/Quest");
const Boss = require("../models/Boss");
const UserAchievement = require("../models/UserAchievement");
const InventoryItem = require("../models/InventoryItem");

async function loadUserState(userId) {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  const [quests, bosses, achievements, inventory] = await Promise.all([
    Quest.find({ userId }),
    Boss.find({ userId }),
    UserAchievement.find({ userId }),
    InventoryItem.find({ userId }),
  ]);

  const state = {
    profile: {
      displayName: user.displayName,
      username: user.username,
      totalXP: user.totalXP,
      stats: {
        questsCompleted: user.stats.questsCompleted,
        epicQuestsCompleted: user.stats.epicQuestsCompleted,
        bossesDefeated: user.stats.bossesDefeated,
      },
      equipped: { icon: user.equipped.icon, title: user.equipped.title },
    },
    quests: quests.map((q) => q.toJSON()),
    bosses: bosses.map((b) => b.toJSON()),
    achievements: achievements.map((a) => ({
      id: a.achievementId,
      unlockedAt: a.unlockedAt.toISOString(),
    })),
    inventory: inventory.map((i) => ({
      itemId: i.itemId,
      quantity: i.quantity,
      equipped: i.equipped,
    })),
  };

  return {
    user,
    docs: { user, quests, bosses, achievements, inventory },
    state,
  };
}

// Write back the parts of state that the shared rules mutate.
async function persistUserState(userId, docs, state) {
  const { user, quests, bosses, inventory } = docs;

  user.totalXP = state.profile.totalXP;
  user.stats = state.profile.stats;
  user.equipped = state.profile.equipped;
  user.displayName = state.profile.displayName;
  await user.save();

  // Quests
  for (const q of state.quests) {
    const doc = quests.find((d) => d.id === q.id);
    if (doc) {
      doc.completed = q.completed;
      doc.completedAt = q.completedAt ? new Date(q.completedAt) : null;
      await doc.save();
    }
  }

  // Bosses
  for (const b of state.bosses) {
    const doc = bosses.find((d) => d.id === b.id);
    if (doc) {
      doc.defeated = b.defeated;
      doc.defeatedAt = b.defeatedAt ? new Date(b.defeatedAt) : null;
      for (const s of b.steps) {
        const stepDoc = doc.steps.id(s.id);
        if (stepDoc) {
          stepDoc.completed = s.completed;
          stepDoc.completedAt = s.completedAt ? new Date(s.completedAt) : null;
        }
      }
      await doc.save();
    }
  }

  // Achievements (append-only)
  for (const a of state.achievements) {
    if (!docs.achievements.some((d) => d.achievementId === a.id)) {
      await UserAchievement.create({
        userId,
        achievementId: a.id,
        unlockedAt: new Date(a.unlockedAt),
      });
    }
  }

  // Inventory (sync)
  const desired = new Map(state.inventory.map((e) => [e.itemId, e]));
  for (const doc of inventory) {
    const want = desired.get(doc.itemId);
    if (!want) {
      await doc.deleteOne();
    } else if (doc.quantity !== want.quantity || doc.equipped !== want.equipped) {
      doc.quantity = want.quantity;
      doc.equipped = want.equipped;
      await doc.save();
    }
  }
  for (const [itemId, want] of desired) {
    if (!inventory.some((d) => d.itemId === itemId)) {
      await InventoryItem.create({
        userId,
        itemId,
        quantity: want.quantity,
        equipped: want.equipped,
      });
    }
  }
}

function profileResponse(state) {
  const li = rules.levelInfo(state.profile.totalXP);
  return {
    displayName: state.profile.displayName,
    username: state.profile.username,
    totalXP: state.profile.totalXP,
    level: li.level,
    xpIntoLevel: li.xpIntoLevel,
    xpForNext: li.xpForNext,
    stats: state.profile.stats,
    equipped: state.profile.equipped,
  };
}

function inventoryResponse(state) {
  return state.inventory.map((e) => ({
    item: rules.ITEMS_BY_ID[e.itemId],
    quantity: e.quantity,
    equipped: e.equipped,
  }));
}

module.exports = {
  loadUserState,
  persistUserState,
  profileResponse,
  inventoryResponse,
};
