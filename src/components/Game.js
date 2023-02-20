import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    handleClick(i, j) {
        console.log(i, j);
        
    }

    render() {
        return (
            <div className="square">
                <div className="bar top"></div>
                <div className="bar left"></div>
                <div className="bar bottom"></div>
                <div className="bar right"></div>
                <div className="dot" onClick={() => {this.handleClick(this.props.row, this.props.col)}}></div>
            </div>
        );
    }
}

class Board extends React.Component {
    renderSquare(i, j) {
        return (
            <Square row={i} col={j}/>
        );
    }

    render() {
        return (
            <div className='board'>
                <div className='board-row'>
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}
                    {this.renderSquare(0, 4)}
                    {this.renderSquare(0, 5)}
                    {this.renderSquare(0, 6)}
                    {this.renderSquare(0, 7)}
                    {this.renderSquare(0, 8)}
                    {this.renderSquare(0, 9)}
                    {this.renderSquare(0, 10)}
                    {this.renderSquare(0, 11)}
                    {this.renderSquare(0, 12)}
                    {this.renderSquare(0, 13)}
                    {this.renderSquare(0, 14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(1, 5)}
                    {this.renderSquare(1, 6)}
                    {this.renderSquare(1, 7)}
                    {this.renderSquare(1, 8)}
                    {this.renderSquare(1, 9)}
                    {this.renderSquare(1, 10)}
                    {this.renderSquare(1, 11)}
                    {this.renderSquare(1, 12)}
                    {this.renderSquare(1, 13)}
                    {this.renderSquare(1, 14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(2, 5)}
                    {this.renderSquare(2, 6)}
                    {this.renderSquare(2, 7)}
                    {this.renderSquare(2, 8)}
                    {this.renderSquare(2, 9)}
                    {this.renderSquare(2, 10)}
                    {this.renderSquare(2, 11)}
                    {this.renderSquare(2, 12)}
                    {this.renderSquare(2, 13)}
                    {this.renderSquare(2, 14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(3, 5)}
                    {this.renderSquare(3, 6)}
                    {this.renderSquare(3, 7)}
                    {this.renderSquare(3, 8)}
                    {this.renderSquare(3, 9)}
                    {this.renderSquare(3, 10)}
                    {this.renderSquare(3, 11)}
                    {this.renderSquare(3, 12)}
                    {this.renderSquare(3, 13)}
                    {this.renderSquare(3, 14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(4, 0)}
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(4, 6)}
                    {this.renderSquare(4, 7)}
                    {this.renderSquare(4, 8)}
                    {this.renderSquare(4, 9)}
                    {this.renderSquare(4, 10)}
                    {this.renderSquare(4, 11)}
                    {this.renderSquare(4, 12)}
                    {this.renderSquare(4, 13)}
                    {this.renderSquare(4, 14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(5, 0)}
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(5, 5)}
                    {this.renderSquare(5, 6)}
                    {this.renderSquare(5, 7)}
                    {this.renderSquare(5, 8)}
                    {this.renderSquare(5, 9)}
                    {this.renderSquare(5, 10)}
                    {this.renderSquare(5, 11)}
                    {this.renderSquare(5, 12)}
                    {this.renderSquare(5, 13)}
                    {this.renderSquare(5, 14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6, 0)}
                    {this.renderSquare(6, 1)}
                    {this.renderSquare(6, 2)}
                    {this.renderSquare(6, 3)}
                    {this.renderSquare(6, 4)}
                    {this.renderSquare(6, 5)}
                    {this.renderSquare(6, 6)}
                    {this.renderSquare(6, 7)}
                    {this.renderSquare(6, 8)}
                    {this.renderSquare(6, 9)}
                    {this.renderSquare(6, 10)}
                    {this.renderSquare(6, 11)}
                    {this.renderSquare(6, 12)}
                    {this.renderSquare(6, 13)}
                    {this.renderSquare(6, 14)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(7, 0)}
                    {this.renderSquare(7, 1)}
                    {this.renderSquare(7, 2)}
                    {this.renderSquare(7, 3)}
                    {this.renderSquare(7, 4)}
                    {this.renderSquare(7, 5)}
                    {this.renderSquare(7, 6)}
                    {this.renderSquare(7, 7)}
                    {this.renderSquare(7, 8)}
                    {this.renderSquare(7, 9)}
                    {this.renderSquare(7, 10)}
                    {this.renderSquare(7, 11)}
                    {this.renderSquare(7, 12)}
                    {this.renderSquare(7, 13)}
                    {this.renderSquare(7, 14)}
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