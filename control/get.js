const login = async (ctx) => {
  // ctx.body = "hello world!";
  await ctx.render("login");
};

const chat = async (ctx) => {
  // ctx.body = "welcome";
  await ctx.render("chat");
};

module.exports = {
  login,
  chat,
};
