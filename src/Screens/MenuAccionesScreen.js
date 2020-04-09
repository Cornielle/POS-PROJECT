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
import  MenuAcciones from '../../Models/MenuAcciones'

const InitialState ={ 
    IdMenu:0,
    IdAccion:0,
    Comentario:"",
}

export default class MenuAccionesScreen extends React.Component{

constructor(obj){

super(obj);

}

async componentDidMount(){ 
    MenuAcciones.createTable();

    const sql =   'SELECT * FROM Acciones'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql, params).then(({ rows }) => {
    this.setState({Acciones:rows})
 // console.log(rows);
    } )

    const sqlMenu =   'SELECT * FROM Menu'
    const paramsMenu = []
    const databaseLayerMenu = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayerMenu.executeSql(sqlMenu, paramsMenu).then(({ rows }) => {
    this.setState({Menu:rows})
 // console.log(rows);
    } )


    const sqlTodo =   'SELECT * FROM MenuAcciones'
    const paramsTodo = []
    const databaseLayerTodo = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayerTodo.executeSql(sqlTodo, paramsTodo).then(({ rows }) => {
 
  console.log(rows);
    } )
  

}
 
state = {

    IdMenu:0,
    IdAccion:0,
    Comentario:"",
    Acciones:[],
    Menu:[]



 }
render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state
return(

    <ScrollView>
    <View style={styles.ViewStyle}>
        {/*Header generico que debe ser reutilizado en casi todas las vistas */}
        <Header name={'Menu Acciones'} 
                subtitle={'Crear perfíl de Menu Acciones'}
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
                <Text>Seleccionar el padre del menu</Text>
                    <Picker
                        selectedValue={this.state.IdMenuPadre}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({IdAccion: itemValue})
                        }>
                {
                        
                         this.state.Acciones.map(xo =>(
                          <Picker.Item label={xo.NombreAccion} value={xo.id.toString()} key={xo.Id.toString()} />
                         
                         )
                 
                         )

                 }
                    </Picker>

                    <Text>{"\n"}</Text>             
                    <Text>Seleccionar el padre del menu</Text>
                    <Picker
                        selectedValue={this.state.IdMenuPadre}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({IdMenu: itemValue})
                        }>
                {
                         
                         this.state.Menu.map(xo =>(
                          <Picker.Item label={xo.NombreMenu.toString()} value={xo.id.toString()} key={xo.id.toString()} />
                         
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
                        onPress={this.GuardarMenuAcciones}
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


GuardarMenuAcciones = async () => {

try{

if(this.state.IdAccion === 0){
    Alert.alert("Debe Seleccionar una accion");
    return;
}

if(this.state.IdMenu === 0){
    Alert.alert("Debes de seleccionar un menu");
return;
}
var fecha = new Date();

var insert ={

                    IdMenu: this.state.IdMenu,
                    IdAccion : this.state.IdAccion,
                    Comentario: this.state.Comentario,
                    Activo:1,
                    FechaCreacion: fecha.toString(),
                    IdEmpresa: 1,
                    IdSucursal:null,
                    FechaModificacion:null,
                    UsuarioCreacion:"system",
                    UsuarioModificacion:null
    
}

console.log(insert);

const response  = await MenuAcciones.create(insert);


if (Object.keys(response).length <=0){

    Alert.alert("Error al insertar en la base de datos");
    
    }
    else{
ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)


this.setState(InitialState)
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
