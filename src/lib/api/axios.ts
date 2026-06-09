import axios from 'axios';


const getEnvBase = () => {
  
  const baseUrl = process.env.BASE_URL_REDEMET;

  if (!baseUrl) {
    throw new Error("BASE_URL_REDEMET não configurada");
  }

  return baseUrl
}

const redeMetApi = axios.create({
  baseURL: getEnvBase(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default redeMetApi;



