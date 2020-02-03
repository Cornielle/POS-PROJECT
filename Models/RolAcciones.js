import React from 'react'
import * as SQLite from 'expo-sqlite'
import {BaseModel,types} from 'expo-sqlite-orm'
import { deleteAsync } from 'expo-file-system'


export default class RolAcciones extends BaseModel{
 constructor(obj){

super(obj)
 }


 static get database(){

return ()=> SQLite.openDatabase("PuntoVentaDb.db");


 }

 static get tableName(){


return "RolAcciones";


 }


 static get columnMapping (){

return{

    Id:{type:types.INTEGER, primary_key:true},
    IdAcciones:{type: types.INTEGER, not_null:true},
    RolId:{type: types.INTEGER, not_null:true},
    comentario:{type: types.TEXT, not_null:false},
    Activo:{type: types.INTEGER, not_null:true},
    FechaCreacion: {type: types.TEXT, not_null:true},
    FechaModificacion:{type:types.TEXT, not_null:true},
    UsuarioCreacion:{type:types.TEXT, not_null:true},
    UsuarioModificacion:{type:types.TEXT, not_null:true}


}

 }



}