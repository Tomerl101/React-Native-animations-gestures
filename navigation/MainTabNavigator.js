import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import Accelerometer from '../screens/Accelerometer'
import GeoLocation from '../screens/GeoLocation'
import Gesures from '../screens/Gestures'
import Gyroscope from '../screens/Gyroscope'
import SwipeList from '../screens/SwipeList'

const AccelerometerStack = createStackNavigator({
  Accelerometer
})

AccelerometerStack.navigationOptions = {
  tabBarLabel: 'Accelerometer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

const GeoLocationStack = createStackNavigator({
  GeoLocation
})

GeoLocationStack.navigationOptions = {
  tabBarLabel: 'GeoLocation',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  )
}

const GesturesStack = createStackNavigator({
  Gesures
})

GesturesStack.navigationOptions = {
  tabBarLabel: 'Gestures',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  )
}

const SwipeListStack = createStackNavigator({
  SwipeList
})

SwipeListStack.navigationOptions = {
  tabBarLabel: 'Swipe',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  )
}

const GyroscopesStack = createStackNavigator({
  Gyroscope
})

GyroscopesStack.navigationOptions = {
  tabBarLabel: 'Gyroscope',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  )
}

export default createBottomTabNavigator({
  AccelerometerStack,
  GeoLocationStack,
  GesturesStack,
  SwipeListStack,
  GyroscopesStack
})
