const r = require("koa-router")();
const get = require("../control/get");
const post = require("../control/post");

r.get("/", get.login);

r.get("/chat", get.chat)

// 首页登录验证接口
r.post("/", post.login)

module.exports = r;
