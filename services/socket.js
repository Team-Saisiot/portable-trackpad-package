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

  socket.on("user-send", async (data) => {
    switch (data[0]) {
      case "click":
        robot.mouseClick();

        break;
      case "rightClick":
        robot.mouseClick("right");

        break;
      case "move":
        if (data[1] < 30 && data[1] > -30 && data[2] < 30 && data[2] > -30) {
          const { x: xPosition, y: yPosition } = robot.getMousePos();

          robot.moveMouse(xPosition + data[1] * 2.5, yPosition + data[2] * 2.5);
        }

        break;
      case "dragDown":
        robot.mouseToggle("down");
        break;
      case "dragUp":
        robot.mouseToggle("up");
        break;
    }
  });
});

module.exports = app.io;
