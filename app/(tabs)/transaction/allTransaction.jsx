import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useTransactionStore } from '../../../store/transactionStore.js'
import { Ionicons, FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Transaction = () => {
  const { fetchAllTransactions, transactions, deleteTransaction   } = useTransactionStore()

  const fontCat = [
    {id: "salary", name: "bus" },
    {id: "freelance", name: "construct" },
    {id: "business", name: "business" },
    {id: "investments", name: "pulse" },
    {id: "gift", name: "gift" },
    {id: "rentals", name: "home" },
    {id: "others", name: "cash-outline" },
    {id: "transport", name: "bus" },
    {id: "food", name: "fast-food" },
    {id: "utilities", name: "desktop" },
    {id: "health", name: "fitness" },
    {id: "housing", name: "home" },
    {id: "shopping", name: "cart" },
    {id: "entertainment", name: "game-controller" },
  ]

  const router = useRouter()

  const handleDelete = async(id) =>{
    try {

      console.log(id)
      await deleteTransaction(id)
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() =>{

    fetchAllTransactions()
  },[fetchAllTransactions])


  return (
    <View className="flex-1 flex-col mt-10 px-4">
      <View className=" relative mb-5">
        <TouchableOpacity onPress={() => router.replace("/(tabs)/home") }>
          <Ionicons name='arrow-back' size={20} />
        </TouchableOpacity>

        <Text className="font-outfit-medium text-2xl text-center capitalize">Transaction History</Text>

      </View>
      { transactions.length === 0 &&
        <View className=" flex my-4 items-center justify-center">
          <Text className="font-outfit-semibold text-xl">No Recent Transactions</Text>
        </View>
      }


      {
        transactions.length > 0 &&
        <ScrollView
          
          vertical
          showsVerticalScrollIndicator={false}
          
          
        
        >
          <View className="flex flex-grow flex-col w-[100%] mt-2 px-3 gap-3">
          {transactions.map((item) => (
            <View key={item._id} className="bg-gray-100 px-3 py-2 rounded-lg mb-3 shadow-lg flex flex-row items-center justify-between">

              <View className="flex flex-row gap-3 items-center">
                <View className="bg-fuchsia-900 p-2 rounded-full">

                  <Font name={`${fontCat.find(cat => cat.id === item.category)?.name || ""}`} />
                  
                </View>

                <View className="flex flex-col">
                  <Text className="text-xl capitalize w-[130px] font-outfit-semibold">{item?.title}</Text>
                  <Text className="text-gray-500 text-sm  font-outfit capitalize">{item?.category}</Text>
                </View>
              </View>
              
              <View className="flex flex-row gap-2 justify-center items-center" >
                <View className="flex flex-col gap-1">
                  <Text className={` text-xl font-outfit-medium ${item?.type === "expense" ? "text-red-600" : "text-green-600"}`}>&#8358;  {item?.amount.toLocaleString()}</Text>

                  <Text className="font-outfit text-gray-500 text-sm">{item?.date?.split("T")[0]}</Text>
                </View>

                <View className="flex flex-row gap-2">
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <FontAwesome6 name='trash-can' size={15} color={`${item?.type === "expense" ? "#dc2626" : "#16a34a"}`}/>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <FontAwesome6 name='pencil' size={15} color={`${item?.type === "expense" ? "#dc2626" : "#16a34a"}`}/>
                  </TouchableOpacity>
                </View>

                  
            

              </View>
              
              
            </View>
          ))}
          </View>
        </ScrollView>
        
      }


    </View>
  )
}

export default Transaction


const Font = ({ name }) =>(
  <Ionicons name={name} size={15} color={'#fff'} />
)