import  React , {useState}from 'react'
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'


const DatosMenu = async() =>{

    const [DataMenu, setdata]= useState("[]");
    const idMenues =[]

    const sing ="?"
    let inFactory =",?"
    
      const Menues =await AsyncStorage.getItem('LoggedUser');
     
    const data = JSON.parse(Menues);
    
    data.Menus.map(x =>(
    
      idMenues.push(x.IdMenu)
    
    
    ))
    
    
    console.log(idMenues.length);
      console.log(sing+inFactory.repeat((idMenues.length-1)));
    
      const claves  = sing+inFactory.repeat(idMenues.length);
      const sql = `SELECT Id, MenuLabel FROM Menu where Id in(${claves})`
      const params = idMenues;
      const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
     databaseLayer.executeSql(sql,params).then(  ({ rows }) => {
 
   
      } )
      setdata("dsfsdf")
    return DataMenu;


    

}



export default DatosMenu;
