
import React from "react"
import * as SQLite from "expo-sqlite"
import * as Filesystem from "expo-file-system"
import { View,Alert } from "react-native";
class DbCreator extends React.Component  {   
componentDidMount(){
        this.getdatabaseinfo("PuntoVentaDb.db");
}



getdatabaseinfo =  async(NameDb)=>{
        const db = SQLite.openDatabase(NameDb); // abrimos la base de datos, en caso de que no exista la crea en el directrio
        const DataBaseDirectory = `${Filesystem.documentDirectory}/SQLite/${NameDb}`; // obtenemos la url del directorio donde se creo
        const confirm = await Filesystem.getInfoAsync(DataBaseDirectory) // obtenemos un objeto de estatus de la base de datos
        const {exists} = confirm; // confirmamos si existe en el directoio y condicionamos la situacion
        if(!exists){ Alert.alert("Ha ocurrido un error con la base de datos, Contacte al soporte tecnico o vendedor");}
        else{this.props.GetDatabaseObj(db)}}
        render(){
return(
<View></View>
)}}
export default DbCreator;
