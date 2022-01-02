const WebSocket = require('ws')

let wss = new WebSocket.Server({
  port: 4001
})
// 连接上的用户信息都在wss.clinents下<Array>

// 用户连接响应事件 客户端、req为请求头
wss.on("connection", (ws, req) => {
  console.log("有用户连接了");

  // 用户发送消息触发
  ws.on("message", msg => {
    console.log("有用户发送消息", msg.toString());
    wss.clients.forEach(client => {
      client.send(`${msg.toString()}加入了聊天室`)
    })
  })

  // 用户断开连接触发事件
  ws.on("close", msg => {
    console.log("有用户断开连接", msg);
    wss.clients.forEach(client => {
      client.send(`${msg.toString()}退出了聊天室`)
    })
  })

  // 发送消息到客户端
  // setTimeout(() => {
  //   ws.send("aaa")
  // }, 1000);


})

module.exports = WebSocket

// 在客户端
// let ws = new WebSocket("ws://localhost:4001")

// 获取服务端发来的消息
// ws.onmessage = (e) => {console.log(e.data)}

// 发送消息到服务端
// ws.send("111111")






