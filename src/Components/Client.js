import './App.css';
import io from 'socket.io-client';
import {useState} from "react";
import Chat from './Chat';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const socket = io.connect("http://localhost:3001");
function Client() {

  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{ 
    if(username !== "" && room !== ""){
      socket.emit("join_room", {username, room});
      setShowChat(true);
    }
  }
  
   
 
  return (
   <div className="App">
     {!showChat ? (
     <div className="joinChatContainer">
     <h2 className="clientHeader">Join A Room</h2>
    <p>
     <TextField id="outlined-basic" label="Enter Room ID" variant="outlined" onChange={(event) => {
     setRoom(event.target.value);
     }} />
     </p>
     <p>
      <TextField id="outlined-basic" label="Enter User Name" variant="outlined" onChange={(event) => {
     setUserName(event.target.value);
     }} />
     </p>
     
     <Button onClick={joinRoom} variant="outlined" size="large">
          Join Room
        </Button>
     </div>
     )
   :(
     <Chat socket={socket} username={username} room={room} />
   )}
    </div>
);
}

export default Client;
