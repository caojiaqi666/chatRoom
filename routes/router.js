const r = require("koa-router")();
const get = require("../control/get");
const post = require("../control/post");

r.get("/", get.login);

// 验证cookie后跳转
r.get("/chat", get.keepLog, get.chat)

// 首页登录验证接口
r.post("/", post.login)

module.exports = r;
