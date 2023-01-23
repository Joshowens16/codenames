import Clue from "./Clue";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomId, setIsHost } from '../../store/playerSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { onValue, ref, set, get, child, onDisconnect, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import { setAllPlayers } from '../../store/allPlayersSlice';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Popup from 'reactjs-popup';
import SetupGame from './setupGame.jsx';
import { setWordsInGame } from '../../store/wordsInGameSlice';
import styles from './Room.styles';
import ResponsiveAppBar from '../ResponsiveAppBar.jsx';
import { setTeam1RemainingCards, setTeam2RemainingCards, setStatus } from '../../store/gameSlice';
import Board from './Board.jsx';
import TeamOneBox from '../teamBoxes/TeamOneBox';
import TeamTwoBox from '../teamBoxes/TeamTwoBox';
import { Button } from '@mui/material';
import ClueHistory from "./ClueHistory";
import { setClueHistory } from "../../store/clueSlice";
const RoomView = () => {
  // for room nav
  const params = useParams('');
  const roomIdFromParams = params.id;
  setRoomId(roomIdFromParams);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // frontend state
  const { playerId, username, roomId, isHost } = useSelector((state) => state.player);
  const { allPlayers } = useSelector((state) => state.allPlayers);
  const currentClue = useSelector((state) => state.clues.currentClue);
  const clueHistory=useSelector((state)=>state.clues.clueHistory)
  const [loading, setLoading] = useState(false);
  let gameStatus = useSelector((state) => state.game.status);
  // firebase room  & players reference
  let roomRef = ref(database, 'rooms/' + roomId);
  let playersInRoomRef = ref(database, 'rooms/' + roomId + '/players/');
  let playerNestedInRoomRef = ref(database, 'rooms/' + roomId + '/players/' + playerId);
  let gameRef = ref(database, 'rooms/' + roomId + '/game/');
  let cardsRef = ref(database, `rooms/${roomId}/gameboard`);
  let clueHistoryRef = ref(database, `rooms/${roomId}/clues/`);
  let previousData
  console.log(gameStatus);

  useEffect(() => {
    // on loading page if no room or name, send back to join page
    if (roomId === '' || username === '') {
      navigate('/');
      return; // immediately kick them!
    }

    //when a user joins room, this checks to see if it exists
    get(roomRef).then((snapshot) => {
      const doesRoomExist = snapshot.exists();
      if (doesRoomExist) {
        console.log('room already created, just add the player!');
        // playerId is key in the room/roomId/players/playerId, so we creating new player obj
        set(child(playersInRoomRef, playerId), { playerId, username });
      } else {
        console.log('room does not exist...yet! Creating it now...');
        // create the room, (nested) players, and host.
        set(roomRef, {
          roomId: roomId,
          host: { playerId, username },
          players: { [playerId]: { playerId, username } },
          game: {
            gameStatus: 'ready',
            team1RemainingCards: 9,
            team2RemainingCards: 8,
          },
        });
        // Set our state for if the player is the host or not.
        dispatch(setIsHost(true));
      }
    });

    // whenever users are added to specific room, update frontend redux store
    onValue(playersInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        const players = snapshot.val();
        const values = Object.values(players);
        dispatch(setAllPlayers(values));
   
      } else {
        console.log('no players in room yet!');
      }
    });

    onValue(playerNestedInRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        onDisconnect(playerNestedInRoomRef).remove(playersInRoomRef + '/' + playerId);
      }
    });

    // setting the 'turn' on the frontend will help determine what users are seeing depending on their role
    // for example, if its team1spymasters turn, they'll see the input clue box and number dropdown
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        const game = snapshot.val();
        const team1RemainingCards = snapshot.val().team1RemainingCards;
        const team2RemainingCards = snapshot.val().team2RemainingCards;
        dispatch(setTeam1RemainingCards(team1RemainingCards));
        dispatch(setTeam2RemainingCards(team2RemainingCards));

        console.log(game.gameStatus);
        if (game.team1RemainingCards && game.team2RemainingCards) {
          if (game.gameStatus === 'team1SpyTurn') {
            dispatch(setStatus('team1SpyTurn'));
          } else if (game.gameStatus === 'team2SpyTurn') {
            dispatch(setStatus('team2SpyTurn'));
          } else if (game.gameStatus === 'team1OpsTurn') {
            dispatch(setStatus('team1OpsTurn'));
          } else if (game.gameStatus === 'team2OpsTurn') {
            dispatch(setStatus('team2OpsTurn'));
          } else if (game.gameStatus === 'gameOver') {
            // havent gotten here yet really, but presumably we'd want to:
            // dispatch(setStatus('')) --> its no ones turn anymore
            // set and get winning team from firebase so that we can...
            // dispatch(setWinner(teamThatWon))
          }
        }
        // update cards remaining in redux and firebase
        if (game.team1RemainingCards === 0) {
          console.log('team 1 wins!');
        }
        if (game.team2RemainingCards === 0) {
          console.log('team 2 wins!');
        }
      }
    });

    // Look to see if there are cards already loaded for the room
    onValue(cardsRef, (snapshot) => {
      // If there are cards in /room/roomId/cards
      if (snapshot.exists()) {
        //update our redux to reflect that
        const cardsFromSnapshot = snapshot.val();
        const values = Object.values(cardsFromSnapshot);
        dispatch(setWordsInGame(values));
      } 
     
    });
    onValue(clueHistoryRef, (snapshot) => {
      if (snapshot.exists()) {
        //update our redux to reflect that
        const clues = snapshot.val();
        let history=[]
        for(let clueKey in clues){history.push(clues[clueKey])}
        dispatch(setClueHistory(history));
      } 
     console.log(clueHistory)
    });

  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <ResponsiveAppBar />
      <Container style={styles.sx.RoomContainer}>
        <Grid container spacing={2} style={styles.sx.RoomGrid}>
          <Grid item xs={12} style={styles.sx.RoomAndPlayers}>
            <Item style={styles.sx.PlayerContainer}>Welcome, {username}</Item>
            <Item style={styles.sx.PlayerContainer}>Room id: {roomId}</Item>
            <Item style={styles.sx.PlayerContainer}>
              Players:
              {allPlayers?.map((player) => (
                <p key={player.playerId}>{player.username}</p>
              ))}
            </Item>
            {gameStatus !== 'ready' && (
              <Item style={styles.sx.PlayerContainer}>
                Turn:
                {gameStatus}
              </Item>
            )}
          </Grid>
          <Grid item xs={3} md={4} style={styles.sx.BoardGrid}>
            <TeamOneBox />
          </Grid>
          <Grid item xs={3} md={4} style={styles.sx.BoardGrid}>
            <ClueHistory />
          </Grid>
          <Grid item xs={3} md={4} style={styles.sx.BoardGrid}>
            <TeamTwoBox />
          </Grid>
        </Grid>
      </Container>

      {isHost && (
        <Popup
          trigger={
            <Button
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Set Up
            </Button>
          }
        >
          <SetupGame />
        </Popup>
      )}

      <Board />
      <Clue />
    </>
  );
};

export default RoomView;
