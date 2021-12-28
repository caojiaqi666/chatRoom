const Koa = require("koa");
const app = new Koa();
const { resolve } = require("path");
const views = require("koa-views");
const koaStatic = require("koa-static");
const koaBody = require("koa-body");
const router = require("./routes/router");
app
  // 加载模板渲染模块
  .use(
    views(resolve(__dirname, "views"), {
      extension: "pug",
      // 指定摸板引擎类型
    })
  )
  // 加载静态资源模块
  // .use(koaStatic(resolve(__dirname + "static")))  注意不是+!!!!!!!!!!!!!
  .use(koaStatic(resolve(__dirname, "static")))
  // 加载post请求数据解析模块
  .use(koaBody())
  // 加载路由模块
  .use(router.routes())
  // 加载自定义中间件-用来处理404情况
  .use(async (ctx, next) => {
    // await next();
    if (ctx.status === 404) {
      ctx.body = "那咋妹找到呢~";
    } else if (ctx.status >= 500) {
      ctx.body = "服务器开小差了,请稍候再试~";
    }
  });

app.listen(4000);
