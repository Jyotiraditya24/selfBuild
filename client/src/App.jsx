import React, { useEffect } from 'react'
import {io} from "socket.io-client";

const App = () => {
  // give the backend server url
  const socket = io("http://localhost:3001");
  useEffect(()=>{
    socket.on('connect',()=>{
      console.log("connected",socket.id)
    })
  },[])
  return (
    <div>App</div>
  )
}

export default App