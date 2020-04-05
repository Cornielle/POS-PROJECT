
import{BaseModel,types} from 'expo-sqlite-orm'
import * as SQLite from 'expo-sqlite'


export default class Empleados extends BaseModel{


constructor(obj){

super(obj)

}

static get database(){
return async ()=> SQLite.openDatabase("PuntoVentaDb.db");
}

 static get tableName(){
return 'Empleados';
 }

 static get columnMapping(){


return{
Id:{type: types.INTEGER, primary_key:true},
NombrePersona:{type: types.TEXT, not_null:true},
ApellidoPersona:{type: types.TEXT, not_null:true},
NombreUsuario:{type:types.TEXT, not_null:true},
Telefono:{type: types.TEXT, not_null:true},
TipoIdentificacion:{type: types.TEXT, not_null:true},
Identificacion: {type: types.TEXT, not_null:true},
Roll:{type: types.INTEGER, not_null:true},
Correo:{type: types.TEXT, not_null:false},
Contrasena:{type:types.TEXT, not_null:true},
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