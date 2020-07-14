import React from 'react';
import { StyleSheet, Text, View,AsyncStorage , FlatList,Alert, TouchableHighlight, Dimensions} from 'react-native';
import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

const  numColumns = 3
export default class Home extends  React.Component{
constructor(navigation){
super(navigation);
}


componentDidMount(){
  this.LoadingD();
}
LoadingD = async() =>{
try{


  const idMenues =[]
  const sing ="?"
  let inFactory =",?"
  
    const Menues =await AsyncStorage.getItem('LoggedUser');
   
  const data = JSON.parse(Menues);
  
data.Menus.map(x =>{
    idMenues.push(x.IdMenu)
})


    const claves  = sing+inFactory.repeat(idMenues.length);
    const sql = `SELECT  cast (Id as text) as key, MenuLabel, NombreMenu FROM Menu where Id in(${claves})`
    const params = idMenues;
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql,params).then(  ({ rows }) => {

     this.setState({rows});

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