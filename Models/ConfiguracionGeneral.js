import {BaseModel,types} from "expo-sqlite-orm"
import * as SQLite from 'expo-sqlite'

export default class ConfiguracionGeneral extends BaseModel{



    constructor(obj){


        super(obj)
        
        }

        static get database(){
            return ()=> SQLite.openDatabase("PuntoVentaDb.db");
        }
         static get tableName(){
            return 'ConfiguracionGeneral';
        }
        static get columnMapping(){
                return{
                    
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