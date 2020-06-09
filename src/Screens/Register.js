import React from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert,  ToastAndroid } from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
//import * as SQLite from "expo-sqlite"

import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Icon from 'react-native-vector-icons/FontAwesome';
import Empleados from '../../Models/Empleados.js'
import Roles from  '../../Models/Roles'
import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

const InitialState ={
    
    NOMBRE :"", 
    APELLIDO:"",
    NOMBREUSUARIO:"",
    TELEFONO:"",
    CONTRASENA:"",
    CONTRASENA2:"",
    TIPOIDENTIFICACION:"Cedula",
    IDENTIFICACION:"",
    CORREO:"",
    PIN:0,
    PIN2:0,
    ROL:"Camarero",
    Roles:[],
    ExistenDatos:false,
    QueDatosExisten:""

}

//import whatever from '../src'
export default class Register extends React.Component{
    constructor(props) {
         super(props);
 this.state = InitialState;
 
      }


      reset = () =>{

 this.setState(InitialState)



      }
    

    state = { 
        NOMBRE :"", 
        APELLIDO:"",
        NOMBREUSUARIO:"",
        TELEFONO:"",

        TIPOIDENTIFICACION:"Cedula",
        IDENTIFICACION:"",
 
        ROL:"",
        PIN:0,
        PIN2:0,
        Roles:[],
        ExistenDatos:false,
        QueDatosExisten:""
        };


 LoadData = async () =>{

let RolesCollection=[];
  //  const sqlStock = 'SELECT name FROM sqlite_master WHERE type = "table"'



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
              db.executeSql("SELECT * FROM Roles"
              ,[]).then((Results) => {
                  console.log("Database is ready ... executing query ...");



  console.log("Query completed");
  var len = Results[0].rows.length;
 // console.log(len)
  for (let i = 0; i < len; i++) {
    let row = Results[0].rows.item(i);
    RolesCollection.push(row);

  }
  console.log(RolesCollection)
this.setState({Roles:RolesCollection})

RolesCollection=[]

              }).catch((error) =>{
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                
              });
              resolve(db);
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


  componentDidMount(){

    this.LoadData();
   /*
    const sql = 'SELECT * FROM RolMenu'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(sql, params).then(   ({ rows }) => {
    console.log(rows);
    })
    */



}


SaveEmp(Model) {
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
              db.executeSql("INSERT INTO Empleados VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              ,[Model.NombrePersona,Model.ApellidoPersona,Model.NombreUsuario,Model.Telefono,
                Model.TipoIdentificacion,Model.Identificacion,Model.Rol,Model.Pin,Model.Activo,Model.IdEmpresa,Model.IdSucursal,
                Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                  console.log("Database is ready ... executing query ...");
                  ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)

db.executeSql("Drop Empleados").then((resulst) =>{

Console.log(resulst);

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
db.transaction((tx) => {
 tx.executeSql('CREATE TABLE IF NOT EXISTS Empleados(NombrePersona VARCHAR(500) NOT NULL, ApellidoPersona VARCHAR(500) NOT NULL'+
 ', NombreUsuario VARCHAR(500), Telefono VARCHAR(100), TipoIdentificacion VARCHAR(30), Identificacion VARCHAR(50),'+
 'Rol VARCHAR(500), Pin VARCHAR(30) NOT NULL '
 +', Activo INTEGER NOT NULL , IdEmpresa INTEGER NOT NULL, IdSucursal INTEGER, FechaCreacion VARCHAR(150) NOT NULL, ,FechaModificacion VARCHAR(150)'+
 ', UsuarioCreacion VARCHAR(100) NOT NULL ,UsuarioModificacion VARCHAR(100))'
 );
}).then(() => {
console.log("Table created successfully");
}).catch(error => {
console.log(error);
 });
});
              resolve(db);
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



    render(){
        return (
      
         
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
         
          
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Nombre'
                                value={this.state.NOMBRE}
                                onChangeText={(NOMBRE)=> this.setState({NOMBRE})}
                            />
                            <Text>{"\n"}</Text>                
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Apellidos'
                                value={this.state.APELLIDO}
                                onChangeText={(APELLIDO) => this.setState({ APELLIDO })}
                            />
                        
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Telèfono'
                                keyboardType="numeric"
                                value={this.state.TELEFONO}
                                onChangeText={(TELEFONO) => this.setState({ TELEFONO })}
                            />
                            <Text>{"\n"}</Text>
                            <Block row style={{paddingLeft:normalize(10)}}>
                            <Text style={{fontWeight:'bold'}}>Tipo de Identificaciòn:      </Text>
                            <View>
                                <Text>Cedula</Text>
                                <RadioButton
                                    value="Cedula"
                                    status={this.state.TIPOIDENTIFICACION === 'Cedula' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({TIPOIDENTIFICACION: 'Cedula' }); }}
                                />
                            </View>
                            <Block row style={{paddingLeft:normalize(35)}} />
                            <View>
                                <Text>Pasaporte</Text>
                                <RadioButton
                                    value="Pasaporte"
                                    status={this.state.TIPOIDENTIFICACION === 'Pasaporte' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ TIPOIDENTIFICACION: 'Pasaporte' }); }}
                                />
                            </View>
                            </Block>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label=''
                                placeholder={'XXX-XXXXXXX-X'}
                                value={this.state.IDENTIFICACION}
                                onChangeText={IDENTIFICACION => this.setState({ IDENTIFICACION })}
                            />
                            <Block row style={{paddingBotton:normalize(15)}} />
                         
                         
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Escribe un PIN'
                                placeholder={'****'}
                                value={this.state.PIN}
                                onChangeText={PIN => this.setState({ PIN })}
                                keyboardType="numeric"
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Escribe el PIN nuevamente'
                                placeholder={'****'}
                                value={this.state.PIN2}
                                onChangeText={PIN2 => this.setState({ PIN2 })}
                                keyboardType="numeric"
                            />
                            <Text>{"\n"}</Text>
                            <Text>Seleccionar un rol:</Text>
                            <Picker
                                selectedValue={this.state.Rol} 
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({Rol: itemValue})
                                }>
                               {
                                       this.state.Roles.map(xo =>(
                                        <Picker.Item label={xo.NombreRol.toString()} value={xo.id} key={xo.id} />
                                       )
                                       )

                               }
                            </Picker>
                            <Button
                                labelStyle={styles.Button} 
                                mode="contained" 
                                onPress={this.GuardarEmpleado}
                            >
                                <Icon 
                                    name="save" 
                                    size={15} 
                                    color="#ffffff" 
                                    style={styles.Icon}
                                /> <Text>{"  "}</Text>   
                                Agregar
                            </Button>
                       
                        </Card.Content>
                     

                    </Card>
                </View>
           
            </View>
       
            </ScrollView>

        );
        }



 GuardarEmpleado = async ()=>{
try{
/*
    const sql = 'SELECT * FROM Empleados where NombreUsuario =? or Identificacion =?'
    const params = [this.state.NOMBREUSUARIO, this.state.IDENTIFICACION]
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql, params).then(   ({ rows }) => {

    const cantidad = Object.keys(rows).length;
    const {} =  rows;

if(cantidad > 0){
this.setState ({ExistenDatos:true}) ;
console.log(this.state.ExistenDatos)
}
    } )

 
console.log(this.state.ExistenDatos)
if(this.state.ExistenDatos){

Alert.alert("ya existen datos");
return;
}
*/
    
    if(this.state.NOMBRE ===""){
        Alert.alert("El campo nombre no puede estar vacio.");
        return;
        }
        
        if(this.state.APELLIDO ===""){
            Alert.alert("El campo apellido no puede estar vacio.");
            return;
        }

        if(this.state.PIN !== this.state.PIN2){      
            Alert.alert("EL PIN no es el mismo");
            return;
        }

    

   // this.Validaciones();



 
const username = (this.state.NOMBRE+this.state.APELLIDO).toLocaleLowerCase();
const fecha = new Date();
const Model={

    NombrePersona:this.state.NOMBRE, 
    ApellidoPersona:this.state.APELLIDO,
    NombreUsuario: (this.state.NOMBRE + this.state.APELLIDO).toLocaleLowerCase(),
    Telefono:this.state.TELEFONO,
    TipoIdentificacion:this.state.TIPOIDENTIFICACION,
    Identificacion:this.state.IDENTIFICACION,
    Rol:this.state.Rol,
    IdEmpresa:1,
    Activo:1,
    FechaCreacion: fecha.toString(),
    FechaModificacion:"null",
    UsuarioCreacion:"system",
    UsuarioModificacion:"null",
    PIN:this.state.PIN.toString()
}
console.log(Model, 'check this insert')


this.SaveEmp(Model);



}
catch(e){

Alert.alert("Ha ocurrido un error, favor contactar a FreddyBrian Corp: "+ e);
console.log(e)
}
}

Validaciones = ()=>{
 
    try{

             
    }

    catch(e){

        Alert.Alert("Ha ocurrido un error validanto datos: " + e)
 console.log(e);
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






