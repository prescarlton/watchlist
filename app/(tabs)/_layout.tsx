import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Colors from '@/constants/Colors'

export default function TabLayout() {
  const scheme = useColorScheme()
  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[scheme].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="search" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: 'List',
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="list" color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  )
}
