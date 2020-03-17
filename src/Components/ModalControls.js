import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import normalize from 'react-native-normalize';
import {FontAwesome5} from '@expo/vector-icons';
import { Text } from 'native-base';
export default class ModalControls extends React.Component {
  _goBack = (backDirection) => this.props.navigation.goBack(backDirection);
  render() {
    const { modalTitle,backDirection } = this.props
    return (
        <SafeAreaView>
          <Appbar.Header>
          <Appbar.BackAction
            onPress={this._goBack}
            color={styles.title.color}
          />
          <Appbar.Content 
            color={styles.title.color}
            title={modalTitle} 
            style={{alignItems: "center"}}
            />  
          <TouchableOpacity  
            style={{alignItems: "flex-end", margin:16}} 
          >
            <Text>Guardar</Text>
          </TouchableOpacity>
        </Appbar.Header>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleContent: {
    left: normalize(50),
    flex: 1,
    color:'#ffffff'
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight:'200' 
  },
  Header:{
    alignItems: 'center',
  }
});