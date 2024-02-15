import axios from 'axios';

//  base URL
export const API = axios.create({
  baseURL: 'https://cards.forebearpro.co.in/api/v1',
});
