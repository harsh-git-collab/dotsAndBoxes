import React from 'react';
import './ReplayPopupStyles.css';

function ReplayPopus(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <p>Do you want to reset the game ?</p>
                <div>
                    <button className='btn' onClick={() => props.handleReplayClick("yes")}>Yes</button>
                    <button className='btn' onClick={() => props.handleReplayClick("no")}>No</button>
                </div>
            </div>
        </div>
     ) : ""
}

export default ReplayPopus;