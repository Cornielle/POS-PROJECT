import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import normalize from 'react-native-normalize';
import { Text } from 'native-base';
export default class ModalControls extends React.Component {
  _goBack = (backDirection) => this.props.navigation.goBack(backDirection);
  render() {
    const { modalTitle,back } = this.props
    return (
        <SafeAreaView>
          <Appbar.Header style={styles.Header} noShadow={true} >
          <Appbar.BackAction
            onPress={this.props.hideModal}
            color={styles.title.color} 
          />
          <Appbar.Content 
            color={styles.title.color}
            title={modalTitle} 
            titleStyle={styles.title}
            />  
          <TouchableOpacity  
            style={{alignItems: "flex-end",color:'#fff'}} 
          >
            <Text style={{alignItems: "flex-end", marginLeft:normalize(28),color:'#fff'}}>Guardar</Text>
          </TouchableOpacity>
        </Appbar.Header>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  titleContent: {
    left: normalize(40),
    flex: 1,
    color:'#ffffff'
  },
  title: {
    color: '#ffffff',
    fontSize:16,
    marginLeft:normalize(61),
  },
  Header:{
    alignItems: 'center',
    backgroundColor: '#0b8793',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    paddingBottom:normalize(35),
    paddingRight:normalize(28)
  },
  headerContent:{
    alignItems: "center", marginLeft:28,
  }
});