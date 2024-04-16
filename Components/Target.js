import Matter from 'matter-js'
import React from 'react'
import { View } from 'react-native'
export const ballPos = { x: 0, y: 0 }
const Target = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    ballPos.x = xBody
    ballPos.y = yBody
    // console.log(ballPos)
    const color = props.color;
    const radius = props.radius;
    return (
        <View style={{
            borderColor: color,
            borderWidth: 1,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: 20 * 2,
            height: 20 * 2,
            borderRadius: 20,
            // overflow: 'hidden'
        }}>
            <View style={{
                backgroundColor: color,
                position: 'absolute',
                left: widthBody / 2,
                top: heightBody / 2,
                width: 2 * 2,
                height: 2 * 2,
                transform: [{ translateX: -1 / 2 }, { translateY: -1 / 2 }],
                borderRadius: 2,
                // overflow: 'hidden'
            }} />
            <View style={{
                backgroundColor: color,
                position: 'absolute',
                left: widthBody / 2 - 25,
                top: heightBody / 2,
                width: 10,
                height: 2,
                transform: [{ translateX: -1 / 2 }, { translateY: -1 / 2 }],
            }}
            />
            <View style={{
                backgroundColor: color,
                position: 'absolute',
                left: widthBody / 2,
                top: (heightBody / 2) - 25,
                width: 2,
                height: 10,
                transform: [{ translateX: -1 / 2 }, { translateY: -1 / 2 }],
            }}
            />
            <View style={{
                backgroundColor: color,
                position: 'absolute',
                left: widthBody / 2,
                top: (heightBody / 2) + 15,
                width: 2,
                height: 10,
                transform: [{ translateX: -1 / 2 }, { translateY: -1 / 2 }],
            }}
            />
            <View style={{
                backgroundColor: color,
                position: 'absolute',
                left: widthBody / 2,
                top: (heightBody / 2) + 15,
                width: 2,
                height: 10,
                transform: [{ translateX: -1 / 2 }, { translateY: -1 / 2 }],
            }}
            />
            <View style={{
                backgroundColor: color,
                position: 'absolute',
                left: widthBody / 2 + 14,
                top: (heightBody / 2),
                width: 10,
                height: 2,
            }}
            />
        </View>
    )
}
export default (world, color, pos, radius) => {
    const initialTarget = Matter.Bodies.circle(
        pos.x,
        pos.y,
        radius,
        {
            label: 'Target',
        }
    )
    initialTarget.collisionFilter = {
        'group': -1,
        'category': 2,
        'mask': 0,
    };
    Matter.World.add(world, initialTarget)
    return {
        body: initialTarget,
        color,
        pos,
        radius,
        renderer: <Target />
    }
}
