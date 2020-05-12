import {BaseModel,types} from "expo-sqlite-orm"
import * as SQLite from 'expo-sqlite'

export default class Articulos extends BaseModel{



constructor(obj){


super(obj)

}

static get database (){


return async ()=>SQLite.openDatabase("PuntoVentaDb.db");

 }

 static get tableName(){

    return "Articulos"
 }

 static get columnMapping (){

return{

id:{type:types.INTEGER, primary_key:true},
Codigo:{type: types.TEXT, not_null:false},
CategoriaId: {type: types.INTEGER, not_null:true},
Descripcion:{type: types.TEXT, not_null:false},
DescripcionPantalla:{type: types.TEXT, not_null:true},
NombreArticulo:{type: types.TEXT, not_null:true},
CodigoDeBarra:{type: types.TEXT, not_null:false},
PrecioCosto:{type: types.TEXT, not_null:true},
PrecioVenta:{type: types.TEXT, not_null:true},
ProveedoresId:{type: types.TEXT, not_null:true},
CatidadExistencia:{type:types.INTEGER, not_null:true},
MedidaDeVenta:{type: types.TEXT, not_null:true},
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