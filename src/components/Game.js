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
            if(connection_map.get('clicked') ) {
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
                ['clicked', false]       
            ])
            dots[i] = temp_map;
        }
        
        // dots[25].set('left', 24);
        // dots[24].set('right', 25);

        this.state = {
            dots: dots,
        }
        

    }

    handleClick = (i) => {
        console.log("clicked")
        console.log(i);
        // check if the click is valid
        // here 15 is the number of columns
        let row_idx = i%15;
        let left_idx = (row_idx -1 < 0) ? undefined : i-1;
        let top_idx = (i-15 < 0) ? undefined : i-15;
        let bottom_idx = (i + 15 >= 75) ? undefined : i+15;
        let right_idx = (row_idx + 1 >= 15) ? undefined : i+1;
        console.log(left_idx + " " + right_idx)
        console.log(top_idx + " " + bottom_idx)

        // check if the click is even valid

        // check if a previous dot was clicked
        

        // for experiment purpose only
        let new_dots = this.state.dots.slice();
        new_dots[i].set('clicked', true);
        if(left_idx != undefined){
            new_dots[left_idx].set('clicked', true);
        }
        if(top_idx != undefined){
            new_dots[top_idx].set('clicked', true);
        }
        if(bottom_idx != undefined){
            new_dots[bottom_idx].set('clicked', true);
        }
        if(right_idx != undefined){
            new_dots[right_idx].set('clicked', true);
        }
        this.setState({dots: new_dots});
        
    }

    renderSquare(i) {
        return (
            <Square index={i} connections={this.state.dots} onClick={() => this.handleClick(i)}/>
        );
    }

    render() {
        return (
            <div className='board'>
                <button onClick={this.handleClick}> Click me</button>
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