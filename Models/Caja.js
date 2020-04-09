import {BaseModel,types} from "expo-sqlite-orm"
import * as SQLite from 'expo-sqlite'

export default class Caja extends BaseModel{


    constructor(obj){
super(obj)

    }


static get database(){

return () => SQLite.openDatabase("PuntoVentaDb.db")

}

static get tableName (){

return "Caja"


}

static get columnMapping(){

return{
    Id:{type:types.INTEGER, primary_key:true},
    MontoApertura:{type:types.FLOAT, not_null:true},
    FechaInicioApertura:{type:types.TEXT, not_null:true},
    UsuarioApertura:{type: types.TEXT, not_null:true},
    MontoVentaTarjetaCredito:{type: types.FLOAT, not_null:false},
    MontoVentaEfectivo: {types: types.FLOAT, not_null:false},
    MontoVentaTotal:{types:types.FLOAT, not_null:false},
    MontoSalidaDeCaja:{types: types.FLOAT, not_null:false},
    UsuarioCierreCaja:{types: types.FLOAT, not_null:false},
    FechaCierreAperturaCaja:{types: types.TEXT, not_null:false },
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