const app = require("../app");
const robot = require("robotjs");
const os = require("os");

const myLocalIpAddress = os.networkInterfaces().en0[1].address;

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("verify-connectable", (data) => {
    app.io.emit("broadcast", myLocalIpAddress);
  });

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
