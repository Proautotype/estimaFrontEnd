import react, { useEffect, useRef, useState } from "react";
import { FaClosedCaptioning, FaWindowClose } from "react-icons/fa";
import { animate, motion } from 'framer-motion'

const NoticeBoard = ({ title, description, outtime }) => {
    const parentNotice = useRef();
    const filler = useRef();
    const [fillTime, setFillTime] = useState(0);
    let timeout = 0;
    const bigWidth = parentNotice.current?.clientWidth ? parentNotice.current?.clientWidth : 410;
    const offset = 10;
    //framer-motion jobs
    const variants = {
        initial: {
            x: 200
        },
        animate: {
            x: [150, 70, 150, 0],
            transition: { duration: 1 }
        }
    }

    const _remove = () => {
        parentNotice.current.remove();
        clearInterval(timeout);
    }
    useEffect(() => {
        timeout = setInterval(() => {
            if (filler.current.clientWidth < (bigWidth - offset)) {
                setFillTime((prev) => prev + 1)
            } else {
                parentNotice.current?.remove();
                clearInterval(timeout);
            }
        }, outtime ? outtime : 50);
        return () => {
            clearInterval(timeout)
        }
    }, [])
    return <motion.div
        className={`${"notice-board-wrapper "}`}
        ref={parentNotice} variants={variants}
        initial={"initial"} animate={"animate"}
    >
        <div className='banner'>
            <div>
                <FaClosedCaptioning />
                <p>{title}</p>
            </div>
            <FaWindowClose onClick={_remove} />
        </div>
        <div className='detail'>
            <p>{description}</p>
        </div>
        <div className='filler'
            ref={filler}
            style={{ width: `${fillTime}%` }}
        ></div>
    </motion.div>
}

export default NoticeBoard;