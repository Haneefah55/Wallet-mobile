import axios from 'axios'
import Constants from 'expo-constants'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,    //http://10.45.55.215:5000/api',   //process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 120000,
})

export default axiosInstance