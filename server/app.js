import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3001;

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
