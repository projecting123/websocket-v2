
# __Websocket Connection__

## __Note__:
Please see the v1 project at [here](https://github.com/projecting123/websocket-v1) where you all about websocket described.

This is different from the v1 because here we've establishment websocket server on the same http server from where
our html, css and javascript files are being served.
## __Code Example:__
In server:
```js
const express = require("express");
const app = express();
const path = require("path");
const { WebSocketServer, WebSocket } = require("ws");
const fs = require("fs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/js.js", (req, res) => {
  res.sendFile(path.join(__dirname, "js.js"));
});

app.get("/css.css", (req, res) => {
  res.sendFile(path.join(__dirname, "css.css"));
});

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const wss = new WebSocketServer({ server });

fs.watch('./', (eventType, filename) => {
    const isAcceptableFile = filename == "js.js" || filename == "css.css"
    if(isAcceptableFile && eventType == 'change'){
        wss.clients.forEach((client) => {
            if(client.readyState == WebSocket.OPEN){
                client.send('reload')
            }
        })
    }
})
wss.on("connection", (ws) => {
  console.log('Connected successfully.')
});
```

In Client:
```js
const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", (event) => {
  console.log("Connected with the server");
  socket.send("Hello Server!");
});

socket.addEventListener("error", (event) => {
  console.log(event);
});

socket.addEventListener('message', (event) => {
    event.data == 'reload' && location.reload();
})
```