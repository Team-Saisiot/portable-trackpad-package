const app = require("../app");

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("user-send", (data) => {
    console.log("socket.on ~ data", data);
    app.io.emit("broadcast", data);
  });
});

module.exports = app.io;
