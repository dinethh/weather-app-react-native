/* eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from "react";
import { ImageBackground, StyleSheet, TextInput, View } from "react-native";


function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState("");
  const [data, setData] = useState([]);

  const fetchDataHandler=useCallback(()=>{},[]);

  return (<View style={styles.root}>
      <ImageBackground source={require("./assects/bg.jpg")}
                       resizeMode={"cover"} style={styles.image}>
        <View>
          <TextInput placeholder={"Enter City"}
                     onChange={text => {
                       setInput(text);
                     }}
                     value={input}
                     placeholderTextColor={"#000"}
                     style={styles.textInput}
                     onSubmit={{ fetchDataHandler }}
          ></TextInput>

        </View>
      </ImageBackground>
    </View>);
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }, image: {
    flex: 1, flexDirection: "column",
  },
  textInput:{
    borderBottomWidth:0,
    padding:5,
    paddingVertical:20,
    marginVertical:100,
    marginHorizontal:20,
    backgroundColor:'#fff',
    fontSize:20,
    borderRadius:20

  }
});

export default App;
