import Matter from 'matter-js'
import React from 'react'
import { View } from 'react-native'
import { ballMove, ballPos } from '../physics'
export const ballPosArr = []
const Ball = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    ballPosArr.unshift(ballPos)

    const name = props.name
    // if (props.name == 'ball') {
    //     ballPos.x = props.body.position.x
    //     ballPos.y = props.body.position.y
    // }
    const id = props.ids
    const color = props.color;
    const radius = props.radius;
    return (
        <View style={{
            backgroundColor: name === 'ball1' ? 'yellow' : color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: radius * 2,
            height: radius * 2,
            borderWidth: 1,
            borderRadius: radius,
            opacity: name === 'ball' ? 0 : name === 'ball1' ? 1 : 0 ,
            overflow: 'hidden'
        }} />
    )
}

export default (world, color, pos, radius, ids, name = 'notBall', notRestitute = false) => {
    const initialBall = Matter.Bodies.circle(
        pos.x,
        pos.y,
        radius,
        {
            label: 'Ball',
            restitution: true,
            //    friction: true
        }
    )

    if (notRestitute) {
        initialBall.restitution = false
    }
    
    if (name == 'notBall') {
        // initialBall.isStatic = true
        initialBall.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
    }

    // if (name != 'barrel') {
    //     // initialBall.isStatic = true
    //     initialBall.collisionFilter = {
    //         'group': -1,
    //         'category': 2,
    //         'mask': 0,
    //     };
    // }

    Matter.World.add(world, initialBall)
    return {
        body: initialBall,
        color,
        pos,
        radius,
        ids,
        name,
        renderer: <Ball />
    }
}





