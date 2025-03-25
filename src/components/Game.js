import React from 'react';
import InnerSquare from './InnerSquare';
import InfoPanel from './InfoPanel.js';
import Board from './Board.js';
import './GameStyles.css';




class Game extends React.Component {
    render() {
        return (
            <div className='main'>
                <div className='container'>
                    <InfoPanel />
                    <Board />
                </div>
            </div>
        )
    }
}

export default Game;