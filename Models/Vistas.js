import {BaseModel,types} from "expo-sqlite-orm"
import * as SQLite from 'expo-sqlite'


export default class vistas extends BaseModel{

    constructor(obj){


        super(obj)
        
        }


        static get database(){


            return ()=> SQLite.openDatabase("PuntoVentaDb.db");
            
            }
            
            static get tableName(){
            
            
            return'Vistas';
            
            }

            static get columnMapping(){


return(
{
    Id:{type:types.INTEGER, primary_key:true},
    NombreVista:{type: types.TEXT, not_null:true},
    IdVistaPadre:{type: types.INTEGER, not_null:false},
    Comentario:{type:types.TEXT, not_null:false},
    Activo:{type: types.INTEGER, not_null:true},
    FechaCreacion: {type: types.TEXT, not_null:true},
    FechaModificacion:{type:types.TEXT, not_null:false},
    UsuarioCreacion:{type:types.TEXT, not_null:true},
    UsuarioModificacion:{type:types.TEXT, not_null:false}
    
    

}


)

            }

            

}