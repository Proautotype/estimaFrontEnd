import React, { useState } from 'react';
import "../../assets/scss/accountSetup.scss";
import "../../assets/scss/workPage.scss";
import { FaEnvelope, FaEraser, FaFacebook, FaGlobe, FaInfo, FaInfoCircle, FaMailBulk, FaPhone, FaRemoveFormat } from 'react-icons/fa'
import { useNavigate } from 'react-router';
const AccountSetup = () => {
  //router
  const navs = useNavigate();
  //state
  const [mail, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState(0);
  const [type, setType] = useState(0);
  function gotoPrevious(loc) {
    navs(loc);
  }
  return (
    <div className="wrapper">
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
                <div className='info'>
                  <FaInfoCircle />
                  <p>Loop</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='ops' style={{ height: '220px',paddingBottom:'30px' }}>
            <p className='title'>Choose your Plan</p>
            <hr />
            <div className='plan-parent'>
              <div className={`plan ${plan === 0 ? "active" : ""}`} onClick={() => {
                setPlan(0)
              }}>
                <h2>Free</h2>
                <ul className='promises'>
                  <li>3 Projects</li>
                  <li>5 Estimations per project</li>
                </ul>
              </div>
              <div className={`plan ${plan === 1 ? "active" : ""}`} onClick={() => {
                setPlan(1)
              }}>
                <h2>Coffee</h2>
                <ul className='promises'>
                  <li>25 projects</li>
                  <li>10 Estimations per project</li>
                </ul>
              </div>
            </div>
            <div className='info'>
              <div className='misc'>
                <FaInfoCircle />
                <p>Loop</p>
              </div>
            </div>
          </div> */}
          <div className='action-panel'>
            <button onClick={() => gotoPrevious('/')}>
              Previous
            </button>
            <button onClick={() => gotoPrevious('/dashboard')}>
              Next
            </button>
          </div>
          <div className='action-panel'>
            <FBLogin />
          </div>
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
    <FaFacebook size={25} onClick={login}/>
  </div>
}
