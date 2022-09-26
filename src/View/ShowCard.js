import React, { useState, useContext, useEffect } from "react";
import "../assets/scss/ShowCard.scss";
import { motion } from "framer-motion";
import { createKey } from "../services/Utils";
import { simpleDataContext, SocketServiceContext } from "../services/Context";
import { ConfirmSubmit } from "../components/Confirm";
import { WebService } from "../services/WebServices/WebService";

const ShowCard = () => {
  const [gameTitle, setGameTitle] = useState(``);
  const [numberCards, setNumberCards] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const socketService = useContext(SocketServiceContext);
  const simpleData = useContext(simpleDataContext);
  let allocatedRoom ="";
  const webservice = new WebService();

  const createGame = () => {
    allocatedRoom = `SCG-${createKey(4)}`;
    // setGameTitle(allocatedRoom)
    ConfirmSubmit(
      "Create",
      "Click create to make a new room",
      (onClose)=>{
      const response = webservice.createGame({
        gameID: 100,
        gameRoom: allocatedRoom,
        gameOwner: simpleData.username,
      })
      response.then((res)=>{
        console.log('in data ', res)
        setGameTitle(res?.data?.gameRoom);
        simpleData.setGameRoom(res?.data?.gameRoom)
      })
      
        onClose()
      },
      "Create"
    );
  };

  const joinGame = () => {
    webservice.joinGame({
      gameID: 100,
      gameRoom: prompt("Enter Board room id","SCG-"),
      player: simpleData.username,
    })
  };

  const endGame = () => {
    setGameTitle("");
  };

  function ListenIncoming(){
    socketService.listenIncomingPromise(`game-created-${allocatedRoom}`).then(
      (res) => {
        console.log('created', res)
        setGameTitle(res.gameRoom);
      }
    );
  }
  

  useEffect(() => {
    ListenIncoming();
  }, [gameTitle]);

  return (
    <div className="show-card-wrapper">
      <motion.header className="show-card-header">
        {!gameTitle && (
          <div>
            <button onClick={createGame}>Create Board</button>
            <button onClick={joinGame}>Join Board</button>
          </div>
        )}
        <p>SHOW CARD -- {simpleData.gameRoom}</p>
      </motion.header>
      <motion.div className="show-card-body">
        <motion.div className="show-card-left">
          {numberCards.map((number, idx) => (
            <button key={idx}>{number}</button>
          ))}
        </motion.div>
        <motion.div className="show-card-right"></motion.div>
      </motion.div>
      <motion.div className="show-card-bottom">
        <button onClick={endGame}>End Game</button>
      </motion.div>
    </div>
  );
};

export default ShowCard;
