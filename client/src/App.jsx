import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { Container, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

const App = () => {
  // give the backend server url
  // io("http://localhost:3001")
  const socket = useMemo(()=>io("http://localhost:3001"),[]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  const [message, setMessage] = useState("");
  console.log("Hello");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("Welcome", (s) => {
      console.log(s);
    });
    console.log("Hello this is useEffect");
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography value={message} variant="h1" component="div" gutterBottom>
        Welcome to Socket.Io
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => 
            setMessage(e.target.value)
          }
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default App;
