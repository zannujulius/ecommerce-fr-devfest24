import axios from "axios";
import toast from "react-hot-toast";
const controller = new AbortController();

const instance = axios.create({
  baseURL: "https://api.mms.chanels.io/",
});

instance.interceptors.request.use(async (config) => {
  try {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");

    if (config.data) {
      config.data.sessionid = token;
      config.data.callerid = username;
    }
    config.signal = controller.signal;
    return config;
  } catch (err) {
    toast.error(err);
  }
});

instance.interceptors.response.use(
  (response) => {
    // console.log(response, "line 27");
    return response;
  },
  (err) => {
    // if (err.response && err.response.status == 403) {
    //   return (window.location.href = "/");
    // }
    // if (err.response && err.response.status == 401) {
    //   localStorage.clear();
    //   return (window.location.href = "/");
    // }
    // if (err.response && err.response.status >= 500) {
    //   // interval server error
    //   // console.log(err.response, "line controller");
    //   window.location.href = "/servererror";
    // }
    // // console.log(err.message, "line 36");
    // return Promise.reject(err);
  }
);

export default instance;
