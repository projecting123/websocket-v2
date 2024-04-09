// Craete a server for serving one html file, one js file and one css file by express server

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
