import "./App.css";
import {SocketService} from './services/SocketServices/SocketJobs';
import {  useState } from "react";

function App() {
  const [serverDetails, setServerDetails] = useState({host:"127.0.0.1",port:5000,nsp:""})
  const [value, setvalue] = useState("")
  const [others, setOtherUsers] = useState([])
  const [userName, setUserName] = useState("Proau");
  const SocketServiceActions = new SocketService(serverDetails.host,serverDetails.port,userName,serverDetails.nsp);
 
  function connectServer(){
    setServerDetails((prev) => {return {...prev,nsp:"hello"}})
    SocketServiceActions.ConnectToServer();
    SocketServiceActions.listenIncoming("server-onuser-details").then((res)=>{
      setUserName(res?.user)
      setOtherUsers(res?.others)
    });
    
  }
  function sendMessage(){
    const didIt = SocketServiceActions.sendSingleMsg("message",value)
    if(!didIt){
      alert("Connect to a room or server")
    }
  }
 
  return <div className="App">    
    <input type="text" value={serverDetails.host} onChange={({target})=> setServerDetails((prev)=>{
      return {...prev,host:target.value}
    })}/>
    <button onClick={sendMessage}>Set Host</button>
    <br></br>
    <input type="text" value={serverDetails.port} onChange={({target})=> setServerDetails((prev)=>{
      return {...prev,port:target.value}
    })}/>
    <button onClick={sendMessage}>Set Port</button>
    <br/>
    <label>Name: </label>
    <input type="text" value={userName} onChange={({target})=> setUserName(target.value)}/>
     <br/>
    <button style={{width:"200px"}} onClick={connectServer}>Connect to server</button>
    <br/>
    <input type="text" value={value} onChange={({target})=> setvalue(target.value)}/>
    <button onClick={sendMessage}>Send Message</button>
    <br/>
    <p>Other Users</p>
    <ul>
     {
       others?.map((other,i)=> <li key={other.name + i}>{other.name}</li>)
     }
    </ul>
  </div>;
}

export default App;
