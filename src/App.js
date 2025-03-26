import React from 'react';
import Navbar from './components/Navbar.js';
import Game from './components/Game.js';
import './App.css';
import { NUM_COLS, NUM_ROWS, ARR_SIZE, NUM_SQR } from '../src/components/constant.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
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

  handleClick = (i) => {
    if(this.props.gameOver == true) {
        return;
    }
    if(this.props.dots[i].get('left') != -1 && this.props.dots[i].get('top') != -1 && this.props.dots[i].get('right') != -1 && this.props.dots[i].get('bottom') != -1) {
        // that means the dot is connected 4 directionally. So this click is invalid
        return;
    }
    console.log("clicked")
    console.log(i);
    // check if the click is valid
    // here 15 is the number of columns
    // let row_idx = i%15;
    let row_idx = i%NUM_COLS;
    let left_idx = (row_idx -1 < 0) ? -1 : i-1;
    // let top_idx = (i-15 < 0) ? -1 : i-15;
    let top_idx = (i-NUM_COLS < 0) ? -1 : i - NUM_COLS;
    // let bottom_idx = (i + 15 >= 75) ? -1 : i+15;
    let bottom_idx = (i + NUM_COLS >= ARR_SIZE) ? -1 : i+NUM_COLS;
    // let right_idx = (row_idx + 1 >= 15) ? -1 : i+1;
    let right_idx = (row_idx + 1 >= NUM_COLS) ? -1 : i+1;
    console.log(left_idx + " " + right_idx)
    console.log(top_idx + " " + bottom_idx)
    console.log("clicked status is ", this.props.dotClicked);

    // this is an additional check if we have clicked on a peripheral node
    // that is already connected

    // for top left node
    if(i - NUM_COLS < 0 && row_idx - 1 < 0) {
        // check if the top left node is connected
        if(this.props.dots[i].get('right') != -1 && this.props.dots[i].get('bottom') != -1) {
            alert("selected dot is invalid");
            return;
        }
    }
    // for top right most node
    if(i - NUM_COLS < 0 && row_idx +1 >= NUM_COLS) {
        // check if the top left node is connected
        if(this.props.dots[i].get('left') != -1 && this.props.dots[i].get('bottom') != -1) {
            alert("selected dot is invalid");
            return;
        }
    }
    // for bottom left node
    if(i + NUM_COLS >= ARR_SIZE && row_idx - 1 < 0) {
        // check if the top left node is connected
        if(this.props.dots[i].get('right') != -1 && this.props.dots[i].get('top') != -1) {
            alert("selected dot is invalid");
            return;
        }
    }
    // for bottom right node
    if(i + NUM_COLS >= ARR_SIZE && row_idx + 1 >= NUM_COLS) {
        // check if the top left node is connected
        if(this.props.dots[i].get('left') != -1 && this.props.dots[i].get('top') != -1) {
            alert("selected dot is invalid");
            return;
        }
    }

    // if  non-corner top dots
    if(i - NUM_COLS < 0) {
        // check if the top non corner dots are connected or not
        if(this.props.dots[i].get('left') != -1 && this.props.dots[i].get('right') != -1 && this.props.dots[i].get('bottom') != -1 ) {
            return;
        }
    }

    // if non-corner botom dots
    if(i + NUM_COLS >= ARR_SIZE) {
        // check if the bottom non corner dots are connected or not
        if(this.props.dots[i].get('left') != -1 && this.props.dots[i].get('right') != -1 && this.props.dots[i].get('top') != -1 ) {
            return;
        }
    }

    // check if left most column non corner dots are connected or not
    if(row_idx - 1 < 0) {
        
        if(this.props.dots[i].get('top') != -1 && this.props.dots[i].get('right') != -1 && this.props.dots[i].get('bottom') != -1 ) {
            return;
        }
    }

    // if dot non-corner top dots
    if(row_idx + 1 >= NUM_COLS) {
        
        if(this.props.dots[i].get('left') != -1 && this.props.dots[i].get('top') != -1 && this.props.dots[i].get('bottom') != -1 ) {
            return;
        }
    }

    // check if the click is even valid
    if(this.props.dotClicked == -1){
        // this is the first click
        console.log("here we are first clicked");
        // highlight those dots which are not yet connected
        let new_dots = this.state.dots.slice();

        new_dots[i].set('highlight', true);
        
        if(left_idx != -1 && this.state.dots[i].get('left') == -1){
            new_dots[left_idx].set('highlight', true);
        }
        if(top_idx != -1  && this.state.dots[i].get('top') == -1){
            new_dots[top_idx].set('highlight', true);
        }
        if(bottom_idx != -1  && this.state.dots[i].get('bottom') == -1){
            new_dots[bottom_idx].set('highlight', true);
        }
        if(right_idx != -1  && this.state.dots[i].get('right') == -1){
            new_dots[right_idx].set('highlight', true);
        }
        this.setState({
            dotClicked: i,
            leftOfClickedDot: left_idx,
            topOfClickedDot: top_idx,
            bottomOfClickedDot: bottom_idx,
            rightOfClickedDot: right_idx,
            dots: new_dots,
        });
        
    }else {
        // this is the second click for making a line
        // check if it is even valid
        console.log("this is the second click for making a line");
        let isInvalid = false;
        
        if(i === this.state.leftOfClickedDot || i === this.state.topOfClickedDot || i === this.state.bottomOfClickedDot || i === this.state.rightOfClickedDot || i === this.state.dotClicked){
            // check if there exist a connection between the clicked dot and the dot previously clicked
            if(i === this.state.topOfClickedDot) { // this checks if the dot in second click has a connection with dot in the first click
                console.log("ehhh boy")
                if(this.state.dots[i].get("bottom") === this.state.dotClicked && i === this.state.dots[this.state.dotClicked].get("top")) {
                    alert("selected dot is invalid");
                    return;
                }
            }

            if(i === this.state.leftOfClickedDot) {
                if(this.state.dots[i].get("right") === this.state.dotClicked && i === this.state.dots[this.state.dotClicked].get("left")) {
                    alert("selected dot is invalid");
                    return;
                }
            }
            if(i === this.state.bottomOfClickedDot) {
                if(this.state.dots[i].get("top") === this.state.dotClicked && i === this.state.dots[this.state.dotClicked].get("bottom")) {
                    alert("selected dot is invalid");
                    return;
                }
            }
            if(i === this.state.rightOfClickedDot) {
                if(this.state.dots[i].get("left") === this.state.dotClicked && i === this.state.dots[this.state.dotClicked].get("right")) {
                    alert("selected dot is invalid");
                    return;
                }
            }
            // then the click is valid
            // update the state
            let new_dots = this.state.dots.slice();
            // switch off the highlighting
            new_dots[this.state.dotClicked].set('highlight', false);
            if(this.state.leftOfClickedDot !== -1) {
                new_dots[this.state.leftOfClickedDot].set('highlight', false);
            }
            if(this.state.topOfClickedDot !== -1) {
                new_dots[this.state.topOfClickedDot].set('highlight', false);
            }
            if(this.state.rightOfClickedDot !== -1) {
                new_dots[this.state.rightOfClickedDot].set('highlight', false);
            }
            if(this.state.bottomOfClickedDot !== -1) {
                new_dots[this.state.bottomOfClickedDot].set('highlight', false);
            }

            // if the same dot was clicked twice that means the players
            // cannot take turns

            if(i === this.state.dotClicked) {
                // that means that the same dot was clicked twice 
                // so we do all the necessary state changes here and return from the function
                this.setState({
                    dotClicked: -1,
                    leftOfClickedDot: -1,
                    topOfClickedDot: -1,
                    bottomOfClickedDot: -1,
                    rightOfClickedDot: -1,
                    playerOneNext: this.state.playerOneNext,
                    dots: new_dots,
                });

                return;
            }

            if(this.state.leftOfClickedDot != -1 && i == this.state.leftOfClickedDot) {
                new_dots[i].set('right', this.state.dotClicked);
                new_dots[this.state.dotClicked].set('left', i);
            }else if(this.state.topOfClickedDot != -1 && i == this.state.topOfClickedDot) {
                new_dots[i].set('bottom', this.state.dotClicked);
                new_dots[this.state.dotClicked].set('top', i);
            }else if(this.state.rightOfClickedDot != -1 && i == this.state.rightOfClickedDot) {
                new_dots[i].set('left', this.state.dotClicked);
                new_dots[this.state.dotClicked].set('right', i);
            }else if(this.state.bottomOfClickedDot != -1 && i == this.state.bottomOfClickedDot) {
                new_dots[i].set('top', this.state.dotClicked);
                new_dots[this.state.dotClicked].set('bottom', i);
            }
            
            // check for loops when dots connected are horizontal
            let box_was_cnqrd = false;
            let playerOneScore = 0;
            let playerTwoScore = 0;

            if(this.state.dotClicked + 1 == i || this.state.dotClicked -1 == i) {
                console.log("horizontal clicking");
                // check if a loop is being made

                let flag = 2;
                while(flag--) {
                    let dot_obj = this.checkLoop(this.state.dotClicked, i, 'h', flag)
                    if(dot_obj.status === true) {
                        // if it returns true then mark the squres of those dots
                        console.log("box made hhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
                        console.log(dot_obj);
                        box_was_cnqrd = true;
                        let player = this.state.playerOneNext ? 1 : 2;
                        if(player == 1) {
                            playerOneScore += 1;
                        }else {
                            playerTwoScore += 1;
                        }
                        // now change the status in the new dots
                        new_dots[dot_obj.dot1].set('sqr_4', player);
                        new_dots[dot_obj.dot2].set('sqr_3', player);
                        new_dots[dot_obj.dot3].set('sqr_2', player);
                        new_dots[dot_obj.dot4].set('sqr_1', player);
                        
                    }
                }
            }

            // check for loop when we conect between top and bottom dots
            if(this.state.dotClicked + NUM_COLS == i || this.state.dotClicked - NUM_COLS == i) {
                let flag = 2;
                while(flag--) {
                    let dot_obj = this.checkLoop(this.state.dotClicked, i, 'v', flag);

                    if(dot_obj.status === true) {
                        // if it returns true then mark the squres of those dots
                        console.log("box made vvvvvvvvvvvvvvvvvvv");
                        console.log(dot_obj)
                        box_was_cnqrd = true;
                        let player = this.state.playerOneNext ? 1 : 2;
                        if(player == 1) {
                            playerOneScore += 1;
                        }else {
                            playerTwoScore += 1;
                        }
                        // now change the status in the new dots
                        new_dots[dot_obj.dot1].set('sqr_4', player);
                        new_dots[dot_obj.dot2].set('sqr_3', player);
                        new_dots[dot_obj.dot3].set('sqr_2', player);
                        new_dots[dot_obj.dot4].set('sqr_1', player);
                        
                    }
                }
            }

            this.setState({
                dotClicked: -1,
                leftOfClickedDot: -1,
                topOfClickedDot: -1,
                bottomOfClickedDot: -1,
                rightOfClickedDot: -1,
                playerOneNext: ( box_was_cnqrd )   ? ( this.state.playerOneNext )  : (this.state.playerOneNext ? false : true),
                dots: new_dots,
                playerOneScore: this.state.playerOneScore + playerOneScore,
                playerTwoScore: this.state.playerTwoScore + playerTwoScore,
                gameOver: (this.state.playerOneScore + playerOneScore + this.state.playerTwoScore + playerTwoScore == NUM_SQR) ? true : false,
                winner : (this.state.playerOneScore + playerOneScore == this.state.playerTwoScore + playerTwoScore) ? 'Tie' : ((this.state.playerOneScore + playerOneScore > this.state.playerTwoScore + playerTwoScore) ? 'Harsh' : 'Saravat'),
            });
        }else {
            alert("The selected dot is invalid")
        }
        
        // check if all corner are connected
        
    }

    // check if a previous dot was clicked
    

    // for experiment purpose only
    
    
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
          handleClick={this.state.handleClick}
        />
      </>
    )
  }
}

export default App;
