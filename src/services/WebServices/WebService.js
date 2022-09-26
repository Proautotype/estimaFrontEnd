import axios from "axios";
export class WebService {
  async createGame(gameDetail) {
    // const {admin, server, ID, adminAsMember,socketService } = gameDetail;
    try {
      const { data, status } = await axios({
        baseURL: "http://localhost:8000/showcard",
        url: `/create`,
        method: "POST",
        data: gameDetail,
        params: gameDetail,
      });
      const socketService = gameDetail?.socketService;
      socketService.sendGenericData("create-server", {
        admin: gameDetail?.admin,
        room: gameDetail?.server,
        ops: "cg"
      });
      return {
        status,
        data
      };
    } catch (error) {
      return {
        status: error?.response?.data?.errorNumber,
        data: error?.response?.data?.description
      };
    }
  }

  async joinGame(gameDetail) {
    try {
      const { data, status } = await axios({
        baseURL: "http://localhost:8000/showcard",
        url: `/join`,
        method: "POST",
        data: gameDetail,
      });
      if(status === 201){
        return {
          status,
          body:data
        }
      }
    } catch (error) {
      console.dir(error);
    }
  }
}
