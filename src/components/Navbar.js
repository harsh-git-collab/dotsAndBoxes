import React from 'react';
import { IoIosSettings } from "react-icons/io";
import { MdOutlineReplay } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import './NavbarStyles.css';

const Navbar = () => {
    return (
        <header>
            <div className='container'>
                <div id='logo'>Dots&Boxes</div>
                <ul className='nav-menu'>
                    <li><IoIosSettings /></li>
                    <li><MdOutlineReplay /></li>
                    <li><FaQuestionCircle /></li>
                </ul>
                <div className='hamburger'>
                    <GiHamburgerMenu />
                </div>
            </div>
        </header>
    )
}

export default Navbar;