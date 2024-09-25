import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'

export default function _layout() {
  return (
      <Tabs
      tabBar={props=> <TabBar {...props} />}
      >
  
  
        <Tabs.Screen
          name='index'
          options={{
            title: 'EVENTS',
            // tabBarIcon: 'home',
          }}
          />
  
        <Tabs.Screen
          name='daily'
          options={{
            title: 'DAILY',
            // tabBarIcon: 'search',
          }}
          />
  
        <Tabs.Screen
          name='venues'
          options={{
            title: 'VENUES',
            // tabBarIcon: 'plus',
          }}
          />
  
        <Tabs.Screen
          name='profile'
          options={{
            title: 'PROFILE',
            // tabBarIcon: 'user',
          }}
          />
        
        </Tabs>
       
        

  )
}