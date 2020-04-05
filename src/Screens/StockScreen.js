import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,Alert,Modal ,TouchableHighlight, FlatList, Dimensions} from 'react-native'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'

import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'   
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import ListaCategoria from '../../BindObject/PickerBind'
import Articulos from '../../Models/Articulos'
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  },
ModalContainer:{

flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"blue",
paddingTop:40



}
})

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];

export default class StockScreen extends React.Component {


constructor(){

super()

}

state={
  rows:[], 
  Visible:false,
  Articulos:[],
  Proveedores:[],
   ProveedorSelected:"",
   ArticuloId:0,
   CantidadExistencia:0,
   ProveedorId:0

 }


componentDidMount(){

this.LoadData();

}

selectedItem = (item) =>{

  console.log(item);

this.setState({ProveedorSelected:item.NombreProveedor})
  this.ShowModal();

}


 LoadData = async () =>{

  try{
    const sql = `SELECT Id,NombreArticulo FROM ARTICULOS WHERE Activo=? ORDER BY Id ASC `
    const params = [1];
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql,params).then(  ({ rows }) => {
  
     this.setState({rows});
  
     console.log(rows)
    } )  

    const sqlProvee = `SELECT Id,NombreProveedor FROM Proveedores WHERE Activo =? ORDER BY Id ASC`
    const paramsProvee = [1];
    const databaseLayerProvee = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayerProvee.executeSql(sqlProvee,paramsProvee).then(  ({ rows }) => {
  
     this.setState({Proveedores:rows});
  
     console.log(rows)
    } )  



  

  }

  catch(ex){
 console.log(ex);

 Alert.alert(ex)


  }
 
 

 }

ShowModal = () =>{
console.log("entree");
this.setState({Visible: !this.state.Visible})


}
 renderItem = ({item, index}) =>{

try{
  console.log(item)
  if (item.empty === true || item ===[]) {
    Alert.alert("Tou vacio");
            return <View style={[styles.item, styles.itemInvisible]} />;
  
          }

          return(

            <TouchableHighlight onPress={() => this.selectedItem(item)} >
              <View>

        <Text>{item.NombreProveedor}</Text>
            </View>
            </TouchableHighlight>
          )
      
}

catch(ex){

  console.log(ex);
  Alert.alert(ex);

}

 }

  render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state

return(

<ScrollView>


  

<Modal visible={this.state.Visible}>
  
  <View style ={styles.ModalContainer}>
 <FlatList data={this.state.Proveedores} title ="Articulos" renderItem={this.renderItem}  ></FlatList>

  </View>
  
  </Modal>

<View style={styles.ViewStyle}> 
{/*Header generico que debe ser reutilizado en casi todas las vistas */}
<Header name={'Stock'} 
    subtitle={'Crear perfil de Stock'}
    goBackEnabled={true}
    goBackNavigationName={'Grid'}
    navigationEnabled={false}
    navigation={this.props.navigationValue}
    toggleFormHeader={this.props.toggleForm}
    gridHeader={false}
/>
<View style={styles.ViewStyle}>
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


<View style={{flexDirection:"row", flexWrap:'wrap'}}>

<TextInput
                                style={styles.Input,{width:230}}
                                mode='flat'
                                label='Proveedores'
                                value={this.state.ProveedorSelected}
                                onChangeText={(ProveedorSelected)=> this.setState({ProveedorSelected})}
                            />
                            <Button
                                labelStyle={styles.Button} 
                                mode="contained" 
                                onPress={this.ShowModal}
                            >
                                <Icon 
                                    name="Selet" 
                                    size={5} 
                                    color="#ffffff" 
                                    style={styles.Icon}
                                /> <Text>{"  "}</Text>   
                                Agregar
                            </Button>

</View>
<Text>{"\n"}</Text> 

<Button
                                labelStyle={styles.Button} 
                                mode="contained" 
                                onPress={this.ShowModal}
                            >
                                <Icon 
                                    name="save" 
                                    size={5} 
                                    color="#ffffff" 
                                    style={styles.Icon}
                                /> <Text>{"  "}</Text>   
                                Agregar
                            </Button>

  
</Card.Content>



</Card>

</View>


</View>
  </ScrollView>

)


  }



  SaveStrock = () =>{

const Varinsert ={



  Activo:{type: types.INTEGER, not_null:true},
  IdEmpresa:{type:types.INTEGER, not_null:true},
  IdSucursal:{type:types.INTEGER, not_null:false},
  FechaCreacion: {type: types.TEXT, not_null:true},
  FechaModificacion:{type:types.TEXT, not_null:false},
  UsuarioCreacion:{type:types.TEXT, not_null:true},
  UsuarioModificacion:{type:types.TEXT, not_null:false}



}



  }

}


