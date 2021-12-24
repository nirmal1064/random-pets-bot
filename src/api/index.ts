import axios from "axios";

const headers = {
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    "Accept-Version": "v1"
  }
};

const API = axios.create(headers);

export default API;
