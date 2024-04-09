const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", (event) => {
  console.log("Connected with the server");
  socket.send("Hello Server!");
});

socket.addEventListener("error", (event) => {
  console.log(event);
});

socket.addEventListener('message', (event) => {
  console.log(event.data);
})