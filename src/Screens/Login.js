import React, { Component } from 'react';
import { TextInput, Button, Card, Badge  } from 'react-native-paper';
import { StyleSheet, Text, View, AsyncStorage, Alert, ToastAndroid, Modal} from 'react-native';
import { Header, Container, Left, Body, Icon, Title, Spinner, Content,
    ListItem, Thumbnail,Right } from 'native-base';
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
        PIN:"",
        loading:false
          };
  componentDidMount(){
    const item =  AsyncStorage.getItem('LoggedUser');
    this.verifyLog()
    const fecha  = new Date();
    const date = fecha.toString().split(' ')
    this.setState({FechaApertura:`${date[2]}/${date[1]}/${date[3]}` })
    this.LoadAllData();
} 
LoadAllData = async () =>{
Caja.createTable();
/*
const sqlStock = 'SELECT name FROM sqlite_master WHERE type = "table"'
const paramsStock = [];
const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {

 console.log(rows)
} ) 
*/
/*
const sqlStock = "SELECT * FROM Caja WHERE Activo=?"
const paramsStock = [1];
const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {

 console.log(rows)
} ) 
*/
   // const sqlRol = 'PRAGMA table_info(Proveedores);'



 
/*
    Acciones.createTable();
    Articulos.createTable();
    Categorias.createTable();
    Empleados.createTable();
    Logs.createTable();
    Menu.createTable();
    MenuAcciones.createTable();
    Proveedores.createTable();
    Roles.createTable();
    RolMenu.createTable();
    Stock.createTable();
    Usuario.createTable();
    Caja.create();

  */

} 


verifyLog = async () =>{

try{
   const item = await AsyncStorage.getItem('LoggedUser');
   if(item !==null){
    const JsonUsuario = JSON.parse(item);
    this.setState({
        NombreUsuario: JsonUsuario.Usuario,
        LockModalVisibility:true,
        Unlockpass:JsonUsuario.PIN
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
    const InsevCaja={
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
    const response = await Caja.create(InsevCaja);
    if (Object.keys(response).length <=0){
        Alert.alert("Error al insertar en la base de datos");
    }
    else{
        // ToastAndroid.show("Caja abierta satisfactoriamente",ToastAndroid.SHORT)
        const cashierOpen = await AsyncStorage.setItem('CashierOpen',JSON.stringify({cashier:true}));
        this.props.navigation.navigate("Home")
    }
}
  catch(ex){
    console.log(ex)
  }
}
GetLog = async () =>{
try{
    const response  = await Empleados.findBy({
        contrasena_eq:this.state.Contrasena,
        NombreUsuario_eq:this.state.NombreUsuario
    })
    if(response ===null || Object.keys(response).length <=0){
        alert("El usuario no existe o contraseña invalida");
    }
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

 
