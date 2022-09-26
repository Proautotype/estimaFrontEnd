import { Manager } from "socket.io-client";
import { GameManager } from "../Game/GameManager";

export class SocketService {
  instance;
  manager;
  socket;
  HOST = "";
  PORT = "";
  URL = "";
  NSP = "";
  USERNAME = "";
  GM = new GameManager();

  constructor(
    host = "http://localhost/hello",
    port = 8000,
    username = "",
    nsp = ""
  ) {
    if (Number.isNaN(Number(host.split(".").join("")))) {
      host = "127.0.0.1";
    }
    if (Number.isNaN(port)) {
      port = 8000;
    }
    this.HOST = host;
    this.PORT = port;
    this.USERNAME = username;
    this.URL = `${this.HOST}:${this.PORT}`;
  }
  connectNow = () => {
    this.socket = this.prepareConnection().socket("/");
    this.socket.connect();
  };
  prepareConnection = () => {
    this.manager = new Manager(this.URL, {
      reconnectionDelayMax: 10000,
      auth: {
        token: "123",
      },
      query: {
        username: this.USERNAME,
      },
      autoConnect: false
    });
    this.socket = this.manager.socket("/");
    return this.manager;
  }
  sendSingleMsg(data = "") {
    if (this.socket?.connected) {
      this.socket.emit("message", data);
      return true;
    } else {
      return false;
    }
  }
  getManager() {
    return {
      m: this.manager,
      s: this.socket,
    };
  }
  listenIncomingPromise(onListenCall) {
    return new Promise(
      (resolve) => {
        this.socket?.on(onListenCall, (data) => {
          resolve(data);
        });
      },
    );
  }
  //game-management
  sendGenericData(origin, data) {
    if(this.socket == null){
      this.connectNow();
    }
    this.socket?.emit(origin, data);
  }
}

