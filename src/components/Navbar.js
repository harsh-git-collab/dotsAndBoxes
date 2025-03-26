import React from 'react';
import { IoIosSettings } from "react-icons/io";
import { MdOutlineReplay } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import './NavbarStyles.css';

class Navbar extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header>
                <div className='container'>
                    <div id='logo'>Dots&Boxes</div>
                    <ul className='nav-menu'>
                        <li><IoIosSettings /></li>
                        <li onClick={this.props.onClick}><MdOutlineReplay /></li>
                        <li><FaQuestionCircle /></li>
                    </ul>
                    <div className='hamburger'>
                        <GiHamburgerMenu />
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;