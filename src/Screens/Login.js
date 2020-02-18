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


//import whatever from '../src'
 export default class Login extends Component{
    constructor(props) {
        super(props);
      
        //this.login = this.login.bind(this);
      }
      state = { 
        NombreUsuario:"",
        Contrasena:"",
        successful:false
          };
componentDidMount(){

    this.props.navigation.navigate("Auth")

}


    login(){
        console.log('exists')
    }
    render(){
        const {name, subtitle, navigation} = this.props
        const { text,enabled, checked } =  this.state


        const sql = 'SELECT * FROM Empleados'
        const params = []
        const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
       databaseLayer.executeSql(sql,params).then(  ({ rows }) => {
  console.log(rows)
         
        } )

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
    Empleados.createTable();
    console.log("Entree");
    const response  = await Empleados.findBy({contrasena_eq:this.state.Contrasena, NombreUsuario_eq:this.state.NombreUsuario})
console.log(response);

const {NombrePersona, NombreUsuario, IdRoll} = response
 console.log(`Resultados ${NombrePersona, NombreUsuario, IdRoll}`);
    if(response ===null || Object.keys(response).length <=0){

alert("El usuario no existe o contraseña invalida");

    }
    else{
/*
 console.log("here i am");
        const keys = await AsyncStorage.getAllKeys();
 console.log(keys);

const result = await AsyncStorage.multiGet(keys);
console.log(result);

*/


        console.log("paso 1");
        const item = await AsyncStorage.getItem('LoggedUser');

        console.log(item);

         if(item ===null){

            console.log("Paso 2");
const addAsync = await AsyncStorage.setItem('LoggedUser', JSON.stringify({Nombre:NombrePersona, Usuario:NombreUsuario,Roll:IdRoll}))
             
    console.log(addAsync);  


         }
         else {

            this.props.navigation.navigate('App');
             Alert.alert("El usuario esta logueado!!")

         }



    }


}
catch(ex){



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
 
