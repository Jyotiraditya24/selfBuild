import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// we cannot copy paste cookie as http is on thatst why we need cookie-parser

const port = 3001;
const KEY = "HEY";

const app = express();
const server = createServer(app);
app.use(cors());

//using cors as a middleware
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, resp) => {
  resp.send("Hello");
});

app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "1234" }, KEY);
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({ messsage: "LOgin successfull" });
});

// IO middleWare
// could be used for authenticatio
io.use((socket, next) => {
  // immediately invoked function()()
  cookieParser()(socket.request, socket.request.res, (err) => {
    if (err) return next(err);
    const token = socket.request.cookies.token;
    if (!token) return next(new Error("Authentication Error"));
    // const decoded = jwt.verify(token, KEY);
    next();
  });
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    // io.emit("receive-message", data);
    // socket.broadcast.emit("receive-message", data);
    socket.broadcast.to(data.room).emit("receive-message", data);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("User", socket.id, "disconnected");
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
