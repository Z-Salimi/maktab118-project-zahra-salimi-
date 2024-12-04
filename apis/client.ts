
import axios from 'axios';

export const client = async () => {
  return axios.create({
    baseURL: 'http://localhost:8000/',
  });
};
