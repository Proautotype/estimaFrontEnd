import axios from "axios";

const AxiosWebConnector = axios.create({ 
    baseURL:"http://localhost:8000",
    headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// AxiosWebConnector.interceptors.request.use("/createAccount",(req)=>{})
// AxiosWebConnector.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     async (err) => {
//       const originalConfig = err.config;
  
//       if (originalConfig.url !== "/auth/token" && err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;
  
//           try {
//             // const { data } = await Api.post("/auth/token/refresh/", {
//             //   refresh: getFreshToken(),
//             // });
//             return AxiosWebConnector(originalConfig);
//           } catch (_error) {
//             return Promise.reject(_error);
//           }
//         }
//       }
  
//       return Promise.reject(err);
//     }
//   );

export default AxiosWebConnector;