import React, { Component } from 'react';

import { TextInput, Avatar, Button, Card, RadioButton, Checkbox } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView,  ToastAndroid, Platform} from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import * as Filesystem from "expo-file-system"
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Icon from 'react-native-vector-icons/FontAwesome';

import Roles from "../../Models/Roles"

import Proveedores from "../../Models/Proveedores"

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


    LoadData = async () =>{

 Proveedores.createTable();

 //const sql = 'PRAGMA table_info(Proveedores);'
 const sql = 'SELECT * FROM Proveedores'
 const params = []
 const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayer.executeSql(sql, params).then(   ({ rows }) => {

console.log(rows);
 } )


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
                {/*Header generico que debe ser reutilizado en casi todas las vistas*/}
                <Header name={name} subtitle={subtitle} goBackEnabled={true} navigationEnabled={false} navigation={navigation}/>
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
    
                           
                        
                                const ValInsert ={
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
                            
                                console.log(ValInsert);
                               
                                const response = await Proveedores.create(ValInsert);
                        
                               console.log(response)
                               if (Object.keys(response).length ===0){
                        
                                Alert.alert("Error al insertar en la base de datos");
                                
                                }
                                else{
                        ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
                        
                        
                       // this.setState(InitialState)
                                }

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