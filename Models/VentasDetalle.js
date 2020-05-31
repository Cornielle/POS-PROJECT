import {BaseModel,types} from "expo-sqlite-orm"
import * as SQLite from 'expo-sqlite'

export default class VentasScreen extends BaseModel{

constructor(obj){
super(obj)
}



static get database(){

    return () => SQLite.openDatabase("PuntoVentaDb.db")
    
    }
    
    static get tableName(){
    
        return "VentasDetalle"
    }
    
    
    static get columnMapping(){
    
    
    return{
        id :{type:types.INTEGER, not_null:true},
        IdArticulo:{type: types.INTEGER, not_null:true},
        PrecioArticulo:{type: types.FLOAT, not_null:true},
        Cantidad:{type:types.FLOAT, not_null:false},
        IdAperturaCaja:{type:types.FLOAT, not_null:true},
        IdVenta:{type:types.INTEGER, not_null:true},
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

