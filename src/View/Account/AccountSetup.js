import React, { useEffect, useRef, useState } from 'react';
import "../../assets/scss/accountSetup.scss";
import "../../assets/scss/workPage.scss";
import {
  FaClosedCaptioning, FaEnvelope, FaEraser, FaFacebook,
  FaGlobe, FaInfoCircle, FaLock, FaPhone, FaWindowClose
} from 'react-icons/fa'
import { useNavigate } from 'react-router';
import AccountWebService from '../../services/WebServices/AccountWebService';
import { useDispatch } from 'react-redux';
import { addNotice } from '../../@redux/features/noticeSlice';
import { nanoid } from '@reduxjs/toolkit';

const AccountSetup = () => {
  //redux
  const dispatch = useDispatch();
  //router
  const navs = useNavigate();
  //state
  const [mail, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [plan, setPlan] = useState(0);
  const [type, setType] = useState(0);
  const [working, setWorking] = useState(false);
  //errors
  const [errors, setErrors] = useState([]);
  
  const AWS = new AccountWebService();
  function gotoPrevious(loc) {
    navs(loc);
  }

  async function signup(event) {
    event.preventDefault();
    setWorking(true);
    try {
      const response = await AWS.createAccount({mail,organization,phone,pin,plan});
      if(response.status === 200){
        gotoPrevious('/dashboard')
      }else{}
    } catch (error) {
      console.dir(error)
    }
    // setTimeout(() => setWorking(false), [7000])
    // gotoPrevious('/dashboard')
  }

  useEffect(()=>{
    dispatch(addNotice({ id: nanoid(7), title: "success", data: "Account created successfully", timeout: 5 }))
  },[])

  return (
    <div className="wrapper" style={{ overflowX: "hidden" }}>
      <div className='navbar'>
        <h1>~ESTIMA~</h1>
      </div>
      <div className='account-content'>
        <h1>~Account Setup~</h1>
        <div className='setup'>
          <div className='ops'>
            <p className='title'>Choose your path</p>
            <hr />
            <div className='story'>
              <p>Are you an organization or some dude? </p>
              <div className='actions'>
                <div className='form-element'>
                  <RadioButton name={'whatareyou'}
                    checked={type === 0}
                    change={() => setType(0)}
                  />
                  <p>Organization</p>
                </div>
                <div className='form-element'>
                  <RadioButton name={'whatareyou'}
                    checked={type === 1}
                    change={() => setType(1)}
                  />
                  <p>Individual</p>
                </div>
              </div>
            </div>
          </div>
          <div className='ops acc-setting'>
            <p className='title'>Account details</p>
            <hr />
            <div className='story'>
              <p>Provide certain details for us, we would like to keep tabs on you.</p>
              <div className='actions-alt'>
                <InputElement icon={<FaGlobe />} placeholder={"Enter Your organization"} setSomeValue={setOrganization} />
                <InputElement icon={<FaEnvelope />} placeholder={"Enter your mail"} setSomeValue={setEmail} />
                <InputElement icon={<FaPhone />} placeholder={"Enter your contact"} setSomeValue={setPhone} />
                <InputElement icon={<FaLock />} placeholder={"Set Pin"} setSomeValue={setPin} />
                <div className='info'>
                  <FaInfoCircle />
                  <p>Loop</p>
                </div>
              </div>
            </div>
          </div>
          <div className='action-panel'>
            <button onClick={() => gotoPrevious('/')}>
              Previous
            </button>
            <button onClick={(event) => signup(event)}>
              {!working && "Next"}
              {working && "...Working"}
            </button>
          </div>
          {/* <div className='action-panel'>
            <FBLogin />
          </div> */}
        </div>
      </div>      
    </div>
  )
}

export default AccountSetup;

export const RadioButton = ({ name, checked, change }) => {
  return <div className='RadioButton' >
    <input type={'radio'} name={name} checked={checked} onChange={change} />
    <label className='checkmark' ></label>
  </div>
}

export const InputElement = ({ placeholder, icon, setSomeValue }) => {
  const [data, setData] = useState("");
  function changeData({ target }) {
    setSomeValue(target.value);
    setData(target.value);
  }
  function clearData() {
    setData("")
  }
  return <div className='form-input-element'>
    {icon}
    <input type={'text'}
      placeholder={placeholder}
      onChange={changeData}
      value={data} />
    {data && <FaEraser className='eraser' onClick={clearData} />}
  </div>
}

const FBLogin = () => {

  const login = () => {

  }

  return <div className='fb-login' onClick={login}>
    <FaFacebook size={25} onClick={login} />
  </div>
}

