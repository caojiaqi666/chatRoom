const login = async (ctx) => {
  // ctx.body = "hello world!";
  await ctx.render("login");
};

const chat = async (ctx) => {
  ctx.body = "welcome";
};

module.exports = {
  login,
  chat,
};
