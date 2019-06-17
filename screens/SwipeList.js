import React from 'react'
import { StyleSheet, FlatList, View, Text, Animated, TouchableOpacity } from 'react-native'

import { GestureHandler } from 'expo'
const { Swipeable } = GestureHandler

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff' //try to turn in off
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    // flex: 1
    alignItems: 'flex-end'
  },
  actionText: {
    color: '#fff',
    padding: 20
  }
})

export default class SwipeItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={quotes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              {...item}
              onSwipeFromLeft={() => alert('swiped from left!')}
              onRightPress={() => alert('Long pressed right!')}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </View>
    )
  }
}

const quotes = [
  { id: '0', text: 'SWIPE LEFT OR RIGHT!' },
  { id: '1', text: 'SWIPE LEFT OR RIGHT!' },
  { id: '2', text: 'SWIPE LEFT OR RIGHT!' },
  { id: '3', text: 'SWIPE LEFT OR RIGHT!' },
  { id: '4', text: 'SWIPE LEFT OR RIGHT!' },
  { id: '5', text: 'SWIPE LEFT OR RIGHT!' },
  { id: '6', text: 'SWIPE LEFT OR RIGHT!' },
  { id: '7', text: 'SWIPE LEFT OR RIGHT!' }
]

export const Separator = () => <View style={styles.separator} />

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp' //try to remove it. so we dont pass scale value over 1
  })
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Hello :)
      </Animated.Text>
    </View>
  )
}

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0], //we start form drag of 0 so the scale is 0 and go left to -100 so the text scale to 1
    outputRange: [1, 0],
    extrapolate: 'clamp' //try to remove it. so we dont pass scale value over 1
  })
  return (
    <TouchableOpacity onLongPress={onPress}>
      <View style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Long Press
        </Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

const ListItem = ({ text, onSwipeFromLeft, onRightPress }) => (
  <Swipeable
    renderLeftActions={LeftActions}
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
    onSwipeableLeftOpen={onSwipeFromLeft}
  >
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </Swipeable>
)
