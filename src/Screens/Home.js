import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View,AsyncStorage ,ScrollView, FlatList, Picker,Alert, KeyboardAvoidingView, TouchableHighlight,  ToastAndroid, Dimensions,Platform} from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import * as Filesystem from "expo-file-system"
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Icon from 'react-native-vector-icons/FontAwesome';
import Empleados from '../../Models/Empleados.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Roles from "../../Models/Roles"
import Menu from "../../Models/Menu"
import AwesomeAlert  from  "react-native-awesome-alerts"
import RolMenu from '../../Models/RolMenu'
import DataMenu from "../Helpers/DataCall"

const data = [
    { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
    // { key: 'K' },
    // { key: 'L' },
  ];
  
 const  numColumns = 3

export default class Home extends  React.Component{

constructor(navigation){

super(navigation);


}


state={

  

}


 componentDidMount(){
this.LoadingD();

 // this.AnotherCall();
}




AnotherCall = () =>{

  /*
  let result =[];
  const db = SQLite.openDatabase("PuntoVentaDb.db");

  db.transaction(function(txn){

txn.executeSql("SELECT * FROM Menu",1,(tx,results) => {

var len = results.rows.length;

console.log(len)

result =  results.rows; 

this.sest

})

  })

console.log(this.state.count);
*/

}






LoadingD = async() =>{


try{


  const dataMenu=[]


  const idMenues =[]

  const sing ="?"
  let inFactory =",?"
  
    const Menues =await AsyncStorage.getItem('LoggedUser');
   
  const data = JSON.parse(Menues);
  
data.Menus.map(x =>{
  
    
 
    idMenues.push(x.IdMenu)
  
  
})


  
  
 // console.log(idMenues.length);
    //console.log(sing+inFactory.repeat((idMenues.length-1)));


 
  
    const claves  = sing+inFactory.repeat(idMenues.length);
    const sql = `SELECT  cast (Id as text) as key, MenuLabel, NombreMenu FROM Menu where Id in(${claves})`
    const params = idMenues;
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql,params).then(  ({ rows }) => {

     this.setState({rows});

     //console.log(rows)
    } )
  
  

}
catch(ex){

console.log(ex)

}



}


ItemSelect = (item) =>{

console.log(item);

this.props.navigation.navigate(item.NombreMenu)


}


state ={
NombreLabel:""
}





    renderItem = ({ item, index }) => {

  
        if (item.empty === true || item ===[]) {
  Alert.alert("Tou vacio");
          return <View style={[styles.item, styles.itemInvisible]} />;

        }
     
        return (
          <TouchableHighlight onPress={this.ItemSelect.bind(this,item)}>
          <View
            style={styles.item}
          >
   
            <Text style={styles.itemText}>{item.MenuLabel}</Text>
        
          </View>
          </TouchableHighlight>
            
        );
      };
    
      render() {


        const {rows = []} = this.state;

let kk =[];

      rows.map(t =>(kk.push(t) ))
 
        return (
 





  

  <FlatList data={this.state.rows} style={styles.container} renderItem={this.renderItem} />


        
   
        );
      }



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
      backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
    },
  });