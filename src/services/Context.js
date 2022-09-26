import { createContext } from "react";

export const simpleUserData = {
  username:'light',
  setUserName:(uname)=>{
    simpleUserData.username = uname
  },
  currentGame:'SC',
  setCurrentGame:(currentGame)=>{
    simpleUserData.currentGame = currentGame
  },
  currentGameRoom:'',
  setGameRoom:(gameRoom)=>{
    simpleUserData.gameRoom = gameRoom
  },
};

export const simpleDataContext = createContext(simpleUserData);
export const SocketServiceContext = createContext();
