import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import NoticeBoard from '../../components/noticeBoard/NoticeBoard'

const NoticeBoardList = () => {
  const showcard_session_data = useSelector((state)=> state.showcard_session_data);
  const notices = useSelector((state)=> state.notices);
  useEffect(()=>{
    console.dir(showcard_session_data)
    console.dir(notices)
  },[])
  return (
    <div className='notice-list'>
        <NoticeBoard title={"Success"} description={"Account created successfully"} />
      </div>
  )
}

export default NoticeBoardList

