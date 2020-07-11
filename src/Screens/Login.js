import React, { Component } from 'react';
import { TextInput, Button, Card,   } from 'react-native-paper';
import { StyleSheet, Text, View, AsyncStorage, Alert,Modal, ToastAndroid} from 'react-native';
import {  Container,  Spinner, Content} from 'native-base';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Empleados from "../../Models/Empleados"
import Roles from "../../Models/Roles"
import RolMenu from "../../Models/RolMenu"
import Caja  from "../../Models/Caja"
import PinAuth from '../Screens/PinAuth'
import {Dimensions} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import  SQLite  from 'react-native-sqlite-storage';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;


//import whatever from '../src'
 export default class Login extends Component{
    constructor(props) {
        super(props);
      }
      state = { 
          FechaApertura: "",
        NombreUsuario:"",
        Contrasena:"",
        successful:false,
        Menus:[],
        ModalCajaVisibility:false,
        MontoApertura:0,
        LockModalVisibility:false,
        LockModalPass:"",
        Unlockpass:"",
        Pin:"",
        loading:false
          };
  componentDidMount(){
      console.log(SQLite)
    this.verifyLog();
 //this.Deletekey();
 this.ShowDeviceInfo();
this.GetNegocioInfo();

    const fecha  = new Date();
    const date = fecha.toString().split(' ')
    this.setState({FechaApertura:`${date[2]}/${date[1]}/${date[3]}` })
    this.LoadAllData();
} 
LoadAllData = async () =>{


   // const sqlRol = 'PRAGMA table_info(Proveedores);'


} 


GetNegocioInfo = async() =>{


try{

    return new Promise( (resolve) => {

        SQLite.echoTest()
          .then(() => {
   
            console.log("Opening database ...");
SQLite.openDatabase(database_name,
              database_version,
              database_displayname,
              database_size
            )
              .then(DB => {
                db = DB;
   
db.executeSql('SELECT * FROM Catalogo WHERE Activo =? AND NombeCatalogo =? AND NombeCatalogo =?',[1,this.state.NombreUsuario.toLocaleLowerCase(),this.state.Contrasena]).then((result) => {
                    console.log("Database is ready ... executing query ...");
   console.log(result)
if(result[0].rows.length > 0  ){


 
}
   else{
    alert("No he traido datos");
   
   }

                }).catch((error) =>{
                    console.log("Received error: ", error);
   
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
   

}catch(ex){

    console.log(ex)


}


}

ShowDeviceInfo =() =>{


    try{
      DeviceInfo.getAndroidId().then(androidId => {
        this.SetDeviceId(androidId);
    //console.log(androidId);
      });
    
    }catch(ex){
    
    console.log(ex);
    
    }
    
    
    }
    
    
    SetDeviceId = async(androidId) =>{
    
    
      try{
    
    await AsyncStorage.setItem("DeviceIdTemp", JSON.stringify({DeviceId:androidId}));

  const device = await AsyncStorage.getItem("DeviceIdTemp");

  console.log(device)


      }
    catch(ex){
    
    console.log(ex);
    
    }
    
    }

verifyLog = async () =>{

try{

    console.log("Estoy en verificar log!");
   const item = await AsyncStorage.getItem('LoggedUser');

   console.log("Este es el valor del log ", item);
   if(item !==null&& item !== undefined){
console.log("Entre aqui a ver klk");

    const JsonUsuario = JSON.parse(item);
    this.setState({
        NombreUsuario: JsonUsuario.Usuario,
        LockModalVisibility:true,
        Unlockpass:JsonUsuario.Pin
    })
   }

}
catch(ex){

console.log(ex)

}

  
}


LogGoHome = () =>{
    console.log("Entree")
    try{
        console.log(this.state.Unlockpass, 'check navigation')  
        console.log(this.state.LockModalPass, 'check this')     
        if(this.state.Unlockpass === this.state.LockModalPass){
            this.setState({LockModalVisibility:false})
            this.props.navigation.navigate('Home');
        }
    }
    catch(ex){
        console.log('check this exception', ex);
    }

}
SetDatosCompania = async (Tipo,Valor) =>{


    console.log("Entre a datos compania");

if(Tipo==="Empresa")
 await AsyncStorage.setItem('EmpresaTemp',JSON.stringify({Empresa:Valor}));

if(Tipo==="Sucursal")
 await AsyncStorage.setItem('SucursalTemp',JSON.stringify({Sucursal:Valor}));


 const  sucu =  await AsyncStorage.getItem('SucursalTemp');

const emp = await AsyncStorage.getItem('EmpresaTemp');


console.log(sucu);

console.log(emp)

  }

GetNegocioInfo = async() =>{


    try{
    
        return new Promise( (resolve) => {
    
            SQLite.echoTest()
              .then(() => {
       
                console.log("Opening database ...");
    SQLite.openDatabase(database_name,
                  database_version,
                  database_displayname,
                  database_size
                )
                  .then(DB => {
                    db = DB;
       
    db.executeSql('SELECT NombeCatalogo,Tipo,Valor FROM Catalogo WHERE Activo =? AND NombeCatalogo IN (?,?)',[1,'Sucursal','Empresa']).then((result) => {
                        console.log("Database is ready ... executing query ...");
      // console.log(result)
    if(result[0].rows.length > 0  ){
    
      for (let index = 0; index < 2; index++) {
        const element = result[0].rows.item(index)
        console.log(`elemento no ${index}:`, element) 
       var  Tipo=  result[0].rows.item(index).NombeCatalogo;
       var Valor =result[0].rows.item(index).Valor;
      this.SetDatosCompania(Tipo,Valor);
      }
    }
       else{
        alert("No he traido datos");
       
       }
    
                    }).catch((error) =>{
                        console.log("Received error: ", error);
       
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
       
    
    }catch(ex){
    
        console.log(ex)
    
    
    }
    
    
    }
  

CerrarModal = () =>{
    try {
        this.setState({ModalCajaVisibility:false});
    }catch(ex){
        console.log(ex);
    }
}
Deletekey = async() =>{
    try{
        await AsyncStorage.removeItem('LoggedUser');
        await AsyncStorage.removeItem('CashierOpen');
        await AsyncStorage.removeItem('CajaActivaId');

        await AsyncStorage.removeItem('SucursalTemp');
        await AsyncStorage.removeItem('DeviceIdTemp');
      
      await AsyncStorage.removeItem('EmpresaTemp');
        
        const LoggedUser = await AsyncStorage.getItem('LoggedUser');
        const CashierOpen = await AsyncStorage.getItem('CashierOpen');
        const CajaActivaId = await AsyncStorage.getItem('CajaActivaId');
        const empresa = await AsyncStorage.getItem('EmpresaTemp');
        const sucursal = await AsyncStorage.getItem('SucursalTemp');
        console.log("eleme: ", LoggedUser)
        console.log("eleme: ", CashierOpen)
        console.log("eleme: ", CajaActivaId)
        console.log("eleme: ", empresa)
        console.log("eleme: ", sucursal)
    }
    catch(ex){
        console.log(ex);
    }
}
render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked, loading, FechaApertura } =  this.state
    if(loading === true){
        return (
          <Container>
            <Content>
            <Spinner color="#3F51B5" style={{ marginTop: windowHeight * 0.4}} />
            </Content>
          </Container>
          );
        }

    return (
        <View>
            <Modal visible ={this.state.LockModalVisibility}>
                <PinAuth 
                    props={this.props}
                    PIN={this.state.Unlockpass}
                />
            </Modal>
            <Modal transparent={true}
                    visible={this.state.ModalCajaVisibility}
                    >
                <SafeAreaView style={{backgroundColor:'rgba(0,0,0,0.6)',height:windowHeight * 1.43}}>
                    <Card style={{
                        height:windowHeight * 0.43,
                        marginTop: windowHeight * 0.26,
                    }}>
                        <Text style={styles.textModal}>Apertura de Caja</Text>
                        <TextInput
                            style={styles.Input}
                            label='Monto de  Apertura'
                            value={this.state.MontoApertura}
                            onChangeText={(MontoApertura) => this.setState({ MontoApertura })}
                        />
                        <View>
                            <Text style={styles.textModal}> 
                            <IconAwesome
                                    name="calendar-check-o"
                                    size={15}
                                    color="rgba(0, 0, 0, .5)"
                                />{" "}
                                Fecha:{" "}
                                {FechaApertura}
                            </Text>
                            <View style={styles.ButtonBlock}>
                            <Text>
                            <IconAwesome
                                    name="user"
                                    size={15}
                                    color="rgba(0, 0, 0, .5)"
                                />
                                Usuario: {" "} {this.state.NombreUsuario}
                            </Text>
                            <Text>{"\n"}</Text>
                            <Button
                            onPress={this.AbrirCaja} >
                                <Text>Abrir caja</Text>
                            </Button>
                            {/* <Button
                            onPress ={this.CerrarModal}>
                                <Text>Salir</Text>
                            </Button>    */}
                            </View>
                        </View>
                    </Card>
                </SafeAreaView>
            </Modal>
                    {/* <View style={styles.TimeLb}>
                        <Text>{this.state.FechaApertura }</Text>
                    </View>
                    <View style={styles.BodyLogin}>
                        <TextInput
                            style={styles.Input}
                            label='Monto Apertura'
                            value={this.state.MontoApertura}
                            onChangeText={(MontoApertura) => this.setState({ MontoApertura })}
                        />
                    </View>
                    <Button onPress={this.AbrirCaja} >
                        <Text>Abrir caja</Text>
                    </Button>
                    <View style={styles.footer}>
                        <Button onPress ={this.CerrarModal}>
                            <Text>Cerra</Text>
                        </Button>
                    </View> */}
                <View style={styles.ViewStyle}>
                    {/*Header generico que debe ser reutilizado en casi todas las vistas*/}
                    {/* <Header name={name} subtitle={subtitle} goBackEnabled={false} navigationEnabled={false} navigation={navigation}/> */}
                    <View style={styles.Form}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://picsum.photos/900' }} />
                            <Card.Content>
                                <TextInput
                                    style={styles.Input}
                                    mode='flat'
                                    label='Nombre De Usuario'
                                    value={this.state.NombreUsuario}
                                    onChangeText={NombreUsuario => this.setState({ NombreUsuario:NombreUsuario })}
                                />
                                <TextInput
                                    style={styles.Input}
                                    mode='flat'
                                    label='Contraseña'
                                    value={this.state.Contrasena}
                                    onChangeText={Contrasena => this.setState({Contrasena:Contrasena })}
                                />
                                <Text>{"\n"}</Text>
                                <Block row>
                                    <Text style={{color:'#000000', fontSize:12}}>¿Olvidaste la Contraseña? </Text>
                                    <TouchableOpacity>
                                        <Text style={styles.Forgot}> Haz clic aquí </Text>
                                    </TouchableOpacity>
                                </Block>
                            </Card.Content>
                            <Text>{"\n"}</Text>
                        </Card>
                        <Text>{"\n"}</Text>
                        <Block style={styles.ButtonBlock}>
                            <Button 
                                mode="contained" 
                                style={styles.Button}
                                color="#42b842"  
                                width={normalize(125)}
                                onPress={this.GetLog}
                            >
                                <Text style={{color:'#ffffff'}}>Ingresar</Text>
                        </Button>
                        </Block>
                    </View>
                </View>
            </View>
        );
    }
ValidateAbrirCaja = () =>{
    if (this.state.MontoApertura ===""){
        Alert.alert("Debe Ingresar un monto para aperturar!");
    } 
}


AbrirCaja = async () =>{
    try {
    const fecha  = new Date();
    const Model={
        MontoApertura:this.state.MontoApertura,
        FechaInicioApertura:fecha.toString(),
        UsuarioApertura:"system",
        MontoVentaTarjetaCredito:null,
        MontoVentaEfectivo:null,
        MontoVentaTotal:null,
        MontoSalidaDeCaja:null,
        UsuarioCierreCaja:null,
        FechaCierreAperturaCaja:null,
        Activo:1,
        IdEmpresa:1,
        IdSucursal:1,
        FechaCreacion: fecha.toString(),
        FechaModificacion:null,
        UsuarioCreacion:"system",
        UsuarioModificacion:null
    }
 
    return new Promise((resolve) => {

        SQLite.echoTest()
          .then(() => {
   
            console.log("Opening database ...");
            SQLite.openDatabase(
              database_name,
              database_version,
              database_displayname,
              database_size
            )
              .then(DB => {
                db = DB;
                console.log("Aqui es el fucking lio",db )
db.executeSql('INSERT INTO Caja (MontoApertura ,FechaInicioApertura, UsuarioApertura , MontoVentaTarjetaCredito ,'+
'MontoVentaEfectivo , MontoVentaTotal ,MontoSalidaDeCaja,UsuarioCierreCaja ,'+
                'FechaCierreAperturaCaja '+
                ', Activo , IdEmpresa , IdSucursal , FechaCreacion ,FechaModificacion '+
                ', UsuarioCreacion ,UsuarioModificacion ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[
                    
                    Model.MontoApertura,
                    Model.FechaInicioApertura,
                    Model.UsuarioApertura,
                    Model.MontoVentaTarjetaCredito,
                    Model.MontoVentaEfectivo,
                    Model.MontoVentaTotal,
                    Model.MontoSalidaDeCaja,
                    Model.UsuarioCierreCaja,
                    Model.FechaCierreAperturaCaja,
                    Model.Activo,Model.IdEmpresa,Model.IdSucursal,
                    Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then((result) => {
                    console.log("Database is ready ... executing query ...");
                    console.log("Se guardo en caja");
if(result[0].insertId > 0 && result[0].insertId!== undefined ){

console.log("ID activo antes de llegar",result[0].insertId )
    this.IdCajaActiva(result[0].insertId)
     this.RedirectHome();
}
   
   
                }).catch((error) =>{
                    console.log("Received error: ", error);
   
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
    console.log(ex)
  }
}

RedirectHome  =  async() =>{


    ToastAndroid.show("Caja abierta satisfactoriamente",ToastAndroid.SHORT)
    const cashierOpen = await AsyncStorage.setItem('CashierOpen',JSON.stringify({cashier:true}));
    this.props.navigation.navigate("Home")


}

IdCajaActiva = async(Id)=>{

console.log("Adentro",Id)
const IdCaja = await AsyncStorage.setItem("CajaActivaId",JSON.stringify({IdCaja:Id}))
}


AddToCashier = async(result)=>{

    this.setState({loading:true})
    const {NombrePersona, NombreUsuario, Rol, Contrasena,Pin} = result[0].rows.item(0)
    const item = await AsyncStorage.getItem('LoggedUser');
    console.log(item)
    if(item === null){
      



const UserJasonStringy =JSON.stringify({Nombre:NombrePersona,Pass:Contrasena, Usuario:NombreUsuario,Rol:Rol,Pin:Pin});
this.setState({Pin: UserJasonStringy.Pin})  
        console.log('checking')
        const addAsync = await AsyncStorage.setItem('LoggedUser', UserJasonStringy)
        const getCashierStatus = await AsyncStorage.getItem('CashierOpen');
        console.log(getCashierStatus,'Check?');
        if(getCashierStatus=== null){
            this.setState({loading:false})
            this.setState({ModalCajaVisibility:true})
        } 
        else{
            this.props.navigation.navigate("Home")
        }
    }else {
            // this.props.navigation.navigate('Home');
            const getCashierStatus = await AsyncStorage.getItem('CashierOpen');
            console.log(getCashierStatus,'Check?');
            this.setState({loading:false})
            if(getCashierStatus=== null){
                this.setState({ModalCajaVisibility:true})
            }
        }


}
GetLog = () =>{
try{
    /*
    const response  = await Empleados.findBy({
        contrasena_eq:this.state.Contrasena,
        NombreUsuario_eq:this.state.NombreUsuario
    })*/

    return new Promise( (resolve) => {

        SQLite.echoTest()
          .then(() => {
   
            console.log("Opening database ...");
SQLite.openDatabase(database_name,
              database_version,
              database_displayname,
              database_size
            )
              .then(DB => {
                db = DB;
   
db.executeSql('SELECT * FROM Empleados WHERE Activo =? AND NombreUsuario =? AND Pin =?',[1,this.state.NombreUsuario.toLocaleLowerCase(),this.state.Contrasena]).then((result) => {
                    console.log("Database is ready ... executing query ...");
   console.log(result)
if(result[0].rows.length > 0  ){


 this.AddToCashier(result);
}
   else{
    alert("El usuario no existe o contraseña invalida");
   
   }

                }).catch((error) =>{
                    console.log("Received error: ", error);
   
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
   











/*

    else{
        this.setState({loading:true})
        const {NombrePersona, NombreUsuario, Rol, Contrasena,PIN} = response
        const item = await AsyncStorage.getItem('LoggedUser');
        console.log(item)
        if(item === null){
            const rol  = await Roles.findBy({Id_eq:Rol})
            const RmenuQuery ={
                columns: 'IdMenu',
                where: {
                    RolId_eq: Rol
                },
                page: 1,
                limit: 100
            }
            const Rmenu = await RolMenu.query(RmenuQuery);
            const UserJasonStringy =JSON.stringify({
                Nombre:NombrePersona,Pass:Contrasena, Usuario:NombreUsuario,Rol:Rol, Menus:Rmenu,PIN:PIN
            });
            this.setState({
                PIN: UserJasonStringy.PIN   
            })  
            console.log('checking')
            const addAsync = await AsyncStorage.setItem('LoggedUser', UserJasonStringy)
            const getCashierStatus = await AsyncStorage.getItem('CashierOpen');
            console.log(getCashierStatus,'Check?');
            if(getCashierStatus=== null){
                this.setState({loading:false})
                this.setState({ModalCajaVisibility:true})
            } 
            else{
                this.props.navigation.navigate("Home")
            }
        }else {
                // this.props.navigation.navigate('Home');
                const getCashierStatus = await AsyncStorage.getItem('CashierOpen');
                console.log(getCashierStatus,'Check?');
                this.setState({loading:false})
                if(getCashierStatus=== null){
                    this.setState({ModalCajaVisibility:true})
                }
            }

        }

        */
        
    } catch(ex){
                console.log(ex);
            }
        }
    }

const styles = StyleSheet.create({
    TimeLb:{
        flex:1
    },
    BodyLogin:{
        flex:4,
        backgroundColor:"#403C00",
        width:normalize(350)
    },
    footer:{
        flex:1,
        backgroundColor:"#49A695"
    },
    ModalContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#E8B8A7",
        paddingTop:40                
    },
    ViewStyle:{
        backgroundColor:"#f9f9f9",
        height:normalize(700)
    },
    Button:{
        height:windowHeight * 0.06,
        marginBottom: windowHeight * 1.15
    },
    Form: {
        padding:normalize(15),
        marginTop:windowHeight * 0.01
    },  
    Input: {
        color: '#161924',
        fontSize: 14,
        fontWeight:"200",
        backgroundColor:'#FFFFFF',
        marginTop:windowHeight * 0.01,
        width:windowWidth * 0.85,
        alignSelf:'center',
    },
    Forgot:{
        color:'blue',
        fontSize:12
    },   
    ButtonBlock:{
        alignItems:'center',
    },
    userName:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16,
        marginTop:windowHeight * 0.08
    }, 
    textModal:{
        textAlign:'center',
        marginTop: windowHeight * 0.03,
        fontSize:14
    },
    Badge:{
        padding:10,
        borderRadius:15
    }
})

 
