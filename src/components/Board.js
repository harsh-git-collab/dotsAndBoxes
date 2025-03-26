import React from 'react';
import Square from './Square.js';
import { NUM_COLS, NUM_ROWS, ARR_SIZE, NUM_SQR } from './constant';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        // binding the function to make sure it has access to component attributes like this.props and this.state
       
        this.checkLoop = this.checkLoop.bind(this);
        this.renderSquare = this.renderSquare.bind(this);
        
        
        
    }

    checkLoop(i, j, str, flag){
        let dot1 = Math.min(i, j);
        let dot2 = dot1 == i ? j : i;
    
        if(str == 'h') {
            console.log( "inside check loop function\n");
            // check for anticlock wise loop
            // let dot3 = dot2 - 15; // 15 is the number of cols
            let dot3 = dot2 - NUM_COLS
            if(flag == 1) { // if flag is 1 then check anti-clockwise
                if(dot3 >= 0) {
                    let dot4 = dot3 - 1;
                    if(this.state.dots[dot1].get('right') == dot2 && this.state.dots[dot2].get('top') == dot3 && this.state.dots[dot3].get('left') == dot4 && this.state.dots[dot4].get('bottom') == dot1 ) {
                        // the above condition satifies then
                        // an anti clockwise loop is being made
                        // in which case we could return an object
                        let arr = [dot1, dot2, dot3, dot4];
                        arr.sort(function(a, b){return a - b});
                        console.log("returning for anticlockwise loop");
                        console.log(arr);
                        return {
                            'status': true,
                            'dot1': arr[0],
                            'dot2': arr[1],
                            'dot3': arr[2],
                            'dot4': arr[3],
                        }
                    }
                }
            }else {
                // check for clockwise loop
                // dot3 = dot2 + 15;
                dot3 = dot2 + NUM_COLS;
                
                if(dot3 < ARR_SIZE /*75*/) { // here 75 is the total number of dots in the game
                    let dot4 = dot3 - 1;
                
                    if(this.state.dots[dot1].get('right') == dot2 && this.state.dots[dot2].get('bottom') == dot3 && this.state.dots[dot3].get('left') == dot4 && this.state.dots[dot4].get('top') == dot1) {
                        let arr = [dot1, dot2, dot3, dot4];
                        arr.sort(function(a, b){return a - b});
                        return {
                            'status': true,
                            'dot1': arr[0],
                            'dot2': arr[1],
                            'dot3': arr[2],
                            'dot4': arr[3],
                        }
                    }
                }
            }
            
             

            return {'status': false};
            
        }else {
            // check for loop in case of two dots connecting vertically
            // check for clockwise loop
            let dot3 = dot2 - 1;
            
            if(flag == 0){
                if(dot3 >= 0) {
                    // let dot4 = dot3 - 15;
                    let dot4 = dot3 - NUM_COLS;
                    if(this.state.dots[dot1].get('bottom') == dot2 && this.state.dots[dot2].get('left') == dot3 && this.state.dots[dot3].get('top') == dot4 && this.state.dots[dot4].get('right') == dot1) {
                        let arr = [dot1, dot2, dot3, dot4];
                        arr.sort(function(a, b){return a - b});
                        return {
                            'status': true,
                            'dot1': arr[0],
                            'dot2': arr[1],
                            'dot3': arr[2],
                            'dot4': arr[3],
                        }
                    }
                }
            }else {
                // check for anti-clockwise direction
                dot3 = dot2 + 1;
                // let row_idx = dot3%15; // 15 number of dots in one row (no. of col in the game)
                let row_idx = dot3%NUM_COLS;
                if(row_idx < NUM_COLS /*15*/) {
                    // let dot4 = dot3-15;
                    let dot4 = dot3-NUM_COLS;
                    if(this.state.dots[dot1].get('bottom') == dot2 && this.state.dots[dot2].get('right') == dot3 && this.state.dots[dot3].get('top') == dot4 && this.state.dots[dot4].get('left') == dot1) {
                        let arr = [dot1, dot2, dot3, dot4];
                        arr.sort(function(a, b){return a - b});
                        return {
                            'status': true,
                            'dot1': arr[0],
                            'dot2': arr[1],
                            'dot3': arr[2],
                            'dot4': arr[3],
                        }
                    }
                }
            }

            

            return {'status': false};
            
        }
        
    }

    

    renderSquare(i) {
        return (
            <Square index={i} connections={this.props.dots} onClick={() => this.props.handleClick(i)} player={this.props.playerOneNext}/>
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
                <div class="absolute"> 
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
