import React, { Component } from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { TextInput, Button, Card, Checkbox  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker, AsyncStorage, Alert} from 'react-native';
import{BaseModel,types} from 'expo-sqlite-orm'
import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Empleados from "../../Models/Empleados"
import Roles from '../../Models/Roles';
import RolMenu from "../../Models/RolMenu"

//import whatever from '../src'
 export default class Login extends Component{
    constructor(props) {
        super(props);
      
     
        //this.login = this.login.bind(this);
      }


      state = { 
        NombreUsuario:"",
        Contrasena:"",
        successful:false,
        Menus:[],
          };
componentDidMount(){
   
    //this.LoadAllData();
    Empleados.createTable();
   // this.Deletekey();
 //   this.props.navigation.navigate("App")

}


LoadAllData = async () =>{
/*
    const sqlRol = 'SELECT * FROM Roles'
    const paramsRol = []
    const databaseLayerRol = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayerRol.executeSql(sqlRol,paramsRol).then(  ({ rows }) => {
    console.log(rows)
     
    } )

const sqlMenu = 'SELECT * FROM Menu'
const paramsMenu = []
const databaseLayerMenu = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayerMenu.executeSql(sqlMenu,paramsMenu).then(  ({ rows }) => {
console.log(rows)
 
} )


const sqlRm = 'SELECT * FROM RolMenu'
const paramsRm = []
const databaseLayerRm = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayerRm.executeSql(sqlRm,paramsRm).then(  ({ rows }) => {
console.log(rows)
 
} )

*/
} 

Deletekey = async() =>{

try{

    await AsyncStorage.removeItem('LoggedUser');

}
catch(ex){

    console.log(ex);


}


}


  
    render(){
        const {name, subtitle, navigation} = this.props
        const { text,enabled, checked } =  this.state
/*

        const sql = 'SELECT * FROM RolMenu'
        const params = []
        const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
       databaseLayer.executeSql(sql,params).then(  ({ rows }) => {
  console.log(rows)
         
        } )
*/
        return (
            <ScrollView>
            <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas*/}
                <Header name={name} subtitle={subtitle} goBackEnabled={false} navigationEnabled={false} navigation={navigation}/>
                <View style={styles.Form}>
                    <Card>
                        <Card.Cover source={{ uri: 'https://picsum.photos/900' }} />
                        <Card.Content>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Nombre De Usuario'
                                value={this.state.NombreUsuario}
                                onChangeText={NombreUsuario => this.setState({ NombreUsuario:NombreUsuario })}
                            />
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Contraseña'
                                value={this.state.Contrasena}
                                onChangeText={Contrasena => this.setState({Contrasena:Contrasena })}
                            />
                            <Text>{"\n"}</Text>
                            <Block row>
                                <Text style={{color:'#000000', fontSize:12}}>¿Olvidaste la Contraseña? </Text>
                                <TouchableOpacity>
                                    <Text style={styles.Forgot}> Haz clic aquí </Text>
                                </TouchableOpacity>
                            </Block>
                        </Card.Content>
                        <Text>{"\n"}</Text>
                    </Card>
                    <Text>{"\n"}</Text>
                    <Block style={styles.ButtonBlock}>
                        <Button 
                            mode="contained" 
                            style={styles.Button}
                            color="#42b842" 
                            width={normalize(125)}
                            onPress={this.GetLog}
                        >
                            <Text style={{color:'#ffffff'}}>Ingresar</Text>
                    </Button>
                    </Block>
                </View>
            </View>
            </ScrollView>
        );
        }

GetLog = async () =>{

try{
    
const response  = await Empleados.findBy({contrasena_eq:this.state.Contrasena, NombreUsuario_eq:this.state.NombreUsuario})

if(response ===null || Object.keys(response).length <=0){

alert("El usuario no existe o contraseña invalida");

    }
    else{
const {NombrePersona, NombreUsuario, Roll} = response
const item = await AsyncStorage.getItem('LoggedUser');

if(item ===null){

const rol  = await Roles.findBy({Id_eq:Roll})

const RmenuQuery ={
    columns: 'IdMenu',
    where: {
        RolId_eq: Roll

    },
    page: 1,
    limit: 100

}

const Rmenu = await RolMenu.query(RmenuQuery);




console.log(Rmenu)
 //console.log(rol.NombreRol);
 /*
 const sqlRol = 'SELECT ROLM.IdMenu, ME.NombreMenu FROM Rolmenu AS ROLM INNER JOIN MENU AS ME ON ROLM.IdMenu = ME.Id  where RolId =?'
 const paramsRol = [Roll]
 const databaseLayerRol = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
 databaseLayerRol.executeSql(sqlRol,paramsRol).then(({ rows }) => {
// console.log(rows)




 this.setState({Menus:rows})


 } )
*/


 const UserJasonStringy =JSON.stringify({Nombre:NombrePersona, Usuario:NombreUsuario,Roll:Roll, Menus:Rmenu});
console.log(UserJasonStringy);  

const addAsync = await AsyncStorage.setItem('LoggedUser', UserJasonStringy)
this.props.navigation.navigate("Home")
         }
         else {

            this.props.navigation.navigate('Home');
             Alert.alert("El usuario esta logueado!!")
        //await AsyncStorage.removeItem("LoggedUser");
         }

    }


}
catch(ex){

console.log(ex);

}
    
}

    }


        const styles = StyleSheet.create({
            ViewStyle:{
                backgroundColor:"#f9f9f9",
                height:normalize(700)
            },
            Button:{
                height:normalize(42),
            },
            Form: {
                padding:normalize(15),
                marginTop:normalize(50)

            },
            Input: {
                color: '#161924',
                fontSize: 14,
                fontWeight:"200",
                backgroundColor:'#FFFFFF',
            },
            Forgot:{
                color:'blue',
                fontSize:12
            },
            ButtonBlock:{
                alignItems:'center',
            }
    })

/*
    
    class  AuthRedirect  extends React.Component{

 
        constructor(){
            redirect();
super();


redirect = () =>{

this.props.navigation.navigate("App")


}

        }



    }

*/
 
