import { io } from "socket.io-client";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useState, useMemo, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const socket = useMemo(
    () =>
      io("http://localhost:3001", {
        withCredentials: true,
      }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    console.log("Hi");
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data.message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket.Io
      </Typography>
      <Box sx={{ height: 200 }}></Box>

      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          id="outlined-basic"
          label="Room name"
          variant="outlined"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Room"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Stack>
        {messages?.map((m, i) => {
          return (
            <Typography key={i} variant="h5" component="div" gutterBottom>
              {m}
            </Typography>
          );
        })}
      </Stack>
    </Container>
  );
};

export default App;
