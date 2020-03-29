import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView, ToastAndroid } from 'react-native';
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
import Acciones from '../../Models/Acciones'

 const  InitialState ={

    NombreAcciones:"",
    Comentario:""

 }
export default class AccionesScreen extends React.Component{


constructor(props){

super(props)

}
state ={
    NombreAcciones:"",
    Comentario:""

}

async componentDidMount(){

    const sql =   'SELECT * FROM Acciones'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql, params).then(({ rows }) => {
    //this.setState({Menu:rows})
  
console.log(rows);

    } )

 Acciones.createTable();

    
}
render(){
 

    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state
    return (
        <ScrollView>
        <View style={styles.ViewStyle}>
        {/*Header generico que debe ser reutilizado en casi todas las vistas */}
        <Header name={'Acciones'} 
                subtitle={'Crear perfíl de Acciones'}
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
                            label='Nombre Acciones'
                            value={this.state.NombreAcciones}
                            onChangeText={(NombreAcciones)=> this.setState({NombreAcciones})}
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
                            onPress={this.GuardarAcciones}
                        >
                            <Icon 
                                name="save" 
                                size={15} 
                                color="#ffffff" 
                                style={styles.Icon}
                            />  
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



GuardarAcciones  = async () =>{



    try{

        /********************** Validaciones **********************/

        if(this.state.NombreAcciones ===""){
            Alert.alert("Debe ingresar el nombre de la accion");
            return;
           }

         
        
        
      var fecha = new Date()

        const Insert = {

            NombreAccion:this.state.NombreAcciones,
            Comentario:this.state.Comentario,
            Activo:1,
            FechaCreacion: fecha.toString(),
            IdEmpresa: 1,
            IdSucursal:null,
            FechaModificacion:null,
            UsuarioCreacion:"system",
            UsuarioModificacion:null
        }
    

        console.log(Insert);

        const response =  await Acciones.create(Insert);

        if(Object.keys(response).length <= 0){

         Alert.alert("Hubo un error en la base de datos");


        }
        else{

ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT);
this.setState(InitialState);
        }

    }
    
    catch(ex){
        Alert.alert(ex)
    Alert.alert("Hubo un error en la aplicacion, favor contartar al soporte");

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
