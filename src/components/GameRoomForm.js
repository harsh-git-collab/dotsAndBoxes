import Navbar from "./Navbar.js";
import { useState } from "react";
import { db } from "./firebase.js";
import { collection, doc, addDoc, getDoc, updateDoc, serverTimestamp} from "firebase/firestore";
import WaitingPopup from "./WaitingPopup.js";

export default function GameRoomForm() {
    const [player1, setPlayer1Name] = useState("");
    const [roomId, setRoomId] = useState("");
    const [noOfPlayers, setNoOfPlayers] = useState(0);

    async function handleCreateRoom(e) {
        console.log("we are inside the handleCreateRoom function");
        e.preventDefault();
        if(!player1) {
            alert("Enter your name to create a room");
            return;
        }

        const docRef = await addDoc(collection(db, "room"), {
            player1: {player1, joinedAt: serverTimestamp() },
            status: "waiting",
            createAt: serverTimestamp(),
        })
        setNoOfPlayers(noOfPlayers+1);
        setRoomId(docRef.id)
        alert(`Room created! Share this code: ${docRef.id}`);
    }

    // async function handleJoinRoom(e) {
    //     e.preventDefault();
    //     if (!name || !roomId) {
    //         alert("Enter your name to create a Room \n or Enter a room ID to join a room");
    //         return;
    //     }

    //     const roomRef = doc(db, "rooms", roomId); // This creates a reference to a specific document in the "rooms" collection
    //     const roomSnap = await getDoc(roomRef); // This line fetches the document data from Firestore.

    //     if (!roomSnap.exists()) {
    //         alert("Room does not exist");
    //     return;
    // }
    // }

    return (
        <>
            <Navbar />
            <div className="container">
                {/* <form onSubmit={handleJoinRoom} >
                    <div className="wrapper">
                        <label>Join a game room</label>
                        <input
                            type="string"
                            name="GameRoomId"
                            placeholder="Your Code"/>
                        <input type="Submit" />
                    </div>
                </form> */}

                <form onSubmit={handleCreateRoom} >
                    <div className="wrapper">
                        <label>Create A Game Room </label>
                        <input type="string"
                               value={ player1 }
                               onChange={(e) => {
                                setPlayer1Name(e.target.value);
                               }}
                               placeholder="Your Name"
                        />
                        <input type="Submit" />
                    </div>
                </form>
                <WaitingPopup trigger={noOfPlayers === 1 ? true : false} code={roomId}/>
            </div>
        </>
    )
}