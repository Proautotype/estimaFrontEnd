import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { motion } from "framer-motion";

const InGameNav = ({
   title,reverseDestination, 
   children
   }) => {
    // console.log("children -|> " , children)
  const navigate = useNavigate();
  const move = () => { navigate(reverseDestination) }
  return (
    <motion.div className='in-game-nav'>
      <div>
        <AiOutlineArrowLeft stroke='30px' onClick={move} />
        <p className='title'>{title}</p>
      </div>
      <div className='link'>
        {children}
      </div>
    </motion.div>
  )
}

export default InGameNav