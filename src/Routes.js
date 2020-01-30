import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route} from "react-router-native";

import Home from "../src/Screens/Home"
import Products from "./Screens/Products"
export default class Routes  extends React.Component {
  render(){
    return (
    <NativeRouter>
      <View style={styles.container}>
          <Route exact component={Home} />
      </View>
    </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
