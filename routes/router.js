const r = require("koa-router")();
const get = require("../control/get");

r.get("/", get.login);

r.get("/chat", get.chat)

module.exports = r;
