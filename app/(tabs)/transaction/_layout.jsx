import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TransactionLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='addTransaction' />
      <Stack.Screen name='allTransaction' />
      <Stack.Screen name='edit-transaction' />
    </Stack>
  )
}

export default TransactionLayout