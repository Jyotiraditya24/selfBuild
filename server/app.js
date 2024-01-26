import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3001;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(cors()); //using cors as a middleware

app.get("/", (req, resp) => {
  resp.send("Hello");
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on("disconnect", () => {
    console.log("User", socket.id, "disconnected");
  });

  socket.on("message", (data) => {
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
