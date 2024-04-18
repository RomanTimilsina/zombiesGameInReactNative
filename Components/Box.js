import React, { useEffect, useState } from "react";
import { Image, View } from 'react-native';
import { explosion, ra } from "../physics";
const Box = (props) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  const angle = props.body.angle;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const boom = [
    require('../assets/boom1.png'),
    require('../assets/boom2.png'),
    require('../assets/boom3.png'),
    require('../assets/boom2.png'),
    require('../assets/boom3.png'),
    require('../assets/boom2.png'),
    require('../assets/boom3.png'),
    require('../assets/boom1.png'),
   
  ];
  
  let hide = explosion == 1

  console.log(hide)
  useEffect(() => {
    let interval;
    
   
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => prevIndex === boom.length - 1 ? prevIndex : (prevIndex + 1) % boom.length);
      }, 100);

    return () => clearInterval(interval);
  }, [hide]);

  return (

    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        // backgroundColor: props.color || "pink",
        // transform: [{rotate: `${ra}deg`}],
        // opacity: explosion
        
      }}
    >
      {
        currentImageIndex < 7 ?
      <Image
      width={700}
      height={200}
                style={{ width: 200, height: 200, left: 0, top: 0}}
                source={boom[currentImageIndex]}
            ></Image>
            :
            <></>
          }
    </View>
    
  );
};
export { Box };