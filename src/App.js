import React, { useState, useContext, useMemo } from "react";
import { Provider } from 'react-redux'
import "./App.css";
import "./assets/scss/mainApp.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { simpleDataContext, simpleUserData, SocketServiceContext } from "./services/Context";
//
// import { BrowserRouter, Router } from "react-router-dom";
import { SocketService } from './services/SocketServices/SocketService'
import { Route, Routes } from "react-router";
import MainPage from "./View/MainPage";
import GM_SHOWCARD from "./View/Games/GM_SHOWCARD";
import Chat from "./View/Chat";
import GM_DOUBT_IT from "./View/Games/GM_DOUBT_IT";
import store from "./@redux/store";

const App = () => {
  const [SocketServiceInstance, setSocketInstance] = useState(new SocketService());

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="games">
            <Route path="showcard" element={<GM_SHOWCARD socketService={SocketServiceInstance} />} />
            <Route path="doubtit" element={<GM_DOUBT_IT />} />
          </Route>
          <Route path="chat" element={<Chat />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
