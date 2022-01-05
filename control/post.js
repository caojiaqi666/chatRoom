const UserModel = require("../model/UserModel.js");
// require模块，模块里的代码才会执行

const writeCookie = (ctx, name, pass) => {
  const cookieConfig = {
    domain: "localhost", // 在这个域名中生效
    path: "/", 
    maxAge: 36e5, 
    httpOnly: true, // 前端是否可见
    overwrite: false, //前端不可重写
  }
  // 不允许写中文，需要decode
  let deName = encodeURIComponent(name)
  let dePass = encodeURIComponent(pass)
  ctx.cookies.set("username", deName, cookieConfig)
  ctx.cookies.set("passwd", dePass, cookieConfig)

  ctx.session = {
    deName,
    dePass
  }
}

const login = async (ctx) => {
  const { username, passwd } = ctx.request.body;

  let user = await UserModel.findOne({ username });
  if (!user) {
    // 如果用户名还没被使用
    try {
      let u = new UserModel({ username, passwd, online: true });
      await u.save();
      writeCookie(ctx, username, passwd)
      // 重定向到聊天页面
      return (ctx.body = {
        url: "http://localhost:4000/chat",
        state: 0,
        msg: "登录成功",
      });
    } catch (e) {
      console.log("注册失败了");
      return (ctx.body = {
        url: null,
        state: 1,
        msg: "数据存储到数据库失败",
      });
    }
  } else {
    if (passwd !== user.passwd) {
      console.log("密码不对");
      return (ctx.body = {
        url: null,
        state: 2,
        msg: "密码错误",
      });
    }
    // 判断该用户是否在线
    if (user.online) {
      console.log("该用户已在线");
      return (ctx.body = {
        url: null,
        state: 3,
        msg: "该用户已在线",
      });
    }
    console.log("登录成功");
    writeCookie(ctx, username, passwd)
    return (ctx.body = {
      url: "http://localhost:4000/chat",
      state: 0,
      msg: "登录成功",
    });
  }
};

module.exports = {
  login,
};
