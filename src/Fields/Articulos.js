import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,Alert,ToastAndroid} from 'react-native'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'
//import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Articulos from '../../Models/Articulos'

import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

const InitialState ={
    Proveedores:[],

    Codigo: "",
    CategoriaId: 0,
    Descripcion:"",
    DescripcionPantalla: "",
    NombreArticulo: "",
    CodigoDeBarra:"",
    PrecioCosto:"",
    PrecioVenta:"",
    ProveedoresId:"",
    CatidadExistencia:"",
    MedidaDeVenta:"1",
    Categorias:[]

}
export default class Articulo extends React.Component{

constructor(props){

    super(props)

}

state={
Proveedores:[],

Codigo: "",
CategoriaId: 0,
DescripcionPantalla: "",
NombreArticulo: "",
CodigoDeBarra:"",
PrecioCosto:"",
PrecioVenta:"",
ProveedoresId:"",
CatidadExistencia:"",
MedidaDeVenta:"",
Categorias:[]
}



LoadData = async () =>{

    let ProveedoresCollection=[];

    let CategoriasCollection=[];
      //  const sqlStock = 'SELECT name FROM sqlite_master WHERE type = "table"'
    
    let  ArticulosCollection=[];
    
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
.then(() => { SQLite.openDatabase(database_name,database_version,database_displayname,database_size).then(DB => {
db = DB;console.log("Database OPEN");
                  db.executeSql("SELECT rowid,NombreProveedor FROM Proveedores WHERE Activo =? ORDER BY rowid ASC"
                  ,[1]).then((Results) => {
                      console.log("Database is ready ... executing query ...");
      console.log("Query completed");
      var len = Results[0].rows.length;
     // console.log(len)
      for (let i = 0; i < len; i++) {
        let row = Results[0].rows.item(i);
        ProveedoresCollection.push(row);
      }
    console.log(ProveedoresCollection)
    this.setState({Proveedores:ProveedoresCollection})
    ProveedoresCollection=[]
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data"); 
                  });


                  db.executeSql("SELECT * FROM Articulos"
                  ,[]).then((Results) => {
                      console.log("Database is ready ... executing query ...");
      console.log("Query completed");
      var len = Results[0].rows.length;
     // console.log(len)
      for (let i = 0; i < len; i++) {
        let row = Results[0].rows.item(i);
        ArticulosCollection.push(row);
      }
    console.log(ArticulosCollection)
    this.setState({Roles:ArticulosCollection})
    ArticulosCollection=[]
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data"); 
                  });


                  db.executeSql("SELECT * FROM Categorias WHERE Activo =? ORDER BY rowid ASC"
                  ,[1]).then((Results) => {
                      console.log("Database is ready ... executing query ...");
      console.log("Query completed");
      var len = Results[0].rows.length;
     // console.log(len)
      for (let i = 0; i < len; i++) {
        let row = Results[0].rows.item(i);
        CategoriasCollection.push(row);
      }
    console.log(CategoriasCollection)
    this.setState({Categorias:CategoriasCollection})
    CategoriasCollection=[]
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


loadTable = async () => {

    this.LoadData();
/*


    const sqlProvee = `SELECT id,NombreProveedor FROM Proveedores WHERE Activo =? ORDER BY id ASC`
    const paramsProvee = [1];
    const databaseLayerProvee = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayerProvee.executeSql(sqlProvee,paramsProvee).then(  ({ rows }) => {
  this.setState({Proveedores:rows});
  //console.log(rows)
 } )  
*/

}

SaveEmp(Model) {
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

      


db.executeSql("INSERT INTO Articulos(Codigo,CategoriaId,DescripcionPantalla,NombreArticulo,CodigoDeBarra,PrecioCosto,PrecioVenta,ProveedoresId,MedidaDeVenta,Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              ,[Model.Codigo,Model.CategoriaId,Model.DescripcionPantalla,Model.NombreArticulo,
                Model.CodigoDeBarra,Model.PrecioCosto,Model.PrecioVenta,Model.ProveedoresId,Model.MedidaDeVenta,Model.Activo,Model.IdEmpresa,Model.IdSucursal,
                Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                  console.log("Database is ready ... executing query ...");
                  ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)

db.executeSql("SELECT * FROM Articulos").then((resulst) =>{

Console.log(resulst);

/*
  console.log("Query completed");
  var len = resulst[0].rows.length;
  console.log(len)
  for (let i = 0; i < len; i++) {
    let row = resulst[0].rows.item(i);
    console.log(row)
  }

*/
})


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


  componentDidMount(){   

this.loadTable()

    /*

const sql1 =  'SELECT name FROM sqlite_master WHERE type = "table"'
const params1 = []
const databaseLayer1 = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayer1.executeSql(sql1,params1).then(  ({ rows }) => {

console.log(rows); 
} )

*/
}

render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state
    {
  
return(

<ScrollView>
<View style={styles.ViewStyle}>

{/*Header generico que debe ser reutilizado en casi todas las vistas */}
<Header name={'Registro'} 
    subtitle={'Crear perfil de Usuario'}
    goBackEnabled={true}
    goBackNavigationName={'Grid'}
    navigationEnabled={false}
    navigation={this.props.navigationValue}
    toggleFormHeader={this.props.toggleForm}
    gridHeader={false}
/>
<View style={styles.Form}>
<Card>


<Card.Title 
style={styles.Card}
title="Articulos" 
subtitle="Todas l" 
left={(props) => <Avatar.Icon {...props} 
icon="account" />} 
                        />

<Card.Content>


 <TextInput 
style={styles.Input}
model='flat'
label='Nombre a mostrar'
value={this.state.DescripcionPantalla}
onChangeText={(DescripcionPantalla) => this.setState({DescripcionPantalla:DescripcionPantalla})}


 />

 <TextInput 
style={styles.Input}
model='flat'
label='Nombre Articulo'
value={this.state.NombreArticulo}
onChangeText ={(NombreArticulo)=>this.setState({NombreArticulo:NombreArticulo})}

 />
 <TextInput 
style={styles.Input}
model='flat'
label='Codigo de barra'
keyboardType="numeric"
value={this.state.CodigoDeBarra}
onChangeText={(CodigoDeBarra)=>this.setState({CodigoDeBarra:CodigoDeBarra})}

 />
 <TextInput 
style={styles.Input}
model='flat'
label='Precido de costo'
keyboardType="numeric"
value={this.state.PrecioCosto}
onChangeText={(PrecioCosto) => this.setState({PrecioCosto:PrecioCosto})}

 />
 <TextInput 
style={styles.Input}
model='flat'
label='Precio De Venta'
keyboardType="numeric"
value={this.state.PrecioVenta}
onChangeText={(PrecioVenta) => this.setState({PrecioVenta:PrecioVenta})}
/>
<Text>{"\n"}</Text>
<TextInput 
style={styles.Input}
model='flat'
label='Cantidad Existencia'
keyboardType="numeric"
value={this.state.CatidadExistencia}
onChangeText={(CatidadExistencia) => this.setState({CatidadExistencia:CatidadExistencia})}
/>
<Text>{"\n"}</Text>

<Text>Seleccionar una Categoria:</Text>
<Picker
    selectedValue={this.state.CategoriaId}
    style={{height: 50, width: 200}}
    onValueChange={(itemValue, itemIndex) =>
        this.setState({CategoriaId: itemValue})
    }>
                                     {

this.state.Categorias.map(cat =>(

<Picker.Item label={cat.NombreCategoria.toString()} value={cat.rowid.toString()}  key={cat.rowid.toString()} />
    )
    
  
    )
}
</Picker>

<Text>Seleccionar una Proveedor:</Text>
                            <Picker
                                selectedValue={this.state.ProveedoresId}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ProveedoresId: itemValue})
                                }>
                                   {

this.state.Proveedores.map(prob =>(
    <Picker.Item label={prob.NombreProveedor.toString()} value={prob.rowid}  key={prob.rowid} />
    ))
                                   }
                            </Picker>
 

                            <Text>Seleccionar medida :</Text>
                            <Picker
                                selectedValue={this.state.MedidaDeVenta}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({MedidaDeVenta: itemValue})
                                }>
    <Picker.Item label="Unidad" value="1" />
    <Picker.Item label="Libra" value="2" />
    <Picker.Item label="Docena" value="3" />
    <Picker.Item label="Libra" value="4" />
</Picker>
                <Button
                    labelStyle={styles.Button} 
                    icon="account" 
                    mode="contained" 
                    onPress={this.GuardarArticulo}
                >
                    Agregar
                </Button>
            </Card.Content>
        </Card>
    </View>
</View>
</ScrollView>
)
    }
}
Validaciones = ()=>{

    try{

        if(this.state.CategoriaId ===""){  

            Alert.alert("Debe elegir una categoria de producto!");
            return;
            }

            if(this.state.NombreArticulo ===""){
            
                Alert.alert("Debe elegir una descripcion!");
                return;
            }

            if(this.state.PrecioCosto ===""){
            
                Alert.alert("Debe elegir el precio de costo!");
                return;
            }
            
            if(this.state.PrecioVenta ===""){
            
                Alert.alert("Debe elegir el precio de venta!");
                return;
            
            }
            
            if(this.state.PrecioVenta===""){
            Alert.alert("Debe elegir el precio de venta");
            
            
            
            }


    } catch(e){

Alert.alert("Ha ocurrido un error:"+ e);

    }




    
}

 
GuardarArticulo = async () =>{
try  {

// Articulos.dropTable();
  
const fecha = new Date();


  // this.Validaciones();
    const Model ={

        Codigo: null,
        CategoriaId: this.state.CategoriaId,
        DescripcionPantalla: this.state.DescripcionPantalla,
        NombreArticulo: this.state.NombreArticulo,
        CodigoDeBarra: this.state.CodigoDeBarra,
        PrecioCosto: this.state.PrecioCosto,
        PrecioVenta:this.state.PrecioVenta,
        ProveedoresId:this.state.ProveedoresId,
        MedidaDeVenta:this.state.MedidaDeVenta,
        Activo:1,
        IdEmpresa:1,
        IdSucursal:1,
        FechaCreacion: fecha.toString(),
        FechaModificacion:null,
        UsuarioCreacion:"system",
        UsuarioModificacion:null
        
    
    
    };



    




           this.setState(InitialState)
  

}   
catch(ex){


    console.log(ex)

}



}


}

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