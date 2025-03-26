import React from 'react';
import InfoPanel from './InfoPanel.js';
import Board from './Board.js';
import './GameStyles.css';




class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='main'>
                <div className='container'>
                    <InfoPanel 
                        playerOneScore={this.props.playerOneScore}
                        playerTwoScore={this.props.playerTwoScore}
                        playerOneNext={this.props.playerOneNext}
                    />
                    <Board 
                        dots={this.props.dots} 
                        gameOver={this.props.gameOver}
                        playerOneScore={this.props.playerOneScore}
                        playerTwoScore={this.props.playerTwoScore}
                        winner={this.props.winner}
                        handleClick={this.props.handleClick}
                    />
                </div>
            </div>
        )
    }
}

export default Game;