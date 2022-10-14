const io = require("socket.io")({
  cors: {
    origin: "https://192.168.0.45:8080",
    methods: ["GET", "POST"],
  },
});

const socketio = {
  io: io,
};

io.on("connection", (socket) => {
  console.log("Socket Connected!");
  socket.broadcast.emit("welcome");

  socket.on("user-send", (data) => {
    console.log("socket.on ~ data", data);

    io.emit("broadcast", data);
  });
});

io.on("disconnect", () => {
  console.log("user disconnected");
});

module.exports = socketio;
