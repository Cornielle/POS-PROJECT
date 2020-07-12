import React from 'react'

import {Picker, View} from 'react-native'
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'






const ListaCategoria =  async ()=>{
console.log("entro 111111");
    let data =[]

    const sql = 'SELECT * FROM Categorias'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql,params).then(  ({ rows }) => {


data = rows;
     
    } )




//if(tipo==="Categorias"){

if (data!==[]){
    console.log(data);
    return(
        data.map(lol =>(
            <Picker.Item label={lol.NombreCategoria.toString()} value={lol.Id.toString()}  key={lol.Id.toString()} />
            ))
    )

}

  

//}





} 




export default ListaCategoria

