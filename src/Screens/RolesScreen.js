import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Icon from 'react-native-vector-icons/FontAwesome';
import Empleados from '../../Models/Empleados.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Roles from "../../Models/Roles"
import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
//var db = openDatabase({ name: 'PuntoVenta.db' });

const InitialState ={

    NombreRol:"",
    Descripcion :""

}

export default class RolesScreen extends React.Component {


constructor(props){
super(props)



}

componentDidMount(){
    // Roles.dropTable();
    /*
    Roles.createTable();
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(
      'SELECT * FROM Roles where NombreRol="administrador" COLLATE NOCASE'
      ).then(respon =>{console.log(respon)})
    */

   console.log("")
   console.log("")
   console.log("/****************************************************************************/");
   console.log("")
   console.log("")
   var fecha = new Date();
   let db;
   return new Promise((resolve) => {

     SQLite.echoTest()
       .then(() => {

         console.log("Opening database ...");
         SQLite.openDatabase(
           database_name,
           database_version,
           database_displayname,
           database_size
         )
           .then(DB => {
             db = DB;
    
             db.executeSql("SELECT * FROM Roles",[]).then((result) => {
                 console.log("Database is ready ... executing query ...");

console.log(result);


             }).catch((error) =>{
                 console.log("Received error: ", error);

             });
      
           })
           .catch(error => {
             console.log(error);
           });
       })
       .catch(error => {
         console.log("echoTest failed - plugin not functional");
       });
     });




}
state={
NombreRol:"",
Descripcion :"",
ExistNombre:false
}
render(){

    const {name, subtitle, navigation} = this.props
    return (
        <ScrollView>
        <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas */}
                <Header name={'Roles De Usuario'} 
                        subtitle={'Crear perfil de Acciones'}
                        goBackEnabled={true}
                        goBackNavigationName={'Grid'}
                        navigationEnabled={true}
                        navigation={this.props.navigationValue}
                        toggleFormHeader={this.props.toggleForm}
                        gridHeader={false}
                    />
                <View style={styles.Form}>
                <Card>
                    <Card.Title 
                        style={styles.Card}
                        title="POS PROJECT" 
                        subtitle="Todas las tiendas en un solo lugar" 
                        left={(props) => <Avatar.Icon {...props} 
                        icon="account" />} 
                    />
                    <Card.Content>
                    <KeyboardAvoidingView>
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Nombre Del Rol'
                            value={this.state.NombreRol}
                            onChangeText={(NombreRol)=> this.setState({NombreRol})}
                        />
                        <Text>{"\n"}</Text>                
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Descripcion'
                            value={this.state.Descripcion}
                            onChangeText={(Descripcion) => this.setState({ Descripcion })}
                        />
                        <Text>{"\n"}</Text>
                     
                        <Button
                            labelStyle={styles.Button} 
                            mode="contained" 
                            onPress={this.GuardarRol}
                        >
                            <Icon 
                                name="save" 
                                size={15} 
                                color="#ffffff" 
                                style={styles.Icon}
                            /> <Text>{"  "}</Text>   
                            Agregar
                        </Button>
                        </KeyboardAvoidingView>
                    </Card.Content>
                </Card>
            </View>
        </View>
        </ScrollView>
    );
    }
    initDB(ValInsert) {



        console.log("")
        console.log("")
        console.log("/****************************************************************************/");
        console.log("")
        console.log("")
        var fecha = new Date();
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase( database_name, database_version, database_displayname, database_size)
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN");
                  db.executeSql("INSERT INTO Roles(NombreRol,Descripcion,Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?)"
                  ,[ValInsert.NombreRol,ValInsert.Descripcion,1,ValInsert.IdEmpresa,ValInsert.IdSucursal,ValInsert.FechaCreacion,null,ValInsert.UsuarioCreacion,null]).then(() => {
                      console.log("Database is ready ... executing query ...");
                      ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
                      this.props.toggleForm(false)

                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data");
            });
                  //resolve(db);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });
      };
     
    
verifyExisting= async () =>{
 /*
    let callbaclproof =""
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(
      'SELECT * FROM Roles where NombreRol="Administrador" COLLATE NOCASE'
      ).then(respon =>{


  
if(Object.keys(respon).length > 0){

    console.log("si encontre duplicado");
    this.setState({ExistNombre:true})

  
}
})

console.log(this.state.ExistNombre);
*/
}

    Validaciones  =  () =>{

    
        this.verifyExisting();

        if(this.state.NombreRol === "" ){
        
        Alert.alert("El campo Nombre Roll no puede estar vacio");
        return; 
        
        }
        
        }
        


        GuardarRol =  async () =>{
   
            this.Validaciones();
                                                                                                                                                                                                                                                                                          
            

    console.log("Entreeee");
        const fecha = new Date();
        const ValInsert ={
            NombreRol: this.state.NombreRol,
            Descripcion: this.state.Descripcion, 
            Activo:1,
            IdEmpresa:1,
            IdSucursal:1,
            FechaCreacion: fecha.toString(),
            FechaModificacion:null,
            UsuarioCreacion:"system",
            UsuarioModificacion:null
        }
    
        console.log(ValInsert);
        
       this.initDB(ValInsert);


this.setState(InitialState)
        
        
        
        
        }
}

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
