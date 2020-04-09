import * as SQLite from 'expo-sqlite'
import {BaseModel,types} from 'expo-sqlite-orm'


export default class Proveedores extends BaseModel{

    constructor(obj){
super(obj)

    }



static get database (){


return () => SQLite.openDatabase("PuntoVentaDb.db");

}

static get tableName () {

    return 'Proveedores'


}



static get columnMapping(){


return{

    id:{type: types.INTEGER, primary_key:true},
    EsPersonaFisica:{type: types.TEXT, not_null:false},
    NombreProveedor:{type: types.TEXT, not_null:true},
    RNC:{type: types.Text, not_null:false},
    Direccion:{type: types.TEXT, not_null:false},
    Telefono:{type: types.TEXT, not_null:false},
    Correo:{type:types.TEXT, not_null:false},
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