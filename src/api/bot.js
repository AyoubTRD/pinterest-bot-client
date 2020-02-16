import axios from "axios";

export default axios.create(
  {
    baseURL: "https://pinterest-bot-server1.herokuapp.com/"
  }
)