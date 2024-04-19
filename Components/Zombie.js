import Matter from 'matter-js';
import React, { useEffect, useState } from 'react';
import { Image, View} from 'react-native';
import { levels } from '../physics';

export var zombieHit = []
let i = 0
let prevLevel = ``
const Zombie = props => {
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2
  hitZombie = false
  hitZombie = true
  let hitZombie = zombieHit.includes(parseInt(props.body['0']))
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const level = levels
  // console.log(level)
  if (prevLevel !== level) {
    zombieHit = []
    prevLevel = level
  }

  const idleImageSources = [
    require('../assets/Idle(1).png'),
    require('../assets/Idle(2).png'),
    require('../assets/Idle(3).png'),
    require('../assets/Idle(4).png'),
    require('../assets/Idle(5).png'),
    require('../assets/Idle(6).png'),
    require('../assets/Idle(7).png'),
    require('../assets/Idle(8).png'),
    require('../assets/Idle(9).png'),
    require('../assets/Idle(10).png'),
    require('../assets/Idle(11).png'),
    require('../assets/Idle(12).png'),
    require('../assets/Idle(13).png'),
    require('../assets/Idle(14).png'),
    require('../assets/Idle(15).png'),
  ];
  const deadImageSources = [
    require('../assets/Dead(1).png'),
    require('../assets/Dead(2).png'),
    require('../assets/Dead(3).png'),
    require('../assets/Dead(4).png'),
    require('../assets/Dead(5).png'),
    require('../assets/Dead(6).png'),
    require('../assets/Dead(7).png'),
    require('../assets/Dead(8).png'),
    require('../assets/Dead(9).png'),
    require('../assets/Dead(10).png'),
    require('../assets/Dead(11).png'),
    require('../assets/Dead(12).png'),
  ];
  useEffect(() => {
    let interval;
    if (hitZombie) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex === 11) {
            clearInterval(interval);
            return prevIndex;
          } else {
            return (prevIndex + 1) % deadImageSources.length;
          }
        });
      }, 50);
    } else {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % idleImageSources.length);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [hitZombie]);
  return (
    <View style={{
      // borderWidth : 1,
      left: xBody,
      top: !hitZombie ? yBody + 5 : yBody + 15,
      position: 'absolute',
      height: heightBody + 20,
      width: widthBody - 40
    }}>
      { !hitZombie ?
      <Image
        style={{ width: 75, height: 80, left: -20, top: - 15 }}
        source={idleImageSources[currentImageIndex] }
      ></Image>
    :
    <Image
    style={{ width: 75, height: 80, left: -20, top: - 15 }}
    source={deadImageSources[currentImageIndex] }
    />
    }
    </View>
  )
}
export default (world, pos, size, zombieAtt, level) => {
  const initialZombie = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height - 20,
    zombieAtt,
    {
      label: "Zombie",
      isStatic: true
    }
  )
  initialZombie.isStatic = true
  initialZombie.collisionFilter = {
    'group': -1,
    'category': 2,
    'mask': 0,
  };

  Matter.World.add(world, initialZombie)

  return {
    body: initialZombie,
    pos,
    level,
    renderer: <Zombie />
  }
}