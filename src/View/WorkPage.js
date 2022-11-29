import React from 'react';
import {FaAngular, FaBalanceScale, FaHamburger} from 'react-icons/fa'
import { useNavigate } from 'react-router';
import "../assets/scss/workPage.scss";

export const WorkPage = () => {

    const navs = useNavigate();

    function _goto_setup(event){
        event.preventDefault();
        navs("login");
    }

    return (
        <div className='wrapper'>
            <div className='navbar'>
                <h1>~ESTIMA~</h1>
            </div>
            <div className='content'>
                <h1 className='q1'>What is estima?</h1>
                <p>A tool for aiding sprint task complexity measurement.<br></br>
                    Your task is estimated project base, therefore add as many project your like.
                    <br></br>
                    Estima understands headache, and provides more than three (3) means to estimate a task.
                </p>
                <h1 className='q2'>Access to previous estimation?</h1>
                <p>Oh yeah, don't worry about your previously estimated task, we keep them for you!.
                    Base on your selected plan you get corresponding backup.</p>
                <div className='login'>
                    <button onClick={_goto_setup}>Join Us</button>
                </div>
            </div>
            <div className='footer'>
                <h2>Companies with us</h2>
                <div className='company-box'>
                    <div className='company'>
                        <p>Estima</p>
                        <FaBalanceScale size={30}/>
                    </div>
                    <div className='company'>
                        <p>Amalitech</p>
                        <FaAngular size={30}/>
                    </div>
                    <div className='company'>
                        <p>Jumia</p>
                        <FaHamburger size={30}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
