import React from 'react';
import Square from './Square.js';
import { NUM_COLS, NUM_ROWS, ARR_SIZE, NUM_SQR } from './constant';

export default class Board extends React.Component {
    constructor(props) {
        super(props); 
    }    

    renderSquare(i) {
        return (
            <Square index={i} connections={this.props.dots} onClick={() =>this.props.handleClick(i)} player={this.props.playerOneNext}/>
        );
    }

    renderBoard(rows, columns) {
        const board = [];
      
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < columns; j++) {
            const squareNumber = i * columns + j;
            row.push(this.renderSquare(squareNumber)); // this.renderSquare ultimately returns jsx elements. Should have thought it
          }
          board.push(
            <div key={i} className='board-row'>
              {row}
            </div>
          );
        }
      
        return <div>{board}</div>;
    }

    render() {
        return (
            <>
            {this.props.gameOver && (
                <div className="absolute"> 
                    Game Over!!!
                    <p> Harsh Score: {this.props.playerOneScore} | Saravat Score: {this.props.playerTwoScore}</p>
                    {(this.props.winner === 'Tie') && (
                        <p> There was a tie </p>
                    )}
                    {(this.props.winner !== 'Tie') && (
                        <p> Congratulations!! {this.props.winner}</p>
                    )}
                </div>
            )}
            <div className='board'>
                <p> Harsh Score: {this.props.playerOneScore} | Saravat Score: {this.props.playerTwoScore}</p>
                <p> Player:  {this.props.playerOneNext ? 'Harsh' : 'Saravat'} </p>
                <div>{this.renderBoard(NUM_ROWS, NUM_COLS)}</div>
            </div>
            </>
        );
    }
}
