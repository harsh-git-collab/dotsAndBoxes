import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import './InfoPopupStyles.css';

function InfoPopup (props){
    return(props.trigger) ? (
        <div className='info-popup'>
            
            <div className='info-popup-inner'>
                <IoMdCloseCircle className='close-icon' onClick={props.onClick} />
                <h2> How to play ?</h2>
                <p>
                This is a computerised version of the old classic dots and boxes game which lets you play the game online. 
                The aim is complete more boxes than your opponent. You and your opponent take it in turns to 
                join up two adjacent dots with a line.
                <br /> 
                <br />
                "On your turn, click on a dot, then select an adjacent dot to draw a line between them.
                 The dots you can connect to will be highlighted in red.
                If you select the wrong dot, just click on it again to deselect."
                </p>
            </div>
        </div>
    ) : ""
}

export default InfoPopup;