import { create } from 'zustand'
import axios from '../utils/axios.js'
import Toast from 'react-native-toast-message'


export const useAuthStore = create((set, get) =>({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  error: null,
  setUser: (user) => set({ user }),

  login: async(email, password) =>{
    set({ isLoading: true, error: null })
    try {
      const res = await axios.post('/auth/login', { email, password })
      console.log(res.data)
      set({ isLoading: false, user: res.data, isAuthenticated: true })
    
    } catch (error) {
      console.log(error.response?.data?.message,)
      set({ error: error.response?.data?.message, isLoading: false, user: null, isAuthenticated: false })
      throw error
      
    }
  },

  signup: async(name, email, password)=>{
    set({ isLoading: true, error: null })

    try {
      const res = await axios.post('/auth/signup', { name, email, password })
      console.log("res.data", res.data)
      set({ isLoading: false })
    } catch (error) {
      console.log("error in store", error.response?.data?.message)
      set({ error: error.response?.data?.message, isLoading: false })
      throw error
    }
  },

  checkAuth: async() =>{
    set({ isLoading: true })
    try {
      const res = await axios.get('/auth/')

      set({
        user: res.data,
        isLoading: false,
        isAuthenticated: true
      })

    } catch (error) {
      console.log("check auth error", error.response?.data?.message,)
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  },

  logout: async() =>{
    try {
      const res = await axios.post('/auth/logout')
      

      set({ user: null, isAuthenticated: false })
      console.log("user logout")
    } catch (error) {
      
      //set({ user: null, error: error.message, isAuthenticated: false })
      console.log("err logingg out", error)
      
    }
  },

  verifyToken: async(token) =>{
    try {
      const res = await axios.post('/auth/verify-token', { token: String(token) })
      console.log("verify res", res.data)
      set({ user: res.data, isAuthenticated: true })
    } catch (error) {
      console.log(error)
      set({ user: null, isAuthenticated: false })
    }
  }


  
}))