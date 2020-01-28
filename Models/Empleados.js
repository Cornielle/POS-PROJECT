import React from 'react'
import {View} from 'react-native'
import{BaseModel,types} from 'expo-sqlite-orm'
import * as SQLite from 'expo-sqlite'


export default class Empleados extends BaseModel{


constructor(obj){

super(obj)


}

static get database(){
return async ()=> SQLite.openDatabase("PuntoVentaDb.db");
}

 static get tableName(){
return 'Empleados';
 }

 static get columnMapping(){


return{
Id:{type: types.INTEGER, primary_key:true},
NombrePersona:{type: types.TEXT, not_null:true},
TipoIdentificacion:{type: types.INTEGER, not_null:true},
Identificacion: {type: types.TEXT, not_null:true},
Activo:{type: types.INTEGER, not_null:true},
FechaCreacion: {type: types.TEXT, not_null:true},
FechaModificacion:{type:types.TEXT, not_null:true},
UsuarioCreacion:{type:types.TEXT, not_null:true}







}


 }


}