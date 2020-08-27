import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton} from 'react-native-paper'
import {StyleSheet, Text, View, ScrollView,Picker,ToastAndroid,Alert,Modal,AsyncStorage ,TouchableHighlight, FlatList, Dimensions} from 'react-native'
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from  '../Components/Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Stock from '../../Models/Stock';
import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
  

const InitialState={

  MontoSalida:0,
MotivoSalida:"",
};

export default class SalidaCajaScreen extends React.Component {




constructor(props){

super(props)

}

state={ 
MontoSalida:0,
MotivoSalida:"",


}


 componentDidMount (){

}



  render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state

return(

<ScrollView>

<View style={styles.ViewStyle}> 
{/*Header generico que debe ser reutilizado en casi todas las vistas */}
<Header name={'Salida De Caja'} 
    subtitle={'Crear perfil de Stock'}
    goBackEnabled={true}
    goBackNavigationName={'Grid'}
    navigationEnabled={false}
    navigation={this.props.navigationValue}
    toggleFormHeader={this.props.toggleForm}
    gridHeader={false}
/>
<View style={styles.ViewStyle}>
<Card>
<Card.Title style={styles.Card} title="Salida De Caja" subtitle={subtitle} left={(props)=> <Avatar.Icon {...props} icon="account" />}   />

<Card.Content>




<View style={{flexDirection:"row", flexWrap:'wrap'}}>


</View>
<Text>{"\n"}</Text> 
<TextInput
  style={styles.Input}
  mode='flat'
  label='Monto'
  value={this.state.MontoSalida}
keyboardType="number-pad"
  
onChangeText={(MontoSalida)=> this.setState({MontoSalida})}
/>
<Text>{"\n"}</Text> 

<TextInput
  style={styles.Input}
  mode='flat'
  label='Razon de la salida'
  value={this.state.MotivoSalida}
  multiline={true}
 underlineColorAndroid="transparent"
  
 onChangeText={(MotivoSalida)=> this.setState({MotivoSalida})}
/>
<Text>{"\n"}</Text> 

<Button
  labelStyle={styles.Button} 
  mode="contained" 
  onPress={this.SaveSalidaCaja}
>
<Icon 
  name="save" 
  size={5} 
  color="#ffffff" 
  style={styles.Icon}
  /> <Text>{"  "}</Text>   
  Agregar
</Button>

  
</Card.Content>



</Card>

</View>


</View>
  </ScrollView>

)


  }



  SaveSalidaCaja = async () =>{

try{


if(this.state.MontoSalida ===0){

Alert.alert("Debe ingresar el a salir de caja");

return;

}
const Caja = await AsyncStorage.getItem("CajaActivaId");

const LoggedUser = await AsyncStorage.getItem('LoggedUser');

  
 const  sucu =  await AsyncStorage.getItem('SucursalTemp');

 const emp = await AsyncStorage.getItem('EmpresaTemp');
 
const Dispo = await AsyncStorage.getItem('DeviceIdTemp');

  const AperturaUsuario = JSON.parse(LoggedUser);
  const sucursal = JSON.parse(sucu);
  const empresa = JSON.parse(emp);
  const Dispositivo = JSON.parse(Dispo);
  const CajaActiv = JSON.parse(Caja);

  console.log(AperturaUsuario)
  console.log(sucursal);
  console.log(empresa);
  console.log(Dispositivo);
console.log(CajaActiv);

var fecha = new Date();
    console.log("")
    console.log("")
    console.log("/****************************************************************************/");
    console.log("")
    console.log("")
    
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
db.executeSql("INSERT INTO SalidaCaja(MontoSalida,Razon,Activo,IdAperturaCaja,IdDispositivo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
,[this.state.MontoSalida,this.state.MotivoSalida,1,CajaActiv.IdCaja,empresa.Empresa,sucursal.Sucursal,
 "6/7/2020",null,AperturaUsuario.Usuario,null]).then(() => {
console.log("Database is ready ... executing query ...");

ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)

this.setState(InitialState);

}).catch((error) =>{
console.log(error)
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

}
catch(ex){

console.log(ex);

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
    },
  ModalContainer:{
  
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"blue",
  paddingTop:40
  
  
  
  },

  TextArea:{
width:50, 
height:50

  }
  })
  