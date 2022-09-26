import React, { useEffect, useState } from 'react';
import InGameNav from '../../components/InGameNav';
import { motion } from "framer-motion";
import "../../assets/scss/ShowCard.scss";
import UserCard from '../../components/showcard/UserCard';
import { SocketService } from '../../services/SocketServices/SocketService';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { WebService } from '../../services/WebServices/WebService';
import { clearStatus, rdCreateGame } from '../../@redux/features/showcard_slice';
import { GiInfo, GiTrashCan } from "react-icons/gi";
import { CircularProgress } from "@mui/joy"

const GM_SHOWCARD = ({socketService = new SocketService()}) => {
  //redux
  const _showcard_session_data = useSelector(({ showcard_session_data }) => showcard_session_data);
  const dispatch = useDispatch();
  //states
  const [server, setServer] = useState(nanoid(10));
  const [admin, setAdmin] = useState(nanoid(5));
  const [adminAsMember, setAdminAsMember] = useState(true);
  const [toggleCreateServer, settoggleCreateServer] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState({ error: false, msg: "" });
  const [prompt, setprompt] = useState({ error: false, title: "Title 8", msg: "hello I am prompt" })
  //framer variants
  // socketService.connectNow();
  const games_vd_variant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        staggerDirection: -1,
        when: "beforeChildren",
      },
    },
  };
  const createServerScreen_variant = {
    hidden: {
      x: -100,
      opacity: 0,
      visibility: "hidden"
    },
    show: {
      visibility: "visible",
      x: [-100, -50, 0],
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        ease: "linear"
      }
    },
    hide: {
      // visibility:"hidden",
      x: [0, -50, -100],
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        ease: "linear"
      }
    }
  }
  //end of framer variants
  //static
  const webservice = new WebService();
  //end static
  //functions
  //events
  function closePrompt() {
    setprompt({ error: false, title: "", msg: "" });
    dispatch(clearStatus())
  }
  //create server 
  async function createServer(event) {
    event.preventDefault();
    if (admin.length > 5 || server.length > 5) {
      dispatch(rdCreateGame({ admin, server, ID: nanoid(5), adminAsMember,socketService }));
      setIsWorking(true);
    } else {
      setError({
        error: true,
        msg: "Admin or Server name length should be at least 5"
      })
    }
  }
  //join server
  async function joinServer(event) {
    event.preventDefault();
   const response = await webservice.joinGame({serverName:server,memberName:admin});
   if(response){
    socketService.sendGenericData("join-server",)
   }

  }
  //effects
  useEffect(() => {
    socketService.listenIncomingPromise("created").then((data) => {
      console.log("create data ", data)
    })
    socketService.listenIncomingPromise("joined").then((data) => {
      console.log("create data ", data)
    })
  }, [socketService?.socket]);

  useEffect(() => {
    if (_showcard_session_data?.process === "fulfilled") {
      console.log("fulfilled checking...")
      setIsWorking(false);
      settoggleCreateServer(false);
      setprompt({
        error: true,
        msg: "Server created successfully ",
        title: "IO-Buz"
      });
      //after server is created by http server, create its corresponding socket room by the servaname 
      
    } else if (_showcard_session_data?.process === "rejected") {
      console.log("rejected checking...", _showcard_session_data)
      setIsWorking(false);
      setError({
        error: true,
        msg: _showcard_session_data?.errorMsg
      })
    }
  }, [_showcard_session_data])

  window.addEventListener('unload', () => {
    dispatch(clearStatus());
  });

  return (
    <div className='show-card-m'>
      <InGameNav reverseDestination={"/"} title={"SHOWCARD"}>
        <p style={{ letterSpacing: "4px", fontWeight: "bolder" }}>#{_showcard_session_data?.serverDetails?.server}</p>
      </InGameNav>
      <motion.div className='show-card-body'>
        {!_showcard_session_data?.serverDetails?.server && <motion.div className='startPanel'>
          <button onClick={() => {
            settoggleCreateServer(true);
            if (toggleCreateServer) {
              setIsCreate(true);
            }
            setError({
              error: false,
              msg: ""
            })
          }}>
            Create Server
          </button>
          <button onClick={() => {
            settoggleCreateServer(true);
            setIsCreate(false)
            if (toggleCreateServer) {
              setIsCreate(false);
            }
            setError({
              error: false,
              msg: ""
            })
          }}>
            Join Server
          </button>
        </motion.div>}
        {prompt.error && <Prompt title={prompt.title} msg={prompt.msg} onClose={closePrompt} />}
        {/* //component for displaying players in the game */}

        {/* //end of component for displaying players in the game */}
        <div className='dashboard'>
          {_showcard_session_data?.isAdmin && <div className='control-panel'>
            <button>Start New Session</button>
            <button>End Current Session</button>
            <button>Reveal Play Cards</button>
            <div className='session-info'>
              <div className='desc'>
                <p>Name:</p>
                <p>State:</p>
              </div>
              <div className='round'>
                <p>1</p>
              </div>
            </div>
          </div>}
          <motion.div className='users-panel'
            variants={games_vd_variant}
            initial={"hidden"}
            animate={"show"}
          >
            {_showcard_session_data?.members?.map((user) => <UserCard key={nanoid(7)} user={user} />)}
          </motion.div>
          <div className='action-panel'></div>
        </div>
        {/* //component for creating server and joining server | is controlled by framer-motion */}
        <motion.div className='sc-create-server-pannel'
          variants={createServerScreen_variant}
          initial="hidden"
          animate={toggleCreateServer ? "show" : "hide"}
        >
          <div className='wrapper'>
            <h3>{isCreate ? "Create Server" : "Join Server"}</h3>
            {error.error && <p className='error-panel'>{error.msg}</p>}
            <hr />
            <div className='formElement' style={{ marginBottom: '20px' }}>
              <label>{isCreate ? "Admin " : "Your Name"}</label>
              <input type={"text"} value={admin}
                onChange={e => setAdmin(e.target.value)} />
            </div>
            <div className='formElement'>
              <label>Server Name</label>
              <input type={"text"} value={server}
                onChange={e => setServer(e.target.value)} />
            </div>
            <div className='include-admin'>
              <input name='includeadmin'
                id='includeadmin'
                type={'checkbox'}
                color="lightgreen"
                checked={adminAsMember}
                onChange={({ currentTarget }) => {
                  setAdminAsMember(!adminAsMember);
                }}
              />
              <label htmlFor='includeadmin'>Include Yourself?</label>
            </div>
            <div className='controls'>
              <button onClick={(event) => {
                settoggleCreateServer(!toggleCreateServer);
              }}>
                Close
              </button>
              <button onClick={
                isCreate ? createServer : joinServer
              }>
                {isCreate ?
                  (!isWorking ?
                    "Create Server" :
                    <Loading />
                  ) :
                  (!isWorking ?
                    "Join Server" :
                    <Loading />
                  )
                }
              </button>
            </div>
          </div>
        </motion.div>
        {/* //end of component for creating server and joining server */}
      </motion.div>
    </div>
  )
}
export default GM_SHOWCARD;

function Loading() {
  return <motion.div
    initial={{
      width: "10px",
      height: "10px",
      background: "white",
      borderRadius: "20px"
    }}
    animate={{
      x: [0, 50, 0],
      background: [
        "rgb(0, 191, 255)",
        "rgb(255,255,255)",
        "rgb(0, 191, 255)"
      ],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }}
  ></motion.div>
}

const Prompt = ({ title, msg, onClose }) => {
  let min = 3;
  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, min * 1000);
  }, [])

  return <motion.div
    className='prompt'
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{
      opacity: [0.3, 0.5, 0.8, 0, 1],
      scaleX: [0, 0.5, 1],
      transition: {
        duration: 0.4,
      },
    }}
    onClick={() => {
      onClose()
    }}
  >
    <div className='title-bar'>
      <p>{title}</p>
      <CircularProgress color='neutral' value={50} />
      <GiTrashCan onClick={onClose} />
    </div>
    <div className='description'>
      {msg}
    </div>
  </motion.div>
}
