import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'
import { Badge } from 'react-native-paper'
import { View,Modal,Text, TouchableHighlight } from 'react-native'
import Header from '../Components/Header'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';


export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalVisible:false,
        checked:'unchecked',
        index:0,
        list: [
          {
            key:1,
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Camarero',
            estado: false
          },
          { key:2,
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Cocinero',
            estado: false
          },
        ],
        optionArray: [
          'Editar',
          'Activar',
          'Cancel'
        ],
    };
    this._showMenu = this._showMenu.bind(this);
  }
    _showMenu(index){
      this.setState({
        index
      })
      this.state.list[index]['estado']
      ? this.state.optionArray[1] = 'Desactivar' 
      : this.state.optionArray[1] = 'Activar'  
    }
    _makeAction(action){    
      switch(action){
        case 0:
          break
        case 1:
          this.state.list[this.state.index]['estado'] = !this.state.list[this.state.index]['estado']
          this.setState({ state: this.state });
          break
        default:
          break
      }
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
        //To show the Bottom ActionSheet
        this.ActionSheet.show();
    }
  render(){
    const {name, subtitle, navigation} = this.props
    return(
      <View>
      <Header 
        name={name} 
        subtitle={subtitle} 
        goBackEnabled={true} 
        navigationEnabled={true} 
        navigation={navigation}
      />
        {this.state.list.map((l, i) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}            
            >
            <ListItem
              onPress={() => this._showMenu(i)}
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              rightAvatar={ l.estado === true ? <Badge>Activado</Badge> : <Badge>Desactivado</Badge>}
              title={l.name}
              subtitle={l.subtitle}
              icon=""
              bottomDivider
            />
            </TouchableOpacity>
            </View>
          ))
        }
            <ActionSheet
              onPress={(index) => this._makeAction(index)}
              ref={o => (this.ActionSheet = o)}
              //Title of the Bottom Sheet
              title={'¿Que deseas hacer?'}
              //Options Array to show in bottom sheet
              options={this.state.optionArray}
              //Define cancel button index in the option array
              //this will take the cancel option in bottom and will highlight it
              cancelButtonIndex={2}
              //If you want to highlight any specific option you can use below prop
              destructiveButtonIndex={1}
            />
      </View>
    );
  } 
}
