import { View, Text, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import { KeyboardAwareScrollView,  } from 'react-native-keyboard-aware-scroll-view';
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useAuthStore } from '../../store/authStore';
import { Ionicons, Lucide } from '@expo/vector-icons';

const LoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login, isLoading, error, user } = useAuthStore()

  const handleLogin = async() =>{
   try {
     if(!email || !password){
      Alert.alert("Please fill all the fields")
      return
    }
    console.log(email, password)

    await login(email, password)
    
    

   } catch (error) {
    
   }
  }

  useEffect(() =>{

    if(user){
      router.replace('/(tabs)/home')
    }
  }, [user])


  return (

    <KeyboardAwareScrollView 
      style={{ flex: 1, backgroundColor: "#fae8ff" }}
      extraScrollHeight={Platform.OS === "ios" ? 20 : 50} // Optional: Adjusts extra space when keyboard appears
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps='handled'
      keyboardOpeningTime={0}
      
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 bg-fuchsia-100 items-center justify-center w-[100%] px-4">

        <Image
          className="w-[250px] h-[250px] object-contain"
          source={require("../../assets/images/icon.png")}

        />

        <Text className="font-outfit-bold text-4xl mt-3 ">Welcome Back</Text>

        <TextInput 
          value={email}
          className="p-3 bg-white border-2 border-fuchsia-900 font-outfit rounded-lg  w-[280px] mt-3 placeholder:text-grey-400"
          placeholder='Enter your email'
          autoCapitalize='none'
          onChangeText={(email) => setEmail(email)}
          keyboardType='email-address'

        />

        <TextInput 
          value={password}
          className="p-3 bg-white border-2 border-fuchsia-900 font-outfit rounded-lg  w-[280px] mt-3 placeholder:text-grey-400"
          placeholder='Enter your password'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}

        />


        <TouchableOpacity className="w-[280px] bg-fuchsia-900 text-white mt-3 p-3 flex rounded-lg items-center justify-center" onPress={handleLogin}>
          <Text className="text-white font-outfit-semibold text-2xl">
            {isLoading ? 
              "Loading..."
            : "Log In"}
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row mt-3 items-center justify-center">
          <Text className="text-gray-700 text-xl font-outfit-medium">Don't have an account?</Text>
         
          <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
            <Text className="text-gray-600 ml-2 text-xl font-outfit-medium">Sign Up</Text>
          </TouchableOpacity>
          

        </View>


      </View>

    </KeyboardAwareScrollView>
    
  )
}

export default LoginScreen