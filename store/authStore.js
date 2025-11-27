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
      console.log(error)
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
      console.log("check auth error", error)
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
    } catch (error) {
      
      set({ user: null, error: error.message, isAuthenticated: false })
      throw error
    }
  }


  
}))