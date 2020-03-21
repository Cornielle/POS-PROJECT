import React from 'react'
import{TextInput, Avatar, Button, Card} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,Alert} from 'react-native'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'
import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Articulos from '../../Models/Articulos'


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


export default class Articulo extends React.Component{

constructor(props){

    super(props)

}

state={
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
  componentDidMount(){   
    const sql = 'SELECT * FROM Categorias'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql,params).then(  ({ rows }) => {

this.setState ({Categorias:rows}) ;})
const sql1 =  'SELECT name FROM sqlite_master WHERE type = "table"'
const params1 = []
const databaseLayer1 = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayer1.executeSql(sql1,params1).then(  ({ rows }) => {

console.log(rows); 
} )


}

render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state
    {
  
return(

<ScrollView>
<View style={styles.ViewStyle}>

<Header name={name} subtitle={subtitle} goBackEnabled={true} navigationEnabled={false} navigation={navigation} />
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
label='Descripcion Articulo'
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
    <Picker.Item label="Administrador" value="1" />
    <Picker.Item label="Invitado" value="2" />
</Picker>

<Text>Seleccionar una Proveedor:</Text>
<Picker
    selectedValue={this.state.ProveedoresId}
    style={{height: 50, width: 200}}
    onValueChange={(itemValue, itemIndex) =>
        this.setState({ProveedoresId: itemValue})
    }>

    <Picker.Item label="Coca cola" value="1" />
    <Picker.Item label="Rica" value="2" />
</Picker>


<Text>Seleccionar medida :</Text>
<Picker
    selectedValue={this.state.MedidaDeVenta}
    style={{height: 50, width: 200}}
    onValueChange={(itemValue, itemIndex) =>
        this.setState({MedidaDeVenta: itemValue})
    }>
{this.state.Categorias.map(lol =>(
    <Picker.Item label={lol.NombreCategoria.toString()} value={lol.Id.toString()}  key={lol.Id.toString()} />
    ))
}
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
            Alert.alert();
            
            
            
            }


    } catch(e){

Alert.alert("Ha ocurrido un error:"+ e);

    }




    
}

 
GuardarArticulo = async () =>{
try  {
console.log("llegue!!1");

//Articulos.dropTable();
   Articulos.createTable()
    //this.Validaciones();
    const Insert ={

        Codigo: this.state.Codigo,
        CategoriaId: this.state.CategoriaId,
        DescripcionPantalla: this.state.DescripcionPantalla,
        Descripcion: this.state.Descripcion,
        NombreArticulo: this.state.NombreArticulo,
        CodigoDeBarra: this.state.CodigoDeBarra,
        PrecioCosto: this.state.PrecioCosto,
        PrecioVenta:this.state.PrecioVenta,
        ProveedoresId:this.state.ProveedoresId,
        CatidadExistencia:this.state.CatidadExistencia,
        MedidaDeVenta:this.state.MedidaDeVenta,
        Activo:1,
        FechaCreacion: "2020-02-02",
        FechaModificacion:null,
        UsuarioCreacion:"system",
        UsuarioModificacion:"null"
    };
    console.log(Insert);
    console.log("llegue!!2");
}
catch(e){



}



}


}