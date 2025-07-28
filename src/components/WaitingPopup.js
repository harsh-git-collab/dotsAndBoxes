import { IoMdCloseCircle } from "react-icons/io";
import './InfoPopupStyles.css';

function WaitingPopup (props){
    return(props.trigger) ? (
        <div className='info-popup'>

            <div className='info-popup-inner'>
                <h2> Waiting for the other player to join</h2>
                <h2> Share this code: {props.code} </h2>
            </div>
        </div>
    ) : ""
}

export default WaitingPopup;