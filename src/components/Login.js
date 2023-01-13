import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername, setRoomId } from "../store/playersSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { database, app, auth, firebaseConfig } from "../utils/firebase";

const Login = ({ playerId, playerRef }) => {
  const roomId = useSelector((state) => state.players.roomId);
  const username = useSelector((state) => state.players.username);
  const dispatch = useDispatch();
  let roomRef;

  playerRef = ref(database, "players/" + playerId);
  roomRef = ref(database, "rooms/" + roomId);

  console.log({ playerId });
  console.log({ playerRef });
  console.log({ roomRef });

  const handleRoom = (event) => {
    dispatch(setRoomId(event.target.value));
  };
  const handleName = (event) => {
    dispatch(setUsername(event.target.value));
  };

  const playerLogin = (e) => {
    e.preventDefault();
    set(playerRef, { username, roomId });
    set(roomRef, { roomId: roomId });
    //     navigate(`/room/${roomId}`);
  };

  //   const navigateToRoom = () => {
  //     navigate(`/room/${roomId}`);
  //   };

  return (
    <form onSubmit={playerLogin}>
      <TextField
        id="outlined-basic"
        label="username"
        variant="outlined"
        placeholder="username"
        onChange={handleName}
      />
      <TextField
        id="outlined-basic"
        label="room id"
        variant="outlined"
        placeholder="room number"
        onChange={handleRoom}
      />

      <Button type="submit" variant="contained">
        Join Room
      </Button>
    </form>
  );
};

export default Login;
