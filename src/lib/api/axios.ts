import axios from 'axios';

const redeMetApi = axios.create({
  baseURL: process.env.BASE_URL_REDEMET,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default redeMetApi;
