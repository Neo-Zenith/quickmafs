const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = require("http").createServer(app);
// const helmet = require("helmet");
const cors = require("cors");
// const authRouters = require("./routers/authRouter");

const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:3000"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("hi");
});

app.get("/output", (req, res) => {
  io.emit("new-output", "hello");
  return res.json("successs");
});

// io.use(wrap(sessionMiddleware));
// io.use(authorizeUser);
io.on("connect", (socket) => {
  //   console.log(socket);
  //   initializeUser(socket);
  //   socket.on("add-friend", (friendName, cb) => {
  //     addFriend(socket, friendName, cb);
  //   });
  //   socket.on("disconnecting", () => onDisconnect(socket));
});

server.listen(5000, () => {
  console.log("Listening at port 5000");
});
