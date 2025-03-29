import React from 'react';
import { MdOutlineReplay } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

import InfoPopup from './InfoPopup.js'
import './NavbarStyles.css';

class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.howToClick = this.howToClick.bind(this);
        
        this.state = {
            infoPopup: true
        }
    }

    howToClick() {
        this.setState({infoPopup: !this.state.infoPopup});
    }
    render() {
        return (
            <header>
                <div className='container'>
                    <div id='logo'>Dots&Boxes</div>
                    <ul className='nav-menu'>
                        <li onClick={this.props.onReplayClick}><MdOutlineReplay /></li>
                        <li onClick={this.howToClick}><FaQuestionCircle /></li>
                    </ul>
                </div>
                <InfoPopup trigger={this.state.infoPopup} onClick={this.howToClick} />
            </header>
        )
    }
}

export default Navbar;