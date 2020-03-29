import {BaseModel, types} from 'expo-sqlite-orm'
import SQLite from 'expo-sqlite'



export default class Stock extends BaseModel{



constructor(obj){

super(obj)
}



static get database (){

return ()=> SQLite.openDatabase("PuntoVentaDb.db");


}

static get tableName(){

    return "Stock";
}



 static get columnMapping(){

return{
    Id:{type:types.INTEGER, primary_key:true},
    ArticuloId:{type: types.INTEGER, not_null:true},
    CantidadExistencia:{type:types.INTEGER, not_null:true},
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