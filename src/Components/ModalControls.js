import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AppBar } from 'react-native-paper';
import normalize from 'react-native-normalize';
import { Text } from 'native-base';

export default class ModalControls extends React.Component {
  _goBack = (backDirection) => this.props.navigation.goBack(backDirection);
  render() {
    const { modalTitle } = this.props
    return (
        <SafeAreaView>
          <AppBar.Header style={styles.Header } noShadow={true} >
          <AppBar.BackAction
            onPress={this.props.hideModal}
            color={styles.title.color} 
          />
          <AppBar.Content 
            color={styles.title.color}
            title={modalTitle} 
            titleStyle={modalTitle.length>15? {marginLeft:normalize(60),fontSize:16} : {marginLeft:normalize(61),fontSize:16} }
            />  
          <TouchableOpacity  
            style={{alignItems: "flex-end",color:'#fff'}} 
          >
            {this.props.isEdit === false && 
              <Text 
              style={{alignItems: "flex-end", marginLeft:normalize(28),color:'#fff'}}
              onPress={()=>this.props.saveEdit()}
              >Guardar</Text>
            }
          </TouchableOpacity>
        </AppBar.Header>
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
    marginLeft:normalize(61)
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