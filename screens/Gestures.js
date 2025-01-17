import React, { Component } from 'react'
import { StyleSheet, View, Text, PanResponder, Animated } from 'react-native'

class Draggable extends Component {
  state = {
    showDraggable: true,
    dropAreaValues: null,
    pan: new Animated.ValueXY(),
    opacity: new Animated.Value(1)
  }

  componentWillMount() {
    this._val = { x: 0, y: 0 }
    this.state.pan.addListener(value => (this._val = value))

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y
        })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000
          }).start(() =>
            this.setState({
              showDraggable: false //
            })
          )
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start()
        }
      }
    })
  }

  isDropArea(gesture) {
    // view height + offset . we add offset maybe because of the AreaSafeView
    return gesture.moveY < 200 + 88
  }

  render() {
    return <View style={{ width: '20%', alignItems: 'center' }}>{this.renderDraggable()}</View>
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    //if false (happen when we drag to drop zone then circle will not get render)
    if (this.state.showDraggable) {
      return (
        <View>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, { opacity: this.state.opacity }]}
          />
        </View>
      )
    }
  }
}

export default class DragAndDrop extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          <Text style={styles.text}>Drop them here!</Text>
        </View>
        <View style={styles.ballContainer} />
        <View style={styles.row}>
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
          <Draggable />
        </View>
      </View>
    )
  }
}

const CIRCLE_RADIUS = 30
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height: 200
  },
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  row: {
    flexDirection: 'row'
  },
  dropZone: {
    height: 200,
    backgroundColor: '#00334d'
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  }
})
