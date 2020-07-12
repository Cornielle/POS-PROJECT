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
import Menu from "../../Models/Menu"
import AwesomeAlert  from  "react-native-awesome-alerts"
import RolMenu from '../../Models/RolMenu'


const InitialState ={  IdMenu:0,
    RolId:0,
    Comentario:"",
    showAlert:true
}


export default class RolesMenuScreen extends React.Component{


constructor(obj){


super(obj)

}

state={

    IdMenu:0,
    RolId:0,
    Comentario:"",
    Roles:[],
    Menu:[],
    showAlert:true



}

async componentDidMount(){


 
     await RolMenu.createTable();


    const sql = 'SELECT * FROM RolMenu'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql, params).then(   ({ rows }) => {

console.log(rows);
    } )

const options = {
columns:'Id,NombreRol',
where:{
Id_gt:0
},
page:1,
limit:100,
order:"Id ASC"
}

const optionsMenu = {
    columns:'Id,NombreMenu',
    where:{
    Id_gt:0
    },
    page:1,
    limit:100,
    order:"Id ASC"
    }
    


const Rol = await  Roles.query(options);
const menu = await Menu.query(optionsMenu);
//console.log(Rol);
//console.log(menu);

this.setState({Roles:Rol,Menu:menu, RolId:Rol[0].Id, IdMenu: menu[0].Id})

}
showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

LoadData = async() =>{



}


render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state
    const {showAlert} = this.state;
return(

<ScrollView>
            <View style={styles.ViewStyle}>
         
                {/*Header generico que debe ser reutilizado en casi todas las vistas */}
                <Header name={'Registro'} 
                        subtitle={'Crear perfil de Usuario'}
                        goBackEnabled={true}
                        goBackNavigationName={'Grid'}
                        navigationEnabled={true}
                        navigation={this.props.navigationValue}
                        toggleFormHeader={this.props.toggleForm}
                        gridHeader={false}
                    />                <View style={styles.Form}>
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
                               
                            <Text>Seleccionar el menu</Text>
                            <Picker
                                selectedValue={this.state.IdMenu}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({IdMenu: itemValue})
                                }>
                        {
                                 
                                 this.state.Menu.map(xo =>(
                                  <Picker.Item label={xo.NombreMenu.toString()} value={xo.Id.toString()} key={xo.Id.toString()} />
                                 
                                 )
                         
                                 )

                         }
                            </Picker>
                     
                            <Text>{"\n"}</Text>             
                            <Text>Seleccionar el rol</Text>
                            <Picker
                                selectedValue={this.state.RolId}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({RolId: itemValue})
                                }>
                        {
                                 
                                 this.state.Roles.map(xo =>(
                                  <Picker.Item label={xo.NombreRol.toString()} value={xo.Id.toString()} key={xo.Id.toString()} />
                                 
                                 )
                         
                                 )

                         }
                            </Picker>

                  
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
                                onPress={this.GuardarRolMenu}
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
                   
)
}



GuardarRolMenu = async () =>{


try{

    if(this.state.RolId ===0){


Alert.alert("Debe de seleccionar un rol o insertar uno");
return;
    }
    
    if(this.state.IdMenu ===0){
    
        Alert.alert("Debe de seleccionar un menu o insertar uno");
    return;
    }
    var fecha = new Date();
    const varinsert= {
        IdMenu:this.state.IdMenu,
        RolId:this.state.RolId,
        Comentario:this.state.Comentario,
        Activo:1,
        IdEmpresa: 1,
        IdSucursal:null,
        FechaCreacion: fecha.toString(),
        FechaModificacion:null,
        UsuarioCreacion:"system",
        UsuarioModificacion:null
    } 

    console.log(varinsert)

 const response = await RolMenu.create(varinsert);


  console.log(response);
  
if(Object.keys(varinsert).length>0){

ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
//this.setState(InitialState);
}
else{

Alert.alert("Ha ocurrido un error!!");

}


}
catch(ex){
console.log(ex);
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