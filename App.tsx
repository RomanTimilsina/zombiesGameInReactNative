/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import { useEffect, useState } from 'react';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';


function App(): React.JSX.Element {

  // const [engine, setEngine] = useState(null)

  return (
    <>
    <View style={{ flex: 1}}>
      <GameEngine
        // ref={(ref) => setEngine(ref)}
        systems={[Physics]}
        entities={entities()}
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
    </View>
    </>
  );
}

const styles = StyleSheet.create({
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
