const login = async (ctx) => {
  ctx.body = ctx.request.body;
  const { username, passwd } = ctx.request.body;
  console.log("username, passwd: ", username, passwd);
  

};

module.exports = {
  login,
};
