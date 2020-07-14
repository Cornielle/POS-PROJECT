import React from 'react'
import{TextInput, Avatar, Button, Card, RadioButton, DataTable} from 'react-native-paper'
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
  MontoEfectivo:0,
  MontoTarjeta:0,
  MontoDeposito:0,
  Montogeneral:0,
  MontoACuadrar:0

};

export default class CierreCajaScreen extends React.Component {




constructor(props){

super(props)

}

state={ 
  MontoSalida:null,
  MontoEfectivo:null,
  MontoTarjeta:null,
  MontoDeposito:null,
  Montogeneral:null,
  MontoACuadrar:null,
  TbxMonCaja:null

}


 componentDidMount (){
   this.GetCajaInfo();
   this.GetSalidaCaja();

  this.SelectDbInfo();
}


SelectDbInfo =() =>{


        
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
db.executeSql("PRAGMA table_info(Caja)"
,[]).then((Result) => {




for(let i =0; i< 17; i++){


console.log(Result[0].rows.item(i))

}


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


<Card.Content>




<View style={{flexDirection:"row", flexWrap:'wrap'}}>


</View>

<DataTable>

<DataTable.Header>

<DataTable.Title>Tipo De Pago</DataTable.Title>
<DataTable.Title>Monto</DataTable.Title>
</DataTable.Header>

<DataTable.Row>
      <DataTable.Cell>Venta Efectivo</DataTable.Cell>
<DataTable.Cell numeric>{this.state.MontoEfectivo !==null ? this.state.MontoEfectivo : 'Cargando...'}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Venta Tarjeta</DataTable.Cell>
<DataTable.Cell numeric>{this.state.MontoTarjeta !== null?this.state.MontoTarjeta: 'Cargando...'}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Venta Desposito</DataTable.Cell>
<DataTable.Cell numeric>{this.state.MontoDeposito !== null ? this.state.MontoDeposito : "Cargando..."}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Retiro Caja</DataTable.Cell>
<DataTable.Cell numeric>{this.state.MontoSalida !==null?this.state.MontoSalida:"Cargando..."}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Venta General</DataTable.Cell>
      <DataTable.Cell numeric>{this.state.Montogeneral !==null?this.state.Montogeneral:"Cargando..."}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Cuadre caja</DataTable.Cell>
      <DataTable.Cell numeric>{this.state.MontoACuadrar !==null?this.state.MontoACuadrar:"Cargando..."}</DataTable.Cell>
    </DataTable.Row>




</DataTable>


<TextInput
              style={styles.Input}
              mode='flat'
              label='Monto Efectivo'
              value={this.state.TbxMonCaja !==null ? this.state.TbxMonCaja : 'Cargando...'}
              //disabled={editFields}
              editable={true}

              onChangeText={(TbxMonCaja) => this.setState({ TbxMonCaja })}

            /> 
            <Text>{"\n"}</Text>
{/* 

<TextInput
              style={styles.Input}
              mode='flat'
              label='Monto Tarjeta'
              value={this.state.MontoTarjeta !==null ? this.state.MontoTarjeta : 'Cargando...'}
           //   disabled={editFields}
              editable={true}
              onChangeText={(MenuLabel) => this.editField(MenuLabel,'MenuLabel')}
            /> 




*/}

<Button
  labelStyle={styles.Button} 
  mode="contained" 
  onPress={this.CloseCaja}
>
<Icon 
  name="save" 
  size={5} 
  color="#ffffff" 
  style={styles.Icon}
  /> <Text>{"  "}</Text>   
  Cerrar Caja
</Button>

  
</Card.Content>



</Card>

</View>


</View>
  </ScrollView>

)


  }


GetSalidaCaja = async() =>{


  try{
    
    let MSalida = 0;
   
    const Caja = await AsyncStorage.getItem("CajaActivaId");
  
   
      const CajaActiv = JSON.parse(Caja);
    

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
    db.executeSql("SELECT * FROM SalidaCaja WHERE Activo = ? AND IdAperturaCaja =?",[1,CajaActiv.IdCaja]).then((Result) => {


      const ResulLength= Result[0].rows.length;

      for(let i = 0; i < ResulLength; i++){
      
        let dataVenta = Result[0].rows.item(i)
       
        MSalida += dataVenta.MontoSalida;

      
      }

console.log("Salida de caja",MSalida);

this.setState({MontoSalida:MSalida});

                            
 let montog = ( this.state.MontoEfectivo - this.state.MontoSalida );
 let montoGeneral = (this.state.MontoEfectivo+this.state.MontoTarjeta + this.state.MontoDeposito)
 this.setState({Montogeneral:montoGeneral})
 console.log("monto a cuadrar", montog);
 
  this.setState({MontoACuadrar:montog})
                                           
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

  CloseCaja  = async () =>{

    try{
    
    
   
    const Caja = await AsyncStorage.getItem("CajaActivaId");
  
    const LoggedUser = await AsyncStorage.getItem('LoggedUser');
      /*
      
     const  sucu =  await AsyncStorage.getItem('SucursalTemp');
    
     const emp = await AsyncStorage.getItem('EmpresaTemp');
     
    const Dispo = await AsyncStorage.getItem('DeviceIdTemp');
    

      const sucursal = JSON.parse(sucu);
      const empresa = JSON.parse(emp);
      const Dispositivo = JSON.parse(Dispo);   
            console.log(AperturaUsuario)
      console.log(sucursal);
      console.log(empresa);
      console.log(Dispositivo);
      */
     const AperturaUsuario = JSON.parse(LoggedUser);
      const CajaActiv = JSON.parse(Caja);
    

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
    db.executeSql("UPDATE Ventas SET Activo =? , UsuarioModificacion = ?,  MontoVentaEfectivo=?"
    +", MontoVentaTotal =?, UsuarioCierreCaja =?, MontoSalidaDeCaja =? WHERE Activo=? AND rowid =?"
    ,[0,AperturaUsuario.Usuario,this.state.MontoEfectivo ,this.state.Montogeneral,AperturaUsuario.Usuario,
      this.state.MontoSalida,1,CajaActiv.IdCaja]).then((Result) => {

console.log(Result)

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

  GetCajaInfo = async () =>{

    try{
    
    


    const Caja = await AsyncStorage.getItem("CajaActivaId");
    /*
    const LoggedUser = await AsyncStorage.getItem('LoggedUser');
    
      
     const  sucu =  await AsyncStorage.getItem('SucursalTemp');
    
     const emp = await AsyncStorage.getItem('EmpresaTemp');
     
    const Dispo = await AsyncStorage.getItem('DeviceIdTemp');
    
      const AperturaUsuario = JSON.parse(LoggedUser);
      const sucursal = JSON.parse(sucu);
      const empresa = JSON.parse(emp);
      const Dispositivo = JSON.parse(Dispo);   
            console.log(AperturaUsuario)
      console.log(sucursal);
      console.log(empresa);
      console.log(Dispositivo);
      */
      const CajaActiv = JSON.parse(Caja);
      let MEfectivo =0;
      let MTarjeta = 0;
      let MTransferencia = 0;
      let MSalidaCaja = 0; 

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
    db.executeSql("SELECT * FROM Ventas WHERE Activo = ? AND IdAperturaCaja =?"
    ,[1,CajaActiv.IdCaja]).then((Result) => {

const ResulLength= Result[0].rows.length;

for(let i = 0; i < ResulLength; i++){

  let dataVenta = Result[0].rows.item(i)
 
  MEfectivo += dataVenta.PagoEfectivo;
  MTarjeta += dataVenta.PagoTarjeta;
  MTransferencia += dataVenta.PagoTransferencia;

}



this.setState({MontoEfectivo:MEfectivo});
this.setState({MontoTarjeta:MTarjeta})
this.setState({MontoDeposito:MTransferencia});

console.log("cantidad efectivo",this.state.MontoEfectivo);
console.log("cantidad tarjeta",this.state.MontoTarjeta)
console.log("cantidad deposito", this.state.MontoDeposito)

console.log(Result)

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

  ,
    modalTitle:{
      textAlign:'center',
      fontSize:26,
      color:'#090909'
    },
    modalSubTitle:{
      textAlign:'center',
      fontSize:18,
      color:'#2F4F4F'
    }
  })
  
