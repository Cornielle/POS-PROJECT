import React from 'react'
import * as SQLite from 'expo-sqlite'
import {BaseModel, types} from 'expo-sqlite-orm'

export default class Roles extends BaseModel{

constructor(obj){

super(obj)

}


 static get database(){
return ()=>SQLite.openDatabase("PuntoVentaDb.db")

 }

 static get tableName(){

return "Roles"
}

static get columnMapping(){

return{
Id:{type:types.INTEGER, primary_key:true},
NombreRol:{type:types.TEXT, not_null:true},
Comentario:{type:types.TEXT, not_null:true},
Activo:{type: types.INTEGER, not_null:true},
FechaCreacion: {type: types.TEXT, not_null:true},
FechaModificacion:{type:types.TEXT, not_null:true},
UsuarioCreacion:{type:types.TEXT, not_null:true},
UsuarioModificacion:{type:types.TEXT, not_null:true}
}


}




}