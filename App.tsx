/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
// import { useEffect, useState } from 'react';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
// import Matter from "matter-js"

import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

function App(): React.JSX.Element {

  // const [engine, setEngine] = useState<GameEngine | null>(null);

  // const handleEngine = (engine: any) => {
  //   setEngine(engine)
  // }

  const [entity, setEntity] = useState(entities('10'))
  const [show, setShow] = useState(false)
  
  const changeLevel = (level: String) => {
    console.log(level)
    setShow(true)
    setEntity(entities(level))
  }

  return (
    <>
    <View style={{ flex: 1}}>

      {
      show &&  
      <><GameEngine
      //  ref={(ref) => handleEngine(ref)}
        systems={[Physics]}
        entities={entity}
        // onEvent={(e) => {
        //   switch (e.type) {
        //     case 'ZombieHit':
        //       playSound(require('./assets/fist-punch-or-kick-7171.mp3'))
        //       break
        //     case 'WallHit':
        //       // playSound(require('./assets/fist-punch-or-kick-7171.mp3'))
        //       break
        //   }
        // }}
      >
        <StatusBar hidden={true} />
      </GameEngine>
     
      <View style={{
           width: windowWidth / 15,
            height: windowWidth / 15,
             backgroundColor: 'orange',
                position: 'absolute',
                right: 0,
                borderRadius: 5
                }}>
                  <TouchableOpacity onPress={() => setShow(false)}>
                  <View style={{ 
                    width:  windowWidth / 15,
                    height:  windowWidth / 15,
                   alignItems: 'center',
                justifyContent: 'center'}}>
                  <Text >Back</Text>
                  </View>
                  </TouchableOpacity>
        </View>
      </>
      }

     { !show && <View style={
        styles.levelSection
      }>
         <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
  {Array.from({ length: 10 }, (_, index) => (
    <Pressable key={index + 1} onPress={() => 
      changeLevel(`${index + 1}`)
    // setEntity(entities(`2`))
    // setShow(true)
    }>
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{index + 1}</Text>
      </View>
    </Pressable>
  ))}
</View>

      </View>}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  numberContainer: {
    backgroundColor: 'yellow',
    width: windowWidth / 10,
    height: windowWidth / 10,
    borderRadius: windowWidth / 20,
    margin: windowWidth / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelSection: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white'
    
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
