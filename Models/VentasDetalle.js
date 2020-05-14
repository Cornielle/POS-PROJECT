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
        Idventa :{type:types.INTEGER, not_null:true},
        PrecioNeto:{type: types.FLOAT, not_null:true},
        PrecioTotal:{type: types.FLOAT, not_null:true},
        DescuentoAplicado:{type:types.FLOAT, not_null:true},

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

