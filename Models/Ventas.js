import {BaseModel,types} from "expo-sqlite-orm"
import * as SQLite from 'expo-sqlite'

export default class Ventas extends BaseModel{

constructor(obj){

super(obj)

}



static get database(){

return () => SQLite.openDatabase("PuntoVentaDb.db")

}

static get tableName(){

    return "Ventas"
}


static get columnMapping(){


return{
    id :{type:types.INTEGER,  primary_key:true},
    PrecioNeto:{type: types.FLOAT, not_null:true},
    
    PrecioTotal:{type: types.FLOAT, not_null:true},
    DescuentoAplicado:{type:types.FLOAT, not_null:true},
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

