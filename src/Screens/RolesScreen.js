import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView, ToastAndroid} from 'react-native';
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


const InitialState ={

    NombreRol:"",
    Comentario :""

}

export default class RolesScreen extends React.Component {


constructor(props){
super(props)



}

componentDidMount(){
    // Roles.dropTable();
    Roles.createTable();
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(
      'SELECT * FROM Roles where NombreRol="administrador" COLLATE NOCASE'
      ).then(respon =>{console.log(respon)})
    
}
state={
NombreRol:"",
Comentario :"",
ExistNombre:false
}
render(){

    const {name, subtitle, navigation} = this.props
    return (
        <ScrollView>
        <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas */}
                <Header name={'Acciones'} 
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
                            label='Comentario'
                            value={this.state.Comentario}
                            onChangeText={(Comentario) => this.setState({ Comentario })}
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

    
verifyExisting= async () =>{
    console.log("fui invocado")
    let callbaclproof =""
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(
      'SELECT * FROM Roles where NombreRol="administrador" COLLATE NOCASE'
      ).then(respon =>{


  
if(Object.keys(respon).length > 0){

    this.setState({ExistNombre:true})

  
}
})

console.log(this.state.ExistNombre);
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
            Comentario: this.state.Comentario, 
            Activo:1,
            IdEmpresa:1,
            IdSucursal:0,
            FechaCreacion: fecha.toString(),
            FechaModificacion:null,
            UsuarioCreacion:"system",
            UsuarioModificacion:null
        }
    /*
        console.log(ValInsert);
       var response = await Roles.create(ValInsert);

       console.log(response)
       if (Object.keys(response).length <=0){

        Alert.alert("Error al insertar en la base de datos");
        
        }
        else{
ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)


this.setState(InitialState)
        }
        */
        
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
