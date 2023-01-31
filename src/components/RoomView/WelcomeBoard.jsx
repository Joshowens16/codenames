import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';
import ResetGame from './ResetGame';
import AllPlayers from './AllPlayers'
const WelcomeBoard = () => {
  const { playerId, username, roomId, isHost } = useSelector((state) => state.player);
  return (
    <>
      <div className="welcomeBoard">
        <h3>Welcome, {username}</h3>
        <h3>Room id: {roomId}</h3>
        <h3>
          Players:
          <AllPlayers />
        </h3>
        <ResetGame />
      </div>
    </>
  );
};

export default WelcomeBoard;
