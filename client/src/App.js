import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const[room,setRoom] = useState("");
  
  const joinRoom = () =>{
    if(userName !== "" && room !== ""){
      socket.emit("join_room", room)
    }
  }
  return (
    <div className="App">
      <h1>Join a room</h1>
      <input type="text" 
      placeholder="Type room ID"
      onChange={(event)=>{
        setRoom(event.target.value);
      }}
      
      />
      <input type="text" 
      placeholder="Enter your user name"
      onChange={(event) =>{
      setUserName(event.target.value); 
      }}
       />
      <button onClick={joinRoom}>Join Now</button>
      
    </div>
  );
}

export default App;