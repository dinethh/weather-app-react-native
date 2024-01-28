/* eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from "react-native";



function App(){
  return (
    <View style={styles.root}>
   <ImageBackground source={require('./assects/bg.jpg')}
   resizeMode={'cover'} style={styles.image}>

   </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  image:{
    flex:1,
    flexDirection:"column",
  }
});

export default App;
