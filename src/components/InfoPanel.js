import React from 'react';
import './InfoPanelStyles.css';

class InfoPanel extends React.Component  {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='infoPanel'>
                <p className='bold'> Player:  {this.props.playerOneNext ? 'Harsh' : 'Saravat'} </p>
                <p className='bold'> Harsh: {this.props.playerOneScore} </p> 
                <p className='bold'> Saravat: {this.props.playerTwoScore}</p>
                
            </div>
        )
    }
}

export default InfoPanel;