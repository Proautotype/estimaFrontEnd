import {Manager} from 'socket.io-client';

export class SocketService{
    manager = null;
    socket = null;
    HOST = "";
    PORT = "";
    URL = "";
    NSP = "";
    USERNAME= "";
    constructor(host="http://localhost/hello",port = 5000,username= "", nsp= ""){
       if(Number.isNaN(Number(host.split(".").join("")))){
           host = "127.0.0.1";
       }
       if(Number.isNaN(port)){
            port = 5000;
       }
       this.HOST = host;
       this.PORT = port;
       this.USERNAME = username
       this.URL = `${this.HOST}:${this.PORT}`
    }
    ConnectToServer(host =  this.HOST,port = this.PORT, nsp = this.NSP){
        
        if(Number.isNaN(Number(host.split(".").join("")))){
            host = "127.0.0.1";
        }
        if(Number.isNaN(port)){
             port = 5000;
        }
        this.HOST = host;
        this.PORT = port;
        this.URL = `${this.HOST}:${this.PORT} ${this.NSP ? "/"+this.NSP : "/"}`
        console.log(this.URL, "nsp", this.NSP)
        this.manager =  new Manager(this.URL, {
        reconnectionDelayMax: 10000,
        auth: {
          token: "123"
        },
        query: {
          "my-key": "my-value",
          "username":this.USERNAME
        },
      });    
      this.socket = this.manager.socket("/");
    }
    sendSingleMsg(data = ""){
        if(this.socket?.connected){
            this.socket.emit("message", data);
            return true;
        }else{
            return false;
        }       
    }
    listenIncoming(onListenCall){
        return new Promise(resolve=>{
            this.socket?.on(onListenCall,(data)=>{
                resolve(data);
            })   
        },reject=>{})           
    }
}

