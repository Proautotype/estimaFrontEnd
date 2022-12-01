import React from "react";
import { Provider } from 'react-redux'
import "./App.css";
import "./assets/scss/mainApp.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { SocketService } from './services/SocketServices/SocketService'
import { Route, Routes } from "react-router";
import MainPage from "./View/MainPage";
import GM_SHOWCARD from "./View/Games/GM_SHOWCARD";
import Chat from "./View/Chat";
import GM_DOUBT_IT from "./View/Games/GM_DOUBT_IT";
import store from "./@redux/store";
import { WorkPage } from "./View/WorkPage";
import AccountSetup from "./View/Account/AccountSetup";
import Dashboard from "./View/Dashboard";
import NoticeBoardList from "./View/NoticeBoard/NoticeBoardList";

const App = () => {
  const SocketServiceInstance = new SocketService();
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="workpage" element={<MainPage />} />
          <Route path="/" element={<WorkPage/>}/>
          <Route path="/login" element={<AccountSetup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="games">
            <Route path="showcard" element={<GM_SHOWCARD socketService={SocketServiceInstance} />} />
            <Route path="doubtit" element={<GM_DOUBT_IT />} />
          </Route>
          <Route path="chat" element={<Chat />} />
        </Routes>
        <NoticeBoardList/>
      </div>
    </Provider>
  );
};

export default App;
