import axios from "axios";

const servers = [
  "https://pinterest-bot-server1.herokuapp.com/",
  "https://pinterest-bot-server2.herokuapp.com/",
  "https://pinterest-bot-server3.herokuapp.com/",
  "https://pinterest-bot-server4.herokuapp.com/",
  "https://pinterest-bot-server5.herokuapp.com/"
];

const randomServer = servers[Math.floor(Math.random() * servers.length)];

export default axios.create(
  {
    baseURL: randomServer
  }
);