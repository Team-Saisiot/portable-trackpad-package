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
  socket.on("verify-connectable", () =>
    socket.broadcast.emit("verify-connectable", myLocalIpAddress),
  );

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
      case "scroll":
        if (data[2] < 120 && data[2] > -120) {
          robot.scrollMouse(0, data[2]);
        }

        break;
      case "volume":
        if (data[1] > 0) {
          robot.keyTap("audio_vol_up");
        } else {
          robot.keyTap("audio_vol_down");
        }

        break;
      case "goForwardInTap":
        robot.keyTap("tab", "control");

        break;
      case "goBackInTap":
        robot.keyTap("tab", ["control", "shift"]);

        break;
      case "goForwardInBrowser":
        robot.keyTap("]", "command");

        break;
      case "goBackInBrowser":
        robot.keyTap("[", "command");

        break;
      case "dragDown":
        robot.mouseToggle("down");

        break;
      case "dragUp":
        robot.mouseToggle("up");

        break;
    }
  });

  socket.on("drawing", (data) => {
    switch (data[0]) {
      case "세모":
        app.io.emit("drawing", "세모");

        break;
      case "네모":
        app.io.emit("drawing", "네모");

        break;
      case "동그라미":
        app.io.emit("drawing", "동그라미");

        break;
    }
  });
});

module.exports = app.io;
