import Matter from 'matter-js';
// import React, { useEffect, useState } from 'react';
import { Image, Dimensions, View, Text } from 'react-native';
import { angle, opacity } from '../physics';

export const zombieHit = []

const Commander = props => {
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    const color = props.color

    return (
        <View style={{
            backgroundColor: color,
            // borderWidth: 1,
            left: xBody,
            top: yBody,
            position: 'absolute',
            height: heightBody,
            width: widthBody, 
            // opacity: 0
        }}>
            <Image
                style={{ width: 100, height: 90, left: 0, top: 0, transform: [{ rotateZ: `${angle}deg` }] }}
                source={require("../assets/commander.png")}
            ></Image>
        </View>
    )
}

export default (world, pos, size, color) => {
    const initialCommander = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height - 20,
        {
            label: "Commander",
            isStatic: true
        }
    )

    initialCommander.collisionFilter = {
        'group': -1,
        'category': 2,
        'mask': 0,
    };

    Matter.World.add(world, initialCommander)
    return {
        body: initialCommander,
        pos,
        color,
        renderer: <Commander />
    }
}

