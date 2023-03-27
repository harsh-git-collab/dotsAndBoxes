import React from 'react';

class Square extends React.Component {
    // decide_class fuction returns the class of the bars and dots using props
    decide_class(bar_name) {
        var i = this.props.index;
        var connection_map = this.props.connections[i];
        var connections_arr = this.props.connections;
        var class_name = '';

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
                <div className='inner_square one'></div>
                <div className='inner_square two'></div>
                <div className='inner_square three'></div>
                <div className='inner_square four'></div>
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        // binding the function to make sure it has access to component attributes like this.props and this.state
        this.handleClick = this.handleClick.bind(this);
        //temp_map is the connections namely left, bottom, right, top it has with other nodes
        let ARR_SIZE = 75;
        let dots = new Array(ARR_SIZE)
        
        for(let i=0; i<ARR_SIZE; i++) {
            const temp_map = new Map([
                ['top', -1],
                ['left', -1],
                ['bottom', -1],
                ['right', -1],
                ['highlight', false],
                ['sqr_1', -1],
                ['sqr-2', -1],
                ['sqr_3', -1],
                ['sqr_4', -1],
                ['background', 'transparent'],     
            ])
            dots[i] = temp_map;
        }
        
        // dots[25].set('left', 24);
        // dots[24].set('right', 25);

        this.state = {
            dotClicked: -1,
            leftOfClickedDot: -1,
            topOfClickedDot: -1,
            bottomOfClickedDot: -1,
            rightOfClickedDot: -1,
            dots: dots,
        }
        

    }

    checkLoop(i, j, str){
        let dot1 = Math.min(i, j);
        let dot2 = dot1 == i ? j : i;
    
        if(str == 'h') {
            // check for anticlock wise loop
            let dot3 = dot2 - 15; // 15 is the number of cols
            if(dot3 >= 0) {
                let dot4 = dot3 - 1;
                if(this.state.dots[dot1].get('right') == dot2 && this.state.dots[dot2].get('top') == dot3 && this.state.dots[dot3].get('left') == dot4 && this.state.dots[dot4].get('bottom') == dot1 ) {
                    return ;
                }
            }
            // check for clockwise loop
            dot3 = dot2 + 15;
            
            if(dot3 >= 75) { // here 75 is the total number of dots in the game
                return false;
            }
             let dot4 = dot3 - 1;
            
            if(this.state.dots[dot1].get('right') == dot2 && this.state.dots[dot2].get('bottom') == dot3 && this.state.dots[dot3].get('left') == dot4 && this.state.dots[dot4].get('top') == dot1) {
                return true;
            }
            
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
        let row_idx = i%15;
        let left_idx = (row_idx -1 < 0) ? -1 : i-1;
        let top_idx = (i-15 < 0) ? -1 : i-15;
        let bottom_idx = (i + 15 >= 75) ? -1 : i+15;
        let right_idx = (row_idx + 1 >= 15) ? -1 : i+1;
        console.log(left_idx + " " + right_idx)
        console.log(top_idx + " " + bottom_idx)
        console.log("clicked status is ", this.state.dotClicked);

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
            
            if(i == this.state.leftOfClickedDot || i == this.state.topOfClickedDot || i == this.state.bottomOfClickedDot || i == this.state.rightOfClickedDot || i == this.state.dotClicked){
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
                
                if(this.state.dotClicked + 1 == i || this.state.dotClicked -1 == i) {
                    console.log("horizontal clicking");
                    // check if a loop is being made

                    // check anti-clockwise loop
                    if(this.checkLoop(this.state.dotClicked, i, 'h')) {
                        // if it returns true then mark the squres of those dots

                    }
                }

                this.setState({
                    dotClicked: -1,
                    leftOfClickedDot: -1,
                    topOfClickedDot: -1,
                    bottomOfClickedDot: -1,
                    rightOfClickedDot: -1,
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
            <Square index={i} connections={this.state.dots} onClick={() => this.handleClick(i)}/>
        );
    }

    render() {
        return (
            <div className='board'>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                    {this.renderSquare(24)}
                    {this.renderSquare(25)}
                    {this.renderSquare(26)}
                    {this.renderSquare(27)}
                    {this.renderSquare(28)}
                    {this.renderSquare(29)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(30)}
                    {this.renderSquare(31)}
                    {this.renderSquare(32)}
                    {this.renderSquare(33)}
                    {this.renderSquare(34)}
                    {this.renderSquare(35)}
                    {this.renderSquare(36)}
                    {this.renderSquare(37)}
                    {this.renderSquare(38)}
                    {this.renderSquare(39)}
                    {this.renderSquare(40)}
                    {this.renderSquare(41)}
                    {this.renderSquare(42)}
                    {this.renderSquare(43)}
                    {this.renderSquare(44)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(45)}
                    {this.renderSquare(46)}
                    {this.renderSquare(47)}
                    {this.renderSquare(48)}
                    {this.renderSquare(49)}
                    {this.renderSquare(50)}
                    {this.renderSquare(51)}
                    {this.renderSquare(52)}
                    {this.renderSquare(53)}
                    {this.renderSquare(54)}
                    {this.renderSquare(55)}
                    {this.renderSquare(56)}
                    {this.renderSquare(57)}
                    {this.renderSquare(58)}
                    {this.renderSquare(59)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(60)}
                    {this.renderSquare(61)}
                    {this.renderSquare(62)}
                    {this.renderSquare(63)}
                    {this.renderSquare(64)}
                    {this.renderSquare(65)}
                    {this.renderSquare(66)}
                    {this.renderSquare(67)}
                    {this.renderSquare(68)}
                    {this.renderSquare(69)}
                    {this.renderSquare(70)}
                    {this.renderSquare(71)}
                    {this.renderSquare(72)}
                    {this.renderSquare(73)}
                    {this.renderSquare(74)}
                </div>
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