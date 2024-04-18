import Matter from 'matter-js';
import React, { useEffect, useState } from 'react';
import { Image, Dimensions, View, Text } from 'react-native';
import { boomHit, explosion } from '../physics';

let i = 0
const BoxBomb  = props => {
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2
  return (
    <View style={{
      // borderWidth : 1,
    //   backgroundColor: 'pink',
      left: xBody,
      top: !boomHit ? yBody + 20 : yBody + 15,
      position: 'absolute',
      height: !boomHit ? heightBody  : heightBody + 100 ,
      width: !boomHit ?  widthBody  : widthBody + 100,
      zIndex: 100,
      opacity: explosion
    }}>
      { 
        <Image
                style={{ width: 50, height: 70, left: 0, top: 0, transform: [{ rotateZ: `30deg` }] }}
                source={require("../assets/kaboom.png")}
            ></Image>
      }
        
    </View>
  )
}

export default (world, color, pos, size) => {
  const initialBoxBomb= Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height - 20,
    {
      label: "BoxBomb"
    }
  )
  initialBoxBomb.collisionFilter = {
    'group': -1,
    'category': 2,
    'mask': 0,
  };
  Matter.World.add(world, initialBoxBomb)
  return {
    body: initialBoxBomb,
    pos,
    color,
    renderer: <BoxBomb />
  }
}