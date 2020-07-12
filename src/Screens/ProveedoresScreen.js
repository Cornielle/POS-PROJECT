import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton, Checkbox } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView,  ToastAndroid, Platform} from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import * as Filesystem from "expo-file-system"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Icon from 'react-native-vector-icons/FontAwesome';
import Roles from "../../Models/Roles"
import Proveedores from "../../Models/Proveedores"

import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

const InitialState ={
    EsPersonaFisica:false,
    NombreProveedor:"",
    RNC:"",
    Direccion:"",
    Telefono:"",
    correo:""



}

export default class ProveedoresScreen extends React.Component{


    constructor(){


super();

    }

    state ={
        EsPersonaFisica:false,
        NombreProveedor:"",
        RNC:"",
        Direccion:"",
        Telefono:"",
        correo:""

    }
    GuardarProveedores = (Model)=> {
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
              SQLite.openDatabase(
                database_name,
                database_version,       
                database_displayname,
                database_size
              )
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN");
                  db.executeSql('INSERT INTO Proveedores(EsPersonaFisica, NombreProveedor'+
                  ', RNC, Direccion , Telefono , Correo'
                  +', Activo , IdEmpresa , IdSucursal , FechaCreacion ,FechaModificacion '+
                  ', UsuarioCreacion ,UsuarioModificacion ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
                  ,[Model.EsPersonaFisica,Model.NombreProveedor,Model.RNC,Model.Direccion,
                    Model.Telefono,Model.Correo,Model.Activo,Model.IdEmpresa,Model.IdSucursal,
                    Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                      console.log("Database is ready ... executing query ...");
                      ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
    
    db.executeSql("SELECT * from Proveedores").then((resulst) =>{
    
    console.log(resulst);
    

    /*
      console.log("Query completed");
      var len = resulst[0].rows.length;
      console.log(len)
      for (let i = 0; i < len; i++) {
        let row = resulst[0].rows.item(i);
        console.log(row)
      }
    
    */
    })
    

    
    }).catch((error) =>{
    console.log("Received error: ", error);
    console.log("Database not yet ready ... populating data");
   
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
      };

    LoadData = async () =>{
//  Proveedores.dropTable()


 //const sql = 'PRAGMA table_info(Proveedores);'


    }
    componentDidMount(){

        this.LoadData();
    }

    render(){
 

        const {name, subtitle, navigation} = this.props
        const { text,enabled, EsPersonaFisica } =  this.state
        return (
            <ScrollView>
            <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas */}
                <Header name={'Proveedores'} 
                        subtitle={'Crear perfíl de Proveedores'}
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
                                label='Nombre Proveedor'
                                value={this.state.NombreProveedor}
                                onChangeText={(NombreProveedor)=> this.setState({NombreProveedor})}
                            />
                            <Text>{"\n"}</Text>

                            <View style={{flexDirection:"row"}}>

                        
                          <Checkbox status={EsPersonaFisica ? 'checked' : 'unchecked'} onPress={() => { this.setState({ EsPersonaFisica: !EsPersonaFisica }); }}/>
                            <Text>Es Persona Fisica</Text>
                            </View>

      

                            <Text>{"\n"}</Text>            
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='RNC'
                                value={this.state.RNC}
                                onChangeText={(RNC) => this.setState({ RNC })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Direccion'
                                value={this.state.Direccion}
                                onChangeText={(Direccion) => this.setState({ Direccion })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Telefono'
                                value={this.state.Telefono}
                                onChangeText={(Telefono) => this.setState({ Telefono })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Correo'
                                value={this.state.correo}
                                onChangeText={(correo) => this.setState({ correo })}
                            />
                            <Text>{"\n"}</Text>
                            <Button
                                labelStyle={styles.Button} 
                                mode="contained" 
                                onPress={this.GuardarProvee}
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
    
        Validaciones  = () =>{
    
    
    
            if(this.state.NombreRol === "" ){
            
            Alert.alert("El campo Nombre Roll no puede estar vacio");
            return; 
            
            }
            
            }
            
    
    
            GuardarProvee =  async () =>{
       
               // this.Validaciones();
                        try {

             
                            const Fecha = new Date();
    
                           
                        
                                const Model ={
                                    EsPersonaFisica: this.state.EsPersonaFisica.toString(),
                                    NombreProveedor:this.state.NombreProveedor,
                                    RNC:this.state.RNC,
                                    Direccion:this.state.Direccion,
                                    Telefono:this.state.Telefono, 
                                    Correo: this.state.correo,
                                    Activo:1,
                                    IdEmpresa:1,
                                    IdSucursal:1,
                                    FechaCreacion: Fecha.toString(),
                                    FechaModificacion:null,
                                    UsuarioCreacion:"system",
                                    UsuarioModificacion:null
                                    
                                }
                            
                                console.log(Model);
                               
                            this.GuardarProveedores(Model);
                   
                        
                        
                       this.setState(InitialState)
                         

                        }   
                        
                        catch(ex){


console.log(ex)

                        }

   
            
            
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