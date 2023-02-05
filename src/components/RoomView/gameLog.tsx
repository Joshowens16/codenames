import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './roomView.css';
import GuessesRemaining from './GuessesRemaining';

interface ClueType {
    clueString: string;
    clueNumber: number;
}

interface GameState {
    gameHistory: (string | ClueType)[];
    status: string;
}

const GameLog: React.FC = () => {
    const game = useSelector<{ game: GameState }, GameState>(
        (state) => state.game
    );
    const gameHistory = game.gameHistory;
    const gameStatus = game.status;

    return (
        <div className='gameLog'>
            <h3>Game Status</h3>
            <div>{gameStatus}</div>
            <GuessesRemaining />
            <h3>Game History</h3>
            {gameHistory.map((singleHistory, index) => {
                if (typeof singleHistory === 'object') {
                    return (
                        <p key={index}>
                            The clue is {singleHistory.clueString} and you have{' '}
                            {singleHistory.clueNumber} guess(es)
                        </p>
                    );
                } else {
                    return <p key={index}>{singleHistory}</p>;
                }
            })}
        </div>
    );
};

export default GameLog;
