import React from 'react';
import Navbar from './components/Navbar.js';
import Game from './components/Game.js';
import './App.css';
import { NUM_COLS, NUM_ROWS, ARR_SIZE, NUM_SQR } from '../src/components/constant.js';


class App extends React.Component {
  constructor(props) {
    super(props);


    //temp_map is the connections namely left, bottom, right, top it has with other nodes
    // let ARR_SIZE = 75;
    let dots = new Array(ARR_SIZE)
            
    for(let i=0; i<ARR_SIZE; i++) {
        const temp_map = new Map([
            ['top', -1], // top signifies if the dot in the center of the 
            // square is coonected to dot above it
            ['left', -1],
            ['bottom', -1],
            ['right', -1],
            ['highlight', false], // highlight property is used to highlight the dot 
            // in the center of the square when clicked by a user
            ['sqr_1', -1], // repreents the state of inner_squares component 1 2 3 4 in clockwise direction,
            // starting from top left inner_square
            ['sqr_2', -1],
            ['sqr_3', -1],
            ['sqr_4', -1],   
        ])
        dots[i] = temp_map;
    }

    this.state = {
      dotClicked: -1, // tells up about the dot that is clicked either for the first time or the second time by a player
      leftOfClickedDot: -1, // tells up about the left of the dot that is clicked either for the first time or the second time by a player
      topOfClickedDot: -1, // tells up about the top of the dot that is clicked either for the first time or the second time by a player
      bottomOfClickedDot: -1, // tells up about the bottom of the dot that is clicked either for the first time or the second time by a player
      rightOfClickedDot: -1, // tells up about the right of the dot that is clicked either for the first time or the second time by a player
      dots: dots,  // dots is the array of maps. The properties of map tell us about the state of the individual square
      playerOneNext: true,
      playerOneScore: 0,
      playerTwoScore: 0,
      winner: '',
      gameOver: false,
    }

  }

  render() {
    return (
      <>
        <Navbar />
        <Game 
          dots={this.state.dots} 
          gameOver={this.state.gameOver}
          playerOneScore={this.state.playerOneScore}
          playerTwoScore={this.state.playerTwoScore}
          winner={this.state.winner}
        />
      </>
    )
  }
}

export default App;
