import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView,  ToastAndroid, Platform} from 'react-native';
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
import vistas from '../../Models/Vistas';

export default class VistaScreen extends React.Component{


    constructor(props){
         super(props)
    }


async componentDidMount(){


    const response = await vistas.findBy({Id_gt:0})
    console.log(response);


await vistas.createTable();
}

    state={
        NombreVista:"",
        IdVistaPadre:"",
        Comentario:""
        


    }
    render(){
 

        const {name, subtitle, navigation} = this.props
        const { text,enabled, checked } =  this.state
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
                                label='Nombre del Menu'
                                value={this.state.NombreVista}
                                onChangeText={(NombreVista)=> this.setState({NombreVista})}
                            />
                            <Text>{"\n"}</Text>                
                            <Text>Seleccionar el padre del menu</Text>
                            <Picker
                                selectedValue={this.state.IdVista}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({IdVista: itemValue})
                                }>
                                <Picker.Item label="Rol 1" value="1" />
                                <Picker.Item label="Rol 2" value="2" />
                            </Picker>

                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Comentarios'
                                value={this.state.Comentario}
                                onChangeText={(Comentario)=> this.setState({Comentario})}
                            />
                            <Text>{"\n"}</Text>      
                            <Button
                                labelStyle={styles.Button} 
                                mode="contained" 
                                onPress={this.GuardarVistas}
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
    


        Validaciones = () =>{

try{

    if(this.state.NombreVista ===""){
        Alert.alert("Debe ingresar el nombre de la vista");
        return;
       }
}

catch(ex){

Alert.alert("Hubo un error en la aplicacion, favor contartar al soporte");

}




        }


        GuardarVistas = async () =>{

            try{

                console.log("Entree mi loco!!");
                const Insert = {
        
                    NombreVista:this.state.NombreVista,
                    IdVistaPadre:this.state.IdVistaPadre,
                    Comentario:this.state.Comentario,
                    Activo:1,
                    FechaCreacion: "20/12/1995",
                    FechaModificacion:null,
                    UsuarioCreacion:"system",
                    UsuarioModificacion:null
                }
        
                console.log(Insert);
        
                const response =  await vistas.create(Insert);
        
                if(Object.keys(response).length <= 0){
        
                 Alert.alert("Hubo un error en la base de datos");
        
        
                }
                else{
        
                  if(Platform.OS ==='android'){
        
        ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT);
                  }
                  if(Platform.OS ==="ios"){
        
        Alert.alert("Guardado Correctamente!!");
                  }
        
        
                }

            }
            
            catch(ex){
            
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
