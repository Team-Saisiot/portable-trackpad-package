const app = require("../app");
const robot = require("robotjs");

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("user-send", (data) => {
    const { x: xPosition, y: yPosition } = robot.getMousePos();

    if (data === "down") {
      robot.moveMouse(xPosition, yPosition + 10);
    } else if (data === "left") {
      robot.moveMouse(xPosition - 10, yPosition);
    } else if (data === "right") {
      robot.moveMouse(xPosition + 10, yPosition);
    } else if (data === "up") {
      robot.moveMouse(xPosition, yPosition - 10);
    } else if (data === "click") {
      robot.mouseClick();
    }

    app.io.emit("broadcast", data);
  });
});

module.exports = app.io;
