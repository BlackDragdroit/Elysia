import URL from "./data.js";

const URL_BOSS = URL + "/api/boss/";

const response = fetch(URL_BOSS, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    ACCEPT: "application/json",
  },
  body: JSON.stringify({}),
});
