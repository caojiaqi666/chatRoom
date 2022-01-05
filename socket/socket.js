// 监听到同一个端口
const WebSocket = require("ws");
const cookie = require("cookie");
const UserModel = require("../model/UserModel");

let createSocket = (server) => {
  let wss = new WebSocket.Server({
    server,
  });
  // 用户连接响应事件 客户端、req为请求头
  wss.on("connection", async (ws, req) => {
    // req里有cookie信息,npm i cookie格式化cookie值
    let username = decodeURIComponent(
      cookie.parse(req.headers.cookie).username
    );
    ws.id = username;
    // 修改数据库,用户连接后将online设为true
    await UserModel.updateOne({ username }, { online: true });

    // 循环给每位用户推消息
    wss.clients.forEach((client) => {
      client.send(`${username}加入了聊天室`);
    });
    ws.on("message", (msg) => {
      wss.clients.forEach((client) => {
        client.send(`${username}说：${msg.toString()}`);
      });
    });

    ws.on("close", async () => {
      await UserModel.updateOne({ username: ws.id }, { online: false });
      // 循环给每位用户推消息
      wss.clients.forEach((client) => {
        client.send(`${username}退出了聊天室`);
      });
    });
  });
};

module.exports = createSocket;
