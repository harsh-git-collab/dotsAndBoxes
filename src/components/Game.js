import React from 'react';
import InnerSquare from './InnerSquare';
import { NUM_COLS, NUM_ROWS, ARR_SIZE } from './constant';

class Square extends React.Component {
    // decide_class fuction returns the class of the bars and dots using props
    decide_class(bar_name) {
        var i = this.props.index;
        var connection_map = this.props.connections[i];
        var class_name = '';
        console.log(i + "is the index for which bar class is being decide");
        if(bar_name == 'top' && connection_map.get('top') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'left' && connection_map.get('left') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'bottom' && connection_map.get('bottom') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'right' && connection_map.get('right') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'dot') {
            if(connection_map.get('highlight') ) {
                class_name += ' dot_active';
            }
        }
        
        return class_name;
    }

    render() {
    
        // index of the dots 
        

        return (
            <div className="square">
                <div className={'bar top ' + this.decide_class('top')}></div>
                <div className={'bar left' + this.decide_class('left')}></div>
                <div className={'bar bottom' + this.decide_class('bottom')}></div>
                <div className={'bar right' + this.decide_class('right')}></div>
                <div className={'dot ' + this.decide_class('dot')} onClick={this.props.onClick}></div>
                <InnerSquare index={this.props.index} position="1" property_map={this.props.connections[this.props.index]}  player={this.props.player}/>
                <InnerSquare index={this.props.index} position="2" property_map={this.props.connections[this.props.index]} player={this.props.player}/>
                <InnerSquare index={this.props.index} position="3" property_map={this.props.connections[this.props.index]} player={this.props.player}/>
                <InnerSquare index={this.props.index} position="4" property_map={this.props.connections[this.props.index]} player={this.props.player}/>
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        // binding the function to make sure it has access to component attributes like this.props and this.state
        this.handleClick = this.handleClick.bind(this);
        this.checkLoop = this.checkLoop.bind(this);
        this.renderSquare = this.renderSquare.bind(this);
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
        
        // dots[25].set('left', 24);
        // dots[24].set('right', 25);

        this.state = {
            dotClicked: -1, // tells up about the dot that is clicked either for the first time or the second time by a player
            leftOfClickedDot: -1, // tells up about the left of the dot that is clicked either for the first time or the second time by a player
            topOfClickedDot: -1, // tells up about the top of the dot that is clicked either for the first time or the second time by a player
            bottomOfClickedDot: -1, // tells up about the bottom of the dot that is clicked either for the first time or the second time by a player
            rightOfClickedDot: -1, // tells up about the right of the dot that is clicked either for the first time or the second time by a player
            dots: dots,  // dots is the array of maps. The properties of map tell us about the state of the individual square
            playerOneNext: true,
        }
        

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

    handleClick = (i) => {
        if(this.state.dots[i].get('left') != -1 && this.state.dots[i].get('top') != -1 && this.state.dots[i].get('right') != -1 && this.state.dots[i].get('bottom') != -1) {
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
        console.log("clicked status is ", this.state.dotClicked);

        // this is an additional check if we have clicked on a peripheral node
        // that is already connected

        // for top left node
        if(i - NUM_COLS < 0 && row_idx - 1 < 0) {
            // check if the top left node is connected
            if(this.state.dots[i].get('right') != -1 && this.state.dots[i].get('bottom') != -1) {
                return;
            }
        }
        // for top right most node
        if(i - NUM_COLS < 0 && row_idx +1 >= NUM_COLS) {
            // check if the top left node is connected
            if(this.state.dots[i].get('left') != -1 && this.state.dots[i].get('bottom') != -1) {
                return;
            }
        }
        // for bottom left node
        if(i + NUM_COLS >= ARR_SIZE && row_idx - 1 < 0) {
            // check if the top left node is connected
            if(this.state.dots[i].get('right') != -1 && this.state.dots[i].get('top') != -1) {
                return;
            }
        }
        // for bottom right node
        if(i + NUM_COLS >= 75 && row_idx + 1 >= NUM_COLS) {
            // check if the top left node is connected
            if(this.state.dots[i].get('left') != -1 && this.state.dots[i].get('top') != -1) {
                return;
            }
        }

        // if  non-corner top dots
        if(i - NUM_COLS < 0) {
            // check if the top non corner dots are connected or not
            if(this.state.dots[i].get('left') != -1 && this.state.dots[i].get('right') != -1 && this.state.dots[i].get('bottom') != -1 ) {
                return;
            }
        }

        // if non-corner botom dots
        if(i + NUM_COLS >= ARR_SIZE) {
            // check if the bottom non corner dots are connected or not
            if(this.state.dots[i].get('left') != -1 && this.state.dots[i].get('right') != -1 && this.state.dots[i].get('top') != -1 ) {
                return;
            }
        }

        // check if left most column non corner dots are connected or not
        if(row_idx - 1 < 0) {
            
            if(this.state.dots[i].get('top') != -1 && this.state.dots[i].get('right') != -1 && this.state.dots[i].get('bottom') != -1 ) {
                return;
            }
        }

        // if dot non-corner top dots
        if(row_idx + 1 >= NUM_COLS) {
            
            if(this.state.dots[i].get('left') != -1 && this.state.dots[i].get('top') != -1 && this.state.dots[i].get('bottom') != -1 ) {
                return;
            }
        }

        // check if the click is even valid
        if(this.state.dotClicked == -1){
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
            
            if(i === this.state.leftOfClickedDot || i === this.state.topOfClickedDot || i === this.state.bottomOfClickedDot || i === this.state.rightOfClickedDot || i === this.state.dotClicked){
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
                            // now change the status in the new dots
                            new_dots[dot_obj.dot1].set('sqr_4', player);
                            new_dots[dot_obj.dot2].set('sqr_3', player);
                            new_dots[dot_obj.dot3].set('sqr_2', player);
                            new_dots[dot_obj.dot4].set('sqr_1', player);
                            
                        }
                    }
                }
                console.log("the box was conqured value is ", box_was_cnqrd);
                this.setState({
                    dotClicked: -1,
                    leftOfClickedDot: -1,
                    topOfClickedDot: -1,
                    bottomOfClickedDot: -1,
                    rightOfClickedDot: -1,
                    playerOneNext: ( box_was_cnqrd )   ? ( this.state.playerOneNext )  : (this.state.playerOneNext ? false : true),
                    dots: new_dots,
                });
            }else {
                alert("The selected dot is invalid")
            }
            
            // check if all corner are connected
            
        }

        // check if a previous dot was clicked
        

        // for experiment purpose only
        
        
    }

    renderSquare(i) {
        return (
            <Square index={i} connections={this.state.dots} onClick={() => this.handleClick(i)} player={this.state.playerOneNext}/>
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
            <div className='board'>
                <p> Player:  {this.state.playerOneNext ? 'Harsh' : 'Saravat'} </p>
                <div>{this.renderBoard(NUM_ROWS, NUM_COLS)}</div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return <Board />
    }
}

export default Game;