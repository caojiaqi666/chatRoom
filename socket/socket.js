// 监听到同一个端口
const WebSocket = require("ws");
const cookie = require("cookie");
const UserModel = require("../model/UserModel")

let createSocket = (server) => {
  let wss = new WebSocket.Server({
    server,
  });
  // 用户连接响应事件 客户端、req为请求头
  wss.on("connection", (ws, req) => {
    console.log("🚀 ~ file: socket.js ~ line 12 ~ wss.on ~ req", req)
    // req里有cookie信息,npm i cookie格式化cookie值
    let { username } = cookie.parse(req.headers.cookie);
    ws.id = username;
    // 修改数据库
  
  
  
  
  });
};

module.exports = createSocket;
