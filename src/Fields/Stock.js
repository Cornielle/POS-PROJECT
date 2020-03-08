import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,Alert} from 'react-native'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'

import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import ListaCategoria from '../../BindObject/PickerBind'
import Articulos from '../../Models/Articulos'


const styles = StyleSheet.create({
  ViewStyle:{
      backgroundColor:"#f6f6f6",
  },
  Form: {
      padding:normalize(15),
      marginBottom:10,
  },
  Input: {
      color: '#161924',
      fontSize: 14,
      fontWeight:"200",
      backgroundColor:'#FFFFFF',
  },
  Button:{
      color:'#ffffff',
  }
})



export default class Stock extends React.Component {


constructor(){

super()

}

state={
ArticuloId:"",
CantidadExistencia:""
 }



  render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state

return(

<ScrollView>
<View style={styles.ViewStyle}> 

<Header name={name} subtitle={subtitle} goBackEnabled={true} navigationEnabled={false} navigation={navigation} />

<View style={styles.Form}>

<Card>
<Card.Title style={styles.Card} title="Stock" subtitle={subtitle} left={(props)=> <Avatar.Icon {...props} icon="account" />}   />

<Card.Content>

<TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Nombre'
                                value={this.state.NOMBRE}
                                onChangeText={(NOMBRE)=> this.setState({NOMBRE})}
                            />
                            <Text>{"\n"}</Text> 

</Card.Content>



</Card>

</View>


</View>
  </ScrollView>

)


  }


}