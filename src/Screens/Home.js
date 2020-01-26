import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>eo</Text>
        <Appbar style={styles.bottom}>
          <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
          <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
          <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
          <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
        </Appbar>
      </View>
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
