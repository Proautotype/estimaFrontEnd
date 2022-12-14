import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaComment, FaPhone, FaVideo,FaShieldAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { GiChatBubble } from 'react-icons/gi';

const UserCard = ({ user }) => {
  //redux
  const _showcard_session_data = useSelector(({ showcard_session_data }) => showcard_session_data);
  const indicator_variant = {
    hidden: { opacity: 0 },
    waiting: i => ({
      opacity: 0.5,
      backgroundColor: "#ff0000",
      boxShadow:
        `0px 0px 0px #ff0000,
            0px 0px 5px #ff0000,
            0px 0px 10px #ff0000,
            0px 0px 15px #ff0000,
            0px 0px 20px #ff0000,
            0px 0px 25px #ff0000,
            0px 0px 30px #ff0000,
            0px 0px 35px #ff0000`,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "anticipate",
        delay: i * 0.3,
      },
    }),
    available: i => ({
      opacity: 0.5,
      backgroundColor: "rgb(255, 225, 62)",
      boxShadow:
        `0px 0px 0px rgb(255, 225, 62),
            0px 0px 5px rgb(255, 225, 62),
            0px 0px 10px rgb(255, 225, 62),
            0px 0px 15px rgb(255, 225, 62),
            0px 0px 15px rgb(255, 225, 62),
            0px 0px 15px rgb(255, 225, 62)`,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "anticipate",
        delay: i * 0.3,
      },
    }),
    showing: i => ({
      opacity: 1,
      backgroundColor: "rgb(34, 255, 0)",
      boxShadow:
        `0px 0px 3px rgb(34, 255, 0),
          0px 0px 3px rgb(34, 255, 0),
          0px 0px 3px rgb(34, 255, 0)`,
      // transition: {
      //   duration: 0.5,
      //   repeat: Infinity,
      //   ease: "anticipate",
      //   delay: i * 0.3,
      // },
    }),
  };
  return (
    <motion.div
      className='username'
    >
      {_showcard_session_data?.memberDetails['chatID'] !== user['chatID'] ? user.memberName : "Me"}
      <motion.div className='text-container'>
        <p>{user?.scorecard}</p>
        {(user?.scorecard !== null || !user.visibility) &&
          <motion.div className='cover'>
            <FaShieldAlt strokeWidth={0.5} />
          </motion.div>}
      </motion.div>
      <motion.div
        className='indicator'
        variants={indicator_variant}
        initial="hidden"
        animate={
          (user?.scorecard === null)
            ? `waiting` :
            user?.scorecard !== null && !user.visibility ?
              "available" : "showing"
        }
      >
      </motion.div>
      <motion.div className='comms'>
        {/* <FaComment/> */}
        <FaPhone/>
        {/* <FaVideo/> */}
      </motion.div>
    </motion.div>
  )
}

export default UserCard