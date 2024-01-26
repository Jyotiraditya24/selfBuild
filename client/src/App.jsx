import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { Container, Typography } from "@mui/material";

const App = () => {
  // give the backend server url
  const socket = io("http://localhost:3001");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("Welcome", (s) => {
      console.log(s);
    });
  }, []);
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket.Io
      </Typography>
    </Container>
  );
};

export default App;
