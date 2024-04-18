import Matter from 'matter-js'
import React from 'react'
import { View, Image, Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Bg = props => {
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    const color = props.color
    return (
        <Image
            source={require('../assets/background.jpeg')}
            style={{
                width: windowWidth,
                zIndex: -20,
                height: windowHeight,
                left: 0,
                top: 0,
                position: "absolute",
                // opacity: 0,
                zIndex: -500
            }}
        ></Image>
    )
}

export default (world, color, pos, size) => {
    const initialBg = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: "Bg",
            isStatic: true
        }
    )
    
    Matter.World.add(world, initialBg)
    
    return {
        body: initialBg,
        color,
        pos,
        renderer: <Bg />
    }
}

