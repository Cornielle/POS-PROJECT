import React from 'react'
import * as SQLite from 'expo-sqlite'
import {BaseModel,types} from 'expo-sqlite-orm'
import { deleteAsync } from 'expo-file-system'


export default class RolMenu extends BaseModel{
 constructor(obj){

super(obj)
 }


 static get database(){

return ()=> SQLite.openDatabase("PuntoVentaDb.db");


 }

 static get tableName(){


return "RolMenu";


 }


 static get columnMapping (){

return{

    Id:{type:types.INTEGER, primary_key:true},
    IdMenu:{type: types.INTEGER, not_null:true},
    RolId:{type: types.INTEGER, not_null:true},
    Comentario:{type: types.TEXT, not_null:false},
    Activo:{type: types.INTEGER, not_null:true},
    IdEmpresa:{type:types.INTEGER, not_null:true},
    IdSucursal:{type:types.INTEGER, not_null:false},
    FechaCreacion: {type: types.TEXT, not_null:true},
    FechaModificacion:{type:types.TEXT, not_null:false},
    UsuarioCreacion:{type:types.TEXT, not_null:true},
    UsuarioModificacion:{type:types.TEXT, not_null:false}


}

 }



}