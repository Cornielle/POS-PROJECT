import React from "react"
import {View} from "react-native"
import * as SQLite from "expo-sqlite"
import * as Filesystem from "expo-file-system"

export default class QueryCreator extends React.Component{

state={

db :null, 
query:"",
params:[]

}

componentDidMount(){
   this.setState({db: props.database, query: props.command, params: props.params})

    
   
  console.log(this.props.database)
  //console.log(this.props.command)
   //console.log(this.props.params)
    



this.props.database.transaction((txn)=>{

//    console.log(this.props.database);

    txn.executeSql(this.props.command, this.props.params,(txn,result) =>{
   
   console.log("Resultado:", result.rowsAffected);
     if(result.rowsAffected > 0 ){
     
       Alert.alert("Se Actualizo Correctame!!");
       
     }
     else{
     
     Alert.alert("Fallo la insercion!!");
     
     
     }



    })






})

    
}


QueryCommand = () =>{



}



render(){

return(

<View>



</View>


)


}



}