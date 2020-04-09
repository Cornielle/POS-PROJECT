

import React from "react"
import * as SQLite from 'expo-sqlite'
import {BaseModel,types} from 'expo-sqlite-orm' 
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

 import Acciones from "../../Models/Acciones"
 import Articulos from "../../Models/Articulos"
 import Categorias from "../../Models/Categorias"
 import Empleados from "../../Models/Empleados"
 import Logs from "../../Models/Logs"
 import Menu from "../../Models/Menu"
 import MenuAcciones from "../../Models/MenuAcciones"
 import Proveedores from "../../Models/Proveedores"
 import Roles from "../../Models/Roles"
 import RolMenu from "../../Models/RolMenu"
 import Stock from "../../Models/Stock"
 import Usuario from "../../Models/Usuarios"
import { View } from "native-base"

export default  LoadTables = async  () =>{

try{
  


    const sqlStock = "SELECT name FROM my_db.sqlite_master WHERE type='table'"
    const paramsStock = [];
    const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {

     console.log(rows)
    } ) 


     

    



} catch(ex){

    console.log(ex)


}





}


