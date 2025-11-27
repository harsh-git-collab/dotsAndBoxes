import Navbar from "./Navbar.js";
import { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, doc, addDoc, getDoc, updateDoc, serverTimestamp, onSnapshot} from "firebase/firestore";
import WaitingPopup from "./WaitingPopup.js";

export default function GameRoomForm({onFull}) {
    const [player1, setPlayer1Name] = useState("");
    const [player2, setPlayer2Name] = useState("");
    const [roomId, setRoomId] = useState("");
    const [noOfPlayers, setNoOfPlayers] = useState(0); // this state is for the waiting popup

    useEffect(() => {
        if(!roomId) {
            return;
        }

        const unsub = onSnapshot(doc(db, "room", roomId), (snapshot) => {
            const data = snapshot.data();

            if(data && data.player2) {
                onFull(true);
            }

            return () => unsub();
        }, [roomId]);


    });

    async function handleCreateRoom(e) {
        console.log("we are inside the handleCreateRoom function");
        e.preventDefault();
        if(!player1) {
            alert("Enter your name to create a room");
            return;
        }

        try {
        const docRef = await addDoc(collection(db, "room"), {
            player1: { name: player1, joinedAt: serverTimestamp() },
            status: "waiting",
            createdAt: serverTimestamp(),
        });

        setNoOfPlayers(noOfPlayers + 1);
        setRoomId(docRef.id);

        alert(`Room created! Share this code: ${docRef.id}`);
    }
    catch (err) {
        console.error("Error adding document:", err);
        alert("Error creating room: " + err.message);
    }

    }

    async function handleJoinRoom(e) {
        e.preventDefault();
        if (!player2 || !roomId) {
            alert("Enter your name to create a Room \n or Enter a room ID to join a room");
            return;
        }
        console.log(`this is the room id ${roomId}`)
        const roomRef = doc(db, "room", roomId); //  match collection name
        const roomSnap = await getDoc(roomRef);
        console.log(roomRef);
        console.log(roomSnap);
       if (!roomSnap.exists()) {
            alert("Room does not exist");
            return;
        }

        const roomData = roomSnap.data();

        if (roomData.player2) {
            alert("This room is already full");
            return;
        }

        // Update the existing room with player2
        await updateDoc(roomRef, {
            player2: { name: player2, joinedAt: serverTimestamp() },
            status: "ready",
        });

        setNoOfPlayers(2);

        alert(`Joined room: ${roomId}`);
        {onFull(true)};

    }

    return (
        <>
            <Navbar />
            <div className="container">
                <form onSubmit={handleJoinRoom} >
                    <div className="wrapper">
                        <label>Join a game room</label>
                        <input
                            type="string"
                            name="GameRoomId"
                            placeholder="Your Code"
                            onChange={e => setRoomId(e.target.value)}
                            />
                        <input type="string"
                            placeholder="Your name"
                            onChange={e => setPlayer2Name(e.target.value)}
                         />
                        <input type="Submit" />
                    </div>
                </form>

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