import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,Alert} from 'react-native'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'
import Categorias from '../../Models/Categorias'
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

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


export default class Categoria extends React.Component{

constructor(obj){
super(obj)

}


 async componentDidMount(){
const Created = await Categorias.createTable();



const sql = 'SELECT * FROM Categorias where NombreCategoria = ?'
    const params = ['Adicionales']


const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayer.executeSql(sql,params).then(respon =>{console.log(respon)})





 }

state={
NombreCategoria:"",
Descripcion:""
}

    render(){
        const {name, subtitle, navigation} = this.props
        const { text,enabled, checked } =  this.state
    return(
    
    <ScrollView>
        {/*Header generico que debe ser reutilizado en casi todas las vistas */}
        <Header name={'Categorias'} 
                subtitle={'Crear perfíl de Categorías'}
                goBackEnabled={true}
                goBackNavigationName={'Grid'}
                navigationEnabled={true}
                navigation={this.props.navigationValue}
                toggleFormHeader={this.props.toggleForm}
                gridHeader={false}
            />
    <View style={styles.ViewStyle}>
    
    
    <View style={styles.Form}>
    <Card>
    
    
    <Card.Title 
        style={styles.Card}
        title="Categoria" 
        subtitle="Todas l" 
        left={(props) => <Avatar.Icon {...props} 
        icon="account" />} 
    />
    {}
    <Card.Content>
    <TextInput 
    style={styles.Input}
    model='flat'
    label='Nombre Categoria'
    value={this.state.NombreCategoria}
    onChangeText ={(NombreCategoria) =>{this.setState({NombreCategoria:NombreCategoria})}}
    
     />
 
  
     <TextInput 
    style={styles.Input}
    model='flat'
    label='Descripcion'
    value={this.state.Descripcion}
    onChangeText ={(Descripcion) => {this.setState({Descripcion:Descripcion})}}
    
     />
   <Button
    labelStyle={styles.Button} 
    icon="account" 
    mode="contained" 
    onPress={this.GuardarCategoria}
    >
        Guardar
    </Button>
    </Card.Content>
    </Card>
    </View>
    </View>
    </ScrollView>
    )
    }
    Validaciones = () =>{

        try {

            if(this.state.NombreCategoria ==""){

              Alert.alert("El nombre de la categoria no puede estar vacio");
              return;
            }
        }
        catch(e){
        }


    }

    GuardarCategoria = async () =>{
  
        const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
        databaseLayer.executeSql(
          "SELECT * FROM Categorias where NombreCategoria = 'Adicionales'"
          ).then(respon =>{
              
           // console.log(Object.keys(respon.rows).length)
            
            if(Object.keys(respon).length <=0){

                Alert.alert(`Ya existe  ${this.state.NombreCategoria} en la base de datos`);
               return;

            }
          
        })
        
        try{
            const ValInsert ={
                NombreCategoria: this.state.NombreCategoria,
                Descripcion: this.state.Descripcion,
                Activo:1,
                FechaCreacion: "2020-02-02",
                FechaModificacion:null,
                UsuarioCreacion:"system",
                UsuarioModificacion:"null",
                IdEmpresa:null,
                IdSucursal:null,
            }
            const response = await Categorias.create(ValInsert);
            console.log("Respuesta: ",response)
            if (Object.keys(response).length <=0){
                Alert.alert("Error al insertar en la base de datos");
            }
            else{
                ToastAndroid.show("Guardado Correctamente!", ToastAndroid.SHORT);
            }
        }

        catch(ex){
            console.log(ex, 'what')
        }
    }
}