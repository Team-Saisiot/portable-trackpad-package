const app = require("../app");
const robot = require("robotjs");

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("user-send", (data) => {
    if (data[data.length - 1] === "s") {
      const { x: xPosition, y: yPosition } = robot.getMousePos();

      robot.moveMouse(xPosition, yPosition + 5);
      app.io.emit("broadcast", data);
    } else if (data[data.length - 1] === "a") {
      const { x: xPosition, y: yPosition } = robot.getMousePos();

      robot.moveMouse(xPosition - 5, yPosition);
      app.io.emit("broadcast", data);
    } else if (data[data.length - 1] === "d") {
      const { x: xPosition, y: yPosition } = robot.getMousePos();

      robot.moveMouse(xPosition + 5, yPosition);
      app.io.emit("broadcast", data);
    } else if (data[data.length - 1] === "w") {
      const { x: xPosition, y: yPosition } = robot.getMousePos();

      robot.moveMouse(xPosition, yPosition - 5);
      app.io.emit("broadcast", data);
    }
  });
});

module.exports = app.io;
