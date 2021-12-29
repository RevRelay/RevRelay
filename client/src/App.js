import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const[room,setRoom] = useState("");
  const [message, setMessage] = useState("");
  
  const joinRoom = () =>{
    if(userName !== "" && room !== ""){
      socket.emit("join_room", room)
    }
  }
  const sendMessage = () =>{
    if(message !== null){
      socket.emit("message_sent", message)
    
}else{
  console.log('must enter a message')
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
      /><br></br><br></br>
      <input type="text" 
      placeholder="Enter your user name"
      onChange={(event) =>{
      setUserName(event.target.value); 
      }}
       />
       
      <button onClick={joinRoom}>Join Now </button>
          

          
        
      <br></br><br></br><br></br>
      <input type="text" 
      id="messageInput"
      placeholder="message"
      onChange={(event) =>{
        setMessage(event.target.value);
       
      }}
      />
      <button onClick={sendMessage}>Send message...</button>
      <br></br><br></br>
      <TextField name="name"  value={message} onChange={(e) => sendMessage(e)} label="Name" />
      
    </div>
  );
}

export default App;