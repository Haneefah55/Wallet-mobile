import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const BudgetLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='add-budget' />
    </Stack>
  )
}

export default BudgetLayout