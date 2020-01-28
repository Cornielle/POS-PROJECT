import React from "react"
import * as SQLite from 'expo-sqlite'
import {BaseModel,types} from 'expo-sqlite-orm'

export default class Acciones extends BaseModel{


constructor(obj){


super(obj)

}

static get database(){


return ()=> SQLite.openDatabase("PuntoVentaDb.db");

}

static get tableName(){


return'Acciones';

}

static get columnMapping(){

return{

Id:{type:types.INTEGER, primary_key:true},
IdFormulario:{type: types.INTEGER, not_null:false},
NombreAccion:{type:types.TEXT, not_null:true},
IdDelControl:{type:types.INTEGER, not_null:false},
TipoControl:{type:types.INTEGER, not_null:false}, 
Activo:{type: types.INTEGER, not_null:true},
FechaCreacion: {type: types.TEXT, not_null:true},
FechaModificacion:{type:types.TEXT, not_null:true},
UsuarioCreacion:{type:types.TEXT, not_null:true},
UsuarioModificacion:{type:types.TEXT, not_null:true}




}


}




}