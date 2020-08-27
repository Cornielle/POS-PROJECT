import React from 'react'
import * as SQLite from 'expo-sqlite'
import {BaseModel, types} from 'expo-sqlite-orm'


export default class Usuario extends BaseModel{


constructor(obj){

super(obj)


}


static get database(){


return async ()=>SQLite.openDatabase("PuntoVentaDb.db")

}

 static get tableName(){

return"Usuarios";

 }


static get columnMapping(){

return{
id:{type: types.INTEGER, primary_key:true},
Rol:{type: types.INTEGER, not_null:true},
NombreUsuario:{type: types.TEXT, not_null:true},
Contrasena:{type:types.TEXT, not_null:true},
Activo:{type: types.INTEGER, not_null:true},
IdEmpresa:{type:types.INTEGER, not_null:true},
IdSucursal:{type:types.INTEGER, not_null:false},
FechaCreacion: {type: types.TEXT, not_null:true},
FechaModificacion:{type:types.TEXT, not_null:true},
UsuarioCreacion:{type:types.TEXT, not_null:true},
UsuarioModificacion:{type:types.TEXT, not_null:true}
}


}





}