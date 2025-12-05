import axios from 'axios'
import Constants from 'expo-constants'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 120000,
})

export default axiosInstance