import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../store/authStore.js'
import { useRouter } from 'expo-router'

const profile = () => {

  const { logout } = useAuthStore()
  
  const router = useRouter()
  const handleLogout = async() =>{

    try {
      await logout()
      router.push('/(auth)/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>profile</Text>
      <TouchableOpacity className=" p-3 bg-fuchsia-900 " onPress={handleLogout}>
        <Text className="font-outfit-medium text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default profile