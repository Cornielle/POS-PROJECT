import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DbCreator from "./Source/Components/DbCreator"
import QueryCreator from "./Source/Components/QueryCreator"
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import Estudiantes from './Models/Estudiantes'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Empleados from './Models/Empleados'
export default class App extends React.Component {
    /*  GetDatabaseObj = (database) =>{} */
   async componentDidMount(){
   
   const data ={
     Calificaciones:85,
     NombreEstudiante:"bob marley"
     
   } 
   
    const tablesRepeat=  Empleados.createTable();
   
   const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(
     'SELECT name FROM sqlite_master WHERE type = "table"'
     ).then(respon =>{console.log(respon)})
   
   
   const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql('create table Estudiantes(Id INTEGER PRIMARY KEY,  NomprePersona TEXT NOT NULL, '+
   'TipoIdentificacion INTEGER, Identificacion TEXT, Activo INTEGER, FechaCreacion TEXT, FechaModificacion TEXT, UsuarioCreacion TEXT, UsuarioModificacion Text ').then(respon =>{console.log(respon)})
   
   //const response = await Estudiantes.create(data);
   //console.log(response);
   }
     render(){
       return (
         <View style={styles.container}>
   
      <Text>Este el el projecto pos</Text>
          
         </View>
       );
   
     }
   
   }
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
     },
   });
   


// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import DbCreator from "./Source/Components/DbCreator"
// import QueryCreator from "./Source/Components/QueryCreator"
// import * as SQLite from "expo-sqlite"
// import {BaseModel, types} from 'expo-sqlite-orm'
// import Estudiantes from './Models/Estudiantes'
// import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
// import Empleados from './Models/Empleados'