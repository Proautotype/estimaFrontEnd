import { Manager } from "socket.io-client";

export class SocketManager {
  manager = null;
  HOST = "";
  PORT = "";
  URL = "";
  USERNAME = "";
  clientSocket = null;
  constructor(host = "http://localhost/", port = 5000, username = "") {
    if (Number.isNaN(Number(host.split(".").join("")))) {
      host = "127.0.0.1";
    }
    if (Number.isNaN(port)) {
      port = 5000;
    }
    this.HOST = host;
    this.PORT = port;
    this.USERNAME = username;
    this.URL = `${this.HOST}:${this.PORT}`;
    this.manager =  new Manager(this.URL, {
      reconnectionDelayMax: 10000,
      auth: {
        token: "123",
      },
      query: {
        "my-key": "my-value",
        username: this.USERNAME,
      },
    });
    this.clientSocket = this.manager.socket("/");
    return {manager:this.manager,clientSocket:this.clientSocket};
  }
}
