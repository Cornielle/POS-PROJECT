import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,Alert,ToastAndroid} from 'react-native'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'
import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Articulos from '../../Models/Articulos'

const InitialState ={
    Proveedores:[],

    Codigo: "",
    CategoriaId: "",
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
CategoriaId: "",
Descripcion:"",
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

loadTable = async () => {
//  Articulos.dropTable();
 Articulos.createTable();
    const sqlProvee = `SELECT id,NombreProveedor FROM Proveedores WHERE Activo =? ORDER BY id ASC`
    const paramsProvee = [1];
    const databaseLayerProvee = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayerProvee.executeSql(sqlProvee,paramsProvee).then(  ({ rows }) => {
  this.setState({Proveedores:rows});
  //console.log(rows)
 } )  
}

  componentDidMount(){   
    // Articulos.dropTable();
this.loadTable()
    const sqlArticulos = 'SELECT * FROM Articulos'
    const paramsArticulos = []
    const databaseLayerArticulos = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayerArticulos.executeSql(sqlArticulos,paramsArticulos).then(  ({ rows }) => {

console.log(rows, 'here');
     
    } )

    const sql = 'SELECT * FROM Categorias'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(sql,params).then(({ rows }) => {
        this.setState ({Categorias:rows}) ;
       // console.log(rows);
    })
    const sql1 =  'SELECT name FROM sqlite_master WHERE type = "table"'
    const params1 = []
    const databaseLayer1 = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
    databaseLayer1.executeSql(sql1,params1).then(  ({ rows }) => {
        console.log(rows); 
    } )

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
label='Codigo'
value={this.state.Codigo}
onChangeText={(Codigo) =>this.setState({Codigo:Codigo})}
/>

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
label='Descripcion'
value={this.state.Descripcion}
onChangeText={(Descripcion) => this.setState({Descripcion:Descripcion})}


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
value={this.state.CodigoDeBarra}
onChangeText={(CodigoDeBarra)=>this.setState({CodigoDeBarra:CodigoDeBarra})}

 />
 <TextInput 
style={styles.Input}
model='flat'
label='Precido de costo'
value={this.state.PrecioCosto}
onChangeText={(PrecioCosto) => this.setState({PrecioCosto:PrecioCosto})}

 />
 <TextInput 
style={styles.Input}
model='flat'
label='Precio De Venta'
value={this.state.PrecioVenta}
onChangeText={(PrecioVenta) => this.setState({PrecioVenta:PrecioVenta})}
/>
<Text>{"\n"}</Text>
<TextInput 
style={styles.Input}
model='flat'
label='Cantidad Existencia'
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

this.state.Categorias.map(lol =>(
    <Picker.Item label={lol.NombreCategoria.toString()} value={lol.id.toString()}  key={lol.id.toString()} />
    ))
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

this.state.Proveedores.map(lol =>(
    <Picker.Item label={lol.NombreProveedor.toString()} value={lol.id}  key={lol.id} />
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
    const Insert ={

        Codigo: this.state.Codigo,
        CategoriaId: this.state.CategoriaId,
        Descripcion: this.state.Descripcion,
        DescripcionPantalla: this.state.DescripcionPantalla,
        NombreArticulo: this.state.NombreArticulo,
        CodigoDeBarra: this.state.CodigoDeBarra,
        PrecioCosto: this.state.PrecioCosto,
        PrecioVenta:this.state.PrecioVenta,
        ProveedoresId:this.state.ProveedoresId,
        CatidadExistencia:this.state.CatidadExistencia,
        MedidaDeVenta:this.state.MedidaDeVenta,
        Activo:1,
        IdEmpresa:1,
        IdSucursal:1,
        FechaCreacion: fecha.toString(),
        FechaModificacion:null,
        UsuarioCreacion:"system",
        UsuarioModificacion:null
        
    
    
    };
    console.log(Insert);


    
    const response = await  Articulos.create(Insert);

    console.log(response);

    if (Object.keys(response).length <=0){

        Alert.alert("Error al insertar en la base de datos");
        
        }else{


           ToastAndroid.show("Guardado Correctamente!", ToastAndroid.SHORT);

           this.setState(InitialState)
      }

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