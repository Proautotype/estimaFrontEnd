import React, { useEffect, useState } from 'react';
import InGameNav from '../../components/InGameNav';
import { motion } from "framer-motion";
import "../../assets/scss/ShowCard.scss";
import UserCard from '../../components/showcard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { WebService } from '../../services/WebServices/GameWebService';
import { clearStatus, clearData, saveData, addMembers, memberCast } from '../../@redux/features/showcard_slice';
import { GiTrashCan } from "react-icons/gi";
import { CircularProgress } from "@mui/joy"

const GM_SHOWCARD = ({ socketService}) => {
  //redux
  const _showcard_session_data = useSelector(({ showcard_session_data }) => showcard_session_data);
  const dispatch = useDispatch();
  //states
  const [server, setServer] = useState(nanoid(10));
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(nanoid(5));
  const [adminAsMember, setAdminAsMember] = useState(true);
  const [toggleCreateServer, settoggleCreateServer] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState({ error: false, msg: "" });
  const [prompt, setprompt] = useState({
    error: false,
    title: "",
    msg: "",
    timer: 5
  });
  const [selectedNumber, setselectedNumber] = useState(0);
  const [numberCards, setNumberCards] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
  ]);
  //framer variants
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
  function copylink(event) {
    navigator.clipboard
      .writeText(_showcard_session_data?.serverDetails?.server)
      .then((data) => {
        setprompt({
          error: true,
          msg: "Server Link Copied Successfully",
          title: "IO-Buz: Link"
        });
      })
  }
  function leaveServer() {
    dispatch(clearData())
  }
  function numberSelect(event) {
    const currentActive = document.querySelectorAll('.number-box.active')[0];
    currentActive?.classList?.remove('active');
    event.target.classList.add('active');
    setselectedNumber(Number(event?.target.innerText));
  }
  function castNumber() {
    socketService.sendGenericData("cast-number", {
      room: _showcard_session_data['serverDetails']['server'],
      chatID: _showcard_session_data['memberDetails']['chatID'],
      score: selectedNumber,
      session: _showcard_session_data['sessionDetails']
    });
  }
  //create server 
  async function createServer(event) {
    event.preventDefault();
    if (admin.length > 5 || server.length > 5) {
      // dispatch(rdCreateGame({ admin, server, ID: nanoid(5), adminAsMember, socketService }));
      webservice
        .createGame({ admin, server, ID: nanoid(5), adminAsMember, email })
        .then((res) => {
          if (res?.status === 201) {
            dispatch(saveData(res?.data))
            settoggleCreateServer(false);
            setprompt({
              error: true,
              msg: "Server created successfully!",
              title: "IO-Buz"
            });
            //create socket room with server name
            socketService.sendGenericData("create-server", {
              room: res?.data?.serverDetails?.server,
            });
          } else {
            setprompt({
              error: true,
              msg: "Server already exist!",
              title: "IO-Buz"
            });
          }
          setIsWorking(false);
        }).catch(err => {
          console.log(err)
          setIsWorking(false);
        })
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
    if (admin.length > 5 || server.length > 5) {
      // dispatch(rdCreateGame({ admin, server, ID: nanoid(5), adminAsMember, socketService }));
      webservice
        .joinGame({ serverName: server, memberName: admin })
        .then((res) => {
          if (res?.status === 201) {
            dispatch(saveData(res?.data));
            settoggleCreateServer(false);
            setprompt({
              error: true,
              msg: "Hey you are in!",
              title: "IO-Buz"
            });
            //create socket room with server name
            socketService.sendGenericData("join-server", {
              room: res?.data?.body?.serverDetails?.server,
              memberName: admin,
              chatID: res?.data?.body?.chatid
            });
          } else {
            if (res?.status === 404) {
              setprompt({
                error: true,
                msg: res?.data,
                title: "IO-Buz",
                timer: 10
              });
            } else if (res?.status === 403) {
              setprompt({
                error: true,
                msg: res?.data,
                title: "IO-Buz",
                timer: 10
              });
            }
          }
          setIsWorking(false);
        }).catch(err => {
          console.log(err)
          setIsWorking(false);
        })
      setIsWorking(true);
    } else {
      setError({
        error: true,
        msg: "Admin or Server name length should be at least 5"
      })
    }
  }
  //socket listeners 

  socketService.listenIncomingPromise("member-casted").then((data) => {
    dispatch(memberCast(data));
  });

  socketService.listenIncomingPromise("new-Member").then((data) => {
    dispatch(addMembers(data));
  });

  useEffect(() => {
    // dispatch(clearData())
  }, [])

  useEffect(() => {
    //   socketService.listenIncomingPromise("other-Members")
    // .then((members=[]) => {
    //   const _new = members.filter((data)=> data?.chatID != _showcard_session_data?.memberDetails?.chatID);
    //   dispatch(addMembers(_new));
    // });
    
  }, [socketService.socket])


  window.addEventListener('unload', () => {
    // dispatch(clearStatus());
  });

  return (
    <div className='show-card-m'>
      <InGameNav reverseDestination={"/"} title={"SHOWCARD"}>
        <p onDoubleClick={copylink} style={{ letterSpacing: "4px", fontWeight: "bolder" }}>#{_showcard_session_data?.serverDetails?.server}</p>
      </InGameNav>
      <motion.div className='show-card-body'>
        {!_showcard_session_data?.serverDetails?.server
          && <motion.div className='startPanel'>
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
        {prompt.error &&
          <Prompt title={prompt.title}
            msg={prompt.msg}
            onClose={closePrompt}
            timerSeconds={prompt.timer}
          />}
        {/* //component for displaying players in the game */}

        {/* //end of component for displaying players in the game */}
        <div className='dashboard'>
          {_showcard_session_data?.memberDetails?.isAdmin &&
            <div className='control-panel'>
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
          {!_showcard_session_data?.memberDetails?.isAdmin && _showcard_session_data?.serverDetails?.serverLink &&
            <div className='member-control-panel'>
              <button onClick={leaveServer}>Leave Server</button>
              {/* <div className='session-info'>
              <div className='desc'>
                <p>Name:</p>
                <p>State:</p>
              </div>
              <div className='round'>
                <p>1</p>
              </div>
            </div> */}
            </div>}
          <motion.div className='users-panel'
            variants={games_vd_variant}
            initial={"hidden"}
            animate={"show"}
          >
            {_showcard_session_data?.memberDetails?.members?.map((user) => <UserCard key={nanoid(7)} user={user} />)}
          </motion.div>
          {(_showcard_session_data?.sessionDetails?.state === "start") && <div className='action-panel'>
            <motion.div
              className='number-palette'>
              {numberCards.map((number, idx) => (
                <motion.div key={idx}
                  onClick={numberSelect}
                  className={`number-box ${idx === 4 ?
                    "active" : ""}`}>{number}
                </motion.div>
              ))}
            </motion.div>
            <button onClick={castNumber}>Cast</button>
          </div>}
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
            <div className='formElement' >
              <label>{isCreate ? "Admin " : "Your Name"}</label>
              <input type={"text"} value={admin}
                onChange={e => setAdmin(e.target.value)} />
            </div>
            <div className='formElement'>
              <label>Email</label>
              <input type={"text"} value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='formElement'>
              <label>Server Name</label>
              <input type={"text"} value={server}
                onChange={e => setServer(e.target.value)} />
            </div>
            {/* <div className='include-admin'>
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
            </div> */}
            { <div className='controls'>
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
            </div>}
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

const Prompt = ({ title, msg, onClose, timerSeconds = 3 }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, timerSeconds * 1000);
  }, [onClose, timerSeconds])

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
