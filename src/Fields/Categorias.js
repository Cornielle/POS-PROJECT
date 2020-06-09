import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,Alert,ToastAndroid} from 'react-native'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'
import Categorias from '../../Models/Categorias'
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

const styles = StyleSheet.create({
    ViewStyle:{
        backgroundColor:"#f6f6f6",
    },
    Form: {
        padding:normalize(15),
        marginBottom:10,
    },
    Input: {
        color: '#161924',
        fontSize: 14,
        fontWeight:"200",
        backgroundColor:'#FFFFFF',
    },
    Button:{
        color:'#ffffff',
    }
})

const InitialState ={

  NombreCategoria:"",
Descripcion:""
}

export default class Categoria extends React.Component{

constructor(obj){
super(obj)

}

LoadData = async () =>{

    let RolesCollection=[];
      //  const sqlStock = 'SELECT name FROM sqlite_master WHERE type = "table"'
    
    
    
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase(
                database_name,
                database_version,
                database_displayname,
                database_size
              )
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN");
                  db.executeSql("SELECT * FROM Categorias"
                  ,[]).then((Results) => {
                      console.log("Database is ready ... executing query ...");
      console.log("Query completed");
      var len = Results[0].rows.length;
     // console.log(len)
      for (let i = 0; i < len; i++) {
        let row = Results[0].rows.item(i);
        RolesCollection.push(row);
      }
    console.log(RolesCollection)
    this.setState({Roles:RolesCollection})
    RolesCollection=[]
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data"); 
                  });
                  resolve(db);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });
      
        
      
           
     }



     SaveCategoria(Model) {
        console.log("")
        console.log("")
        console.log("/****************************************************************************/");
        console.log("")
        console.log("")
        var fecha = new Date();
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase(
                database_name,
                database_version,       
                database_displayname,
                database_size
              )
    
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN"); 
                  db.executeSql("INSERT INTO Categorias(NombreCategoria,Descripcion,Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?)"
                  ,[Model.NombreCategoria,Model.Descripcion,Model.Activo,Model.IdEmpresa,Model.IdSucursal,
                    Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                      console.log("Database is ready ... executing query ...");

                      ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
    

    
    
    }).catch((error) =>{
    
    });
              
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });
      };
    


 async componentDidMount(){
    //  Categorias.dropTable();
    /*
const Created = await Categorias.createTable();



const sql = 'SELECT * FROM Categorias where NombreCategoria = ?'
    const params = ['Adicionales']


const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayer.executeSql(sql,params).then(respon =>{console.log(respon)})
*/


this.LoadData();

 }

state={
NombreCategoria:"",
Descripcion:""
}

    render(){
        const {name, subtitle, navigation} = this.props
        const { text,enabled, checked } =  this.state
    return(
    
    <ScrollView>
        {/*Header generico que debe ser reutilizado en casi todas las vistas */}
        <Header name={'Categorias'} 
                subtitle={'Crear perfíl de Categorías'}
                goBackEnabled={true}
                goBackNavigationName={'Grid'}
                navigationEnabled={true}
                navigation={this.props.navigationValue}
                toggleFormHeader={this.props.toggleForm}
                gridHeader={false}
            />
    <View style={styles.ViewStyle}>
    
    
    <View style={styles.Form}>
    <Card>
    
    
    <Card.Title 
        style={styles.Card}
        title="Categoria" 
        subtitle="Todas l" 
        left={(props) => <Avatar.Icon {...props} 
        icon="account" />} 
    />
    {}
    <Card.Content>
    <TextInput 
    style={styles.Input}
    model='flat'
    label='Nombre Categoria'
    value={this.state.NombreCategoria}
    onChangeText ={(NombreCategoria) =>{this.setState({NombreCategoria:NombreCategoria})}}
    
     />
 
  
     <TextInput 
    style={styles.Input}
    model='flat'
    label='Descripcion'
    value={this.state.Descripcion}
    onChangeText ={(Descripcion) => {this.setState({Descripcion:Descripcion})}}
    
     />
   <Button
    labelStyle={styles.Button} 
    icon="account" 
    mode="contained" 
    onPress={this.GuardarCategoria}
    >
        Guardar
    </Button>
    </Card.Content>
    </Card>
    </View>
    </View>
    </ScrollView>
    )
    }
    Validaciones = () =>{

        try {

            if(this.state.NombreCategoria ==""){

              Alert.alert("El nombre de la categoria no puede estar vacio");
              return;
            }
        }
        catch(e){
        }


    }

    GuardarCategoria = async () =>{

        try{
            const fecha = new Date();
            const Model = {
                NombreCategoria: this.state.NombreCategoria,
                Descripcion: this.state.Descripcion,
                Activo:1,
                FechaCreacion: fecha.toString(),
                FechaModificacion:null,
                UsuarioCreacion:"system",
                UsuarioModificacion:null,
                IdEmpresa:1,
                IdSucursal:1,
            }

            this.SaveCategoria(Model);
          
            this.setState(InitialState);
               
            }
       
        
        catch(ex){
            console.log(ex, 'what')
        }
    }

}