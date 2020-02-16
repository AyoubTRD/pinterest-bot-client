import axios from "axios";

const servers = [
  "https://pinterest-bot-server1.herokuapp.com/",
  "https://pinterest-bot-server2.herokuapp.com/"
];

const randomServer = servers[Math.floor(Math.random() * servers.length)];

export default axios.create(
  {
    baseURL: randomServer
  }
);