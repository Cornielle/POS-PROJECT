import React from 'react';
import { Dimensions,StyleSheet,Modal, View,Alert, AsyncStorage,ToastAndroid} from 'react-native';
import * as SQLite1 from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import {TextInput,Searchbar, FAB} from 'react-native-paper';
import { Checkbox } from 'galio-framework';
import { Container, Header, Content,Title, Icon, List,
Card, CardItem, ListItem, Thumbnail, Text, Left, Body, 
Right, Button, Footer, FooterTab,Spinner, Tab, Tabs,TabHeading, ScrollableTab} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import NumericInput from 'react-native-numeric-input'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer';
 

const InitialState ={
  isCash:false,
  isCard:true, 
  IsDeposit:true,
  IdCajaActiva:0,
  MontoTarjeta:0,
  MontoEfectivo:0,
  MontoTransferencia:0,

  arrayArticulos:[]

}

export default class VentasMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IdCajaActiva:0,
      MaxId:0,
      ListaCategorias:[],
      isReady: false,
      active: false,
      visible: false,
      inputCash:true,
      inputCredit:false,
      backgroundColor:'#000000',
      isCash:false,
      isCard:true, 
      IsDeposit:true,
      product:false,
      isReady: false,
      searchQuery:'',
      loadingState:false,
      articulos:[],
      articulosSelected: [],
      categorias:[],
      MontoTarjeta:0,
      MontoEfectivo:0,
      MontoTransferencia:0,
      Articulo:{
        id:0,
        Codigo:'',
        CategoriaId: 0,
        Descripcion:'',
        Abreviatura:'',
        NombreArticulo:'',
        CodigoDeBarra:'',
        PrecioCosto:'',
        PrecioVenta:'',
        ProveedoresId:'',
        CatidadExistencia:'',
        MedidaDeVenta:'',
        Activo:'',
        IdEmpresa:0,
        IdSucursal:0,
        FechaCreacion: '',
        FechaModificacion:'',
        UsuarioCreacion:'',
        UsuarioModificacion:'',
        HoraCreacion:'',
        },
    }
    this._hideModal =  this._hideModal.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  goBack(){
    this.setState({
      product:true
    })
    
  }

state={
IdVenta:0,
ListaArti:[]

}


UnselectArticulos =() =>{


  try{
    this.state.articulos.forEach((item)=>{


item.selected = false

    });

  }
  catch(ex){

console.log(ex)

  }
}

  loadDatadd =() =>{

    var fecha = new Date();
    let db;
return new Promise((resolve) => {SQLite.echoTest().then(() => {
 console.log("Opening database ...");
SQLite.openDatabase(database_name,database_version,database_displayname,database_size).then(DB => {db = DB;
db.executeSql(`SELECT Categorias.rowid as id ,Articulos.rowid as idArticulo,
 Articulos.NombreArticulo as NombreArticulo,Categorias.NombreCategoria as NombreCategoria ,
 Articulos.Abreviatura as Abreviatura,Articulos.PrecioVenta as PrecioVenta,
 Almacen.CantidadActual as CantidadExistencia , Articulos.Img from Categorias
 inner join Articulos on Categorias.rowid = Articulos.CategoriaId inner join Almacen 
 on Articulos.rowid = Almacen.ArticuloId`
 ,[]).then((results) => {
console.log("Database is ready ... executing query ...");
 console.log("Categoria: ",results);
let arrayArticulos = []
var len = results[0].rows.length; 

 for (let i = 0; i < len; i++) {

var item=  results[0].rows.item(i);
console.log(item);
let articulos = { 
CantidadExistencia: item.CantidadExistencia,
Abreviatura: item.Abreviatura,NombreArticulo: item.NombreArticulo,
NombreCategoria: item.NombreCategoria,
PrecioVenta: item.PrecioVenta,
id: item.idArticulo,
selected:false,
quantitySelected:1,
pricePerArticle: item.PrecioVenta,
Img:item.Img
}
arrayArticulos.push(articulos) 

 }



 let categorias = [...new Set(arrayArticulos.map(item => item.NombreCategoria))];
 this.setState({categorias})
this.setState({articulos:arrayArticulos})  
console.log(JSON.parse(this.state.articulos[0].Img).uri, 'check articulos')
this.fontload();
 }).catch((error) =>{console.log("Received error: ", error);});})
.catch(error => {console.log(error);});})
.catch(error => {console.log("echoTest failed - plugin not functional");});});
  }

getVentasId = async()=>{


  const item = await AsyncStorage.getItem('CajaActivaId');


  const IdCajaventa = JSON.parse(item);

  this.setState({IdCajaActiva:IdCajaventa.IdCaja})
  

}


  GuardarVentas = (Model)=> {


try {


  let ListArticulos = []
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
db.executeSql('INSERT INTO Ventas(PrecioBruto, PrecioNeto, DescuentoAplicado, Itbis,PagoEfectivo,PagoTarjeta,PagoTransferencia,'+
'Activo ,IdAperturaCaja ,IdEmpresa , IdSucursal , FechaCreacion ,FechaModificacion,'+
'UsuarioCreacion ,UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
,[Model.PrecioBruto,Model.PrecioTotal,Model.DescuentoAplicado,Model.Itbis,Model.PagoEfectivo,
  Model.PagoTarjeta,Model.PagoTransferencia,Model.Activo,Model.IdAperturaCaja,Model.IdEmpresa,Model.IdSucursal,
  Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then((results) => {
             //   console.log("Database is ready ... executing query ...");
console.log("Se Inserto Ventas");
console.log(results);
const VentaId=  results[0].insertId;
this.setState({VentaId:VentaId})
this.state.articulos.map(item =>{
if( item.selected === true){
db.executeSql('INSERT INTO VentasDetalle (IdArticulo , PrecioaVenta ,Cantidad , IdVenta , Activo , IdAperturaCaja , IdEmpresa , IdSucursal , FechaCreacion ,FechaModificacion'+
                ', UsuarioCreacion , UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',[item.id,item.PrecioVenta,item.quantitySelected,VentaId,Model.Activo,this.state.IdCajaActiva,Model.IdEmpresa,Model.IdSucursal,
                  Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then((DetailReults) => {
console.log("Se inserto Detalle!!");
console.log("aqui el item: ",item);
                    ListArticulos.push(item); 
                  }).catch((error) =>{

                    //this.setState({ListaArti: ListArticulos})
                    console.log("Received error: ", error);
                    console.log("Database not yet ready ... populating data");
                    });
              }
             })
      
             console.log("Lo tenemos aqui", this.state.ListaArti );
             ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
             this.PrintRecipe(Model,VentaId,this.state.ListaArti ) 
             
}).catch((error) =>{
console.log("Received error: ", error);
console.log("Database not yet ready ... populating data");

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

   
  };

ClearValues = ()=>{


  this.setState({MontoEfectivo:"", MontoTarjeta:""})
this.visible = false;
  
}


 componentDidMount(){

this.VerVentas();

  this.scan();
 this.getVentasId();

  //  this.scan();
    this.connectPrint();
    //this.printtest();


   this.loadDatadd()


  }

  VerVentas = () =>{


    var fecha = new Date();
    let db;
return new Promise((resolve) => {SQLite.echoTest().then(() => {
 console.log("Opening database ...");
SQLite.openDatabase(database_name,database_version,database_displayname,database_size).then(DB => {db = DB;
db.executeSql("SELECT  * FROM Ventas",[]).then((results) => {
console.log("Database is ready ... executing query ...");
 console.log(results);

var len = results[0].rows.length;

 for (let i = 0; i < len; i++) {


  console.log("he aqui: ",results[0].rows.item(i));
 }


 }).catch((error) =>{console.log("Received error: ", error);});})
.catch(error => {console.log(error);});})
.catch(error => {console.log("echoTest failed - plugin not functional");});});



  }


  CargaUltimaVenta =async ()=>{

    const sql = `SELECT MAX(Id) as Max FROM Ventas`
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite1.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(sql, params).then(({ rows }) => {
      let arrayArticulos = []
      rows.map(item=>{
        arrayArticulos.push(item) 
      })
      
    
    this.setState({
      MaxId:arrayArticulos[0].Max
    }) 
 
    console.log("10000")
    }).then(r =>{


      console.log("Last Id",this.state.MaxId)
    });
    
  }

  scan = async () =>{

    BLEPrinter.init().then(() =>{
      BLEPrinter.getDeviceList().then(print =>{
       // console.log(print);
       console.log(print[0].inner_mac_address)
  this.setState({MacAdd:print[0].inner_mac_address});
  //console.log(this.state.MacAdd);
      })
    });
  
  
  
  
  }
  
  connectPrint =async () =>{
    const mac ="00:AA:11:BB:22:CC";
    BLEPrinter.connectPrinter(mac).then(
      (printer) => console.log(printer), 
      error => console.log(error))
  
  
  }
  
  
  
  printtest= (finalrecipe) =>{
  
try {

  BLEPrinter.printText(finalrecipe);
  BLEPrinter.printText("");
  BLEPrinter.printText("");
  BLEPrinter.printText("");
  BLEPrinter.printText("");
  BLEPrinter.printText("");
  BLEPrinter.printText("");

  this.ClearValues();
}catch(ex){



}


  }


  PrintRecipe = (Model,VentaId,ListaArti) =>{

try{
console.log("dentro de recipe",Model);
console.log("dentro de recipe",VentaId);
console.log("dentro de recipe y lista",ListaArti);

let finalrecipe ="";
ListaArti.map(item =>{

  let design = `
  D0004           {<>}           Table #: A1
  ------------------------------------------
  [ ] ${item.NombreArticulo}
      - No sugar, Regular 9oz, Hot
                                {H3} {R} x ${item.can}
  ------------------------------------------

   
  `;

finalrecipe+=design;

});

console.log(finalrecipe);
 
this.printtest(finalrecipe);

this.setState(InitialState);
this.UnselectArticulos();
} catch(ex){

  console.log(ex)
}


  }

CalcMontoFinal = () =>{

try{
  console.log("Cargando Monto");

let totalAmbos = (this.state.MontoEfectivo+this.state.MontoTarjeta + this.state.MontoTransferencia);

console.log("totalAmbos: ",totalAmbos)
console.log("sum: ",this.sum())

if(totalAmbos< this.sum()){

Alert.alert("El monto es menor");


return 0;

}

else{

return 1;

}


}

catch(ex){

console.log(ex);

}
}


   Pagar = async () =>{

try{




  if(this.state.isCard === true && this.state.isCash===true && this.state.IsDeposit ===true){

Alert.alert("Debe tener al menos 1 metodo de pago seleccionado");
return;

  }


  

 if(this.CalcMontoFinal()===0){


Alert.alert("El monto pagado no puede ser menor al pagar");
return;

 }   else {

  const Caja = await AsyncStorage.getItem("CajaActivaId");


  const LoggedUser = await AsyncStorage.getItem('LoggedUser');

  
 const  sucu =  await AsyncStorage.getItem('SucursalTemp');

 const emp = await AsyncStorage.getItem('EmpresaTemp');
 

  const AperturaUsuario = JSON.parse(LoggedUser);
  const sucursal = JSON.parse(sucu);
  const empresa = JSON.parse(emp);
const CajaActiva = JSON.parse(Caja);
  const SelectedProduct =[];

  let total =0;

  const Itbis = 18;
  const Descuento =0;
 this.state.articulos.map(item=>{
   if(item.selected=== true){
total += (item.quantitySelected * item.PrecioVenta);
SelectedProduct.push(item)
   }

 });

const porcItbis= ((total*Itbis)/100);

console.log("el precio a introducir",porcItbis);
 this.setState({ListaArti:SelectedProduct})
 const fecha = new Date();
 const ventasItem ={
   PrecioBruto:total,
   PrecioTotal:(porcItbis+total),
   DescuentoAplicado:Descuento,
   PagoEfectivo:this.state.MontoEfectivo,
   PagoTarjeta:this.state.MontoTarjeta,
   PagoTransferencia:this.state.MontoTransferencia,
   Itbis:Itbis,
   Activo:1,
   IdAperturaCaja:CajaActiva.IdCaja,
   IdEmpresa:empresa.Empresa,
   IdSucursal:sucursal.Sucursal,
   FechaCreacion: fecha.toString(),
   FechaModificacion:null,
   UsuarioCreacion:AperturaUsuario.Usuario,
   UsuarioModificacion:null
   
  }
  this.GuardarVentas(ventasItem);


 }

}

catch(ex){

console.log(ex);

}


   }

   sum = () =>{

let PrecioTotal=[]

  const array =  this.state.articulos.map(item =>{
if( item.selected === true){
  PrecioTotal.push((item.quantitySelected * item.PrecioVenta)) ;

}


  })

  
  const preciotot = PrecioTotal.reduce((a, b) => a + b, 0);

  return preciotot ;
 
}
  fontload = async () =>{
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  _hideModal = () => this.setState({ visible: false });
  // setArticulos = () => {
  //   console.lodg("articulos")
  // }
  render() {

    const { visible, isCash, isCard ,IsDeposit, product, searchQuery,articulos } = this.state;
    if (!this.state.isReady) {
      return (
      <Container>
        <Content>
        <Spinner color="blue" style={{ marginTop: windowHeight * 0.4}} />
        </Content>
      </Container>);
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button
             onPress={()=>this.props.navigation.navigate('Home')}
             transparent>
              <Icon name='arrow-back' /> 
            </Button>
          </Left>
          <Right>
            <Title style={{fontSize:20}}>Punto de Ventas</Title>
          </Right>
          <Right>
            <Button
            onPress={this.props.navigation.openDrawer} 
            transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      <Content>
        <Card style={{height:windowHeight * 0.6536}}>
          <ScrollView>
              {articulos.map(item=>(
              item.selected === true &&(  
              <ListItem thumbnail>
                  <Left>
                  <Thumbnail circle source={{ 
                        uri: JSON.parse(item.Img).uri 
                      }} />
                  </Left>
                  <Body>  
                    <Text>{item.NombreArticulo}</Text>   
                    <Text>{item.Img.uri}</Text>     
                  </Body>
                  <Right>
                    <Text note numberOfLines={1}>Cantidad: {item.quantitySelected}</Text>
                    <Text note numberOfLines={1}>Precio: RD$ {item.pricePerArticle}</Text>
                  </Right>
                </ListItem>)
              ))}
              </ScrollView>
          </Card>
        <Card>
            <CardItem>
              <Body>
                <Text style={{ fontSize:14,paddingLeft:windowWidth * 0.184}} note numberOfLines={1}>
                  Monto Neto:
                </Text>
                <Text style={{ fontSize:14, paddingLeft:windowWidth * 0.184}} note numberOfLines={1}>
                  ITBIS:
                </Text>
                <Text style={{ fontSize:16, paddingLeft:windowWidth * 0.183}}>
                  Total:
                </Text>
              </Body>        
              <Body>
                <Text style={{ fontSize:16,paddingLeft:windowWidth * 0.004}} note numberOfLines={1}>
                
                </Text>
       
             
                <Text style={{ fontSize:16, paddingLeft:windowWidth * 0.003}}>
                 RD$ 2.00000000
                </Text>
    
                <Text style={{ fontSize:16, paddingLeft:windowWidth * 0.003}}>
                {this.sum()}
                </Text>


              </Body>
            </CardItem>
          </Card>
            <Footer>
          <FooterTab>
            <Button vertical
              onPress={()=>this.goBack()}>
              <Icon name="basket" />
              <Text>Articulos</Text>
            </Button>
            <Button vertical
              onPress={()=>this.setState({
                visible:true
              })}>
              <Icon type="FontAwesome5" name="cash-register" />
              <Text>Pagar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Content>
      <Modal visible={product}>
          <Container>
            <Header hasTabs>
              <Left>
                <Button
                  onPress={()=>this.setState({
                    product:false
                  })}
                transparent>
                  <Icon name='arrow-back' /> 
                </Button>
              </Left>
              <Body>
                <Title style={{fontSize:20}}>Escoger Articulos</Title>
              </Body>
            </Header>
            <Searchbar
                placeholder="Buscar por Código/Artículo"
                onChangeText={this._onChangeSearch}
                value={searchQuery}  
            />
            <Tabs renderTabBar={() => <ScrollableTab/>}>
            {this.state.categorias.map(element => (
              <Tab heading={
                <TabHeading><Text>{element}</Text></TabHeading>
              }>
              {articulos.map(item=>(
              item.NombreCategoria === element &&(  
              <ListItem thumbnail>
                  <Left>
                    <Checkbox
                      style={{marginRight:6}}
                      value={this.state.checked}
                      onChange={(selected) => {
                        item.selected = selected
                      }}
                    />
                  </Left>
                  <Left>
                      <Thumbnail circle source={{ 
                        uri: JSON.parse(item.Img).uri 
                      }} />
                  </Left>
                  <Body>  
                    <Text>{item.NombreArticulo}</Text>     
                    <Text note numberOfLines={1}>Disponibles: {item.CantidadExistencia}</Text>
                    <Text note numberOfLines={1}>Precio: RD$ {item.PrecioVenta}.00</Text>
                  </Body>
                  <Right>
                  <NumericInput
                      totalWidth={80} 
                      totalHeight={40}
                      valueType={'real'}
                      disable={true}
                      minValue={1}
                      initValue={1}
                      onChange={(quantity) => {
                        item.quantitySelected = quantity, 
                        item.pricePerArticle = (item.quantitySelected * item.PrecioVenta),
                        item.quantityLeft = item.CantidadExistencia - quantity
                      }}
                      rounded 
                    />
                  </Right>
                </ListItem>)
                ))}
              </Tab>
              ))}
            </Tabs>
          </Container>
      </Modal>
      <Modal visible={visible}>
      <Header>
          <Left>
            <Button
              onPress={()=>this.setState({
                visible:false
              })}
             transparent>
              <Icon name='arrow-back' /> 
            </Button>
          </Left>
          <Right>
            <Button
            onPress={this.props.navigation.openDrawer} 
            transparent>
            <Title style={{fontSize:20}}>Proceder</Title>
            </Button>
          </Right>
        </Header>
        <View style={styles.modalBox}>
        <Text style={styles.modalTitle}> {this.sum()}</Text>
        <Text style={styles.modalSubTitle}>Monto a pagar</Text>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Monto Efectivo'
            value=''
            disabled={isCash}
            value={this.state.MontoEfectivo}
            onChangeText={(MontoEfectivo)=> this.setState({MontoEfectivo})}
            keyboardType="numeric"
          />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Monto Tarjeta'
            value={'600'}
            disabled={isCard}
            value={this.state.MontoTarjeta}
            onChangeText={(MontoTarjeta)=> this.setState({MontoTarjeta})}
            keyboardType="numeric"
          />

<TextInput
            style={styles.Input}
            mode='flat'
            label='Monto Transferencia'
            value={'600'}
            disabled={IsDeposit}
            value={this.state.MontoTransferencia}
            onChangeText={(MontoTransferencia)=> this.setState({MontoTransferencia})}
            keyboardType="numeric"
          />
      <TouchableOpacity >
        <Text 
          onPress={()=>{this.setState({isCash:!isCash})}} 
          style={{
            marginTop: windowHeight * 0.04,
            backgroundColor:!isCash? '#6be585' : '#f9f9f9',
            textAlign:'center',
            padding:5
        }}>
        <Icon style={styles.cashButton}type="FontAwesome5" name="money-bill" />
          {" "}Efectivo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text 
          onPress={()=>{this.setState({isCard:!isCard})}} 
          style={{
            marginTop: windowHeight * 0.04,
            backgroundColor:!isCard? '#6be585' : '#f9f9f9',
            textAlign:'center',
            padding:5
        }}>
        <Icon style={styles.cashButton}type="FontAwesome5" name="credit-card" />
          {" "}Tarjeta
        </Text>
      </TouchableOpacity> 

      <TouchableOpacity>
        <Text 
          onPress={()=>{this.setState({IsDeposit:!IsDeposit})}} 
          style={{
            marginTop: windowHeight * 0.04,
            backgroundColor:!IsDeposit? '#6be585' : '#f9f9f9',
            textAlign:'center',
            padding:5,
            marginBottom: windowHeight * 0.04,
        }}>
        <Icon style={styles.cashButton}type="FontAwesome5" name="credit-card" />
          {" "}Transferencia
        </Text>
      </TouchableOpacity> 


      <Button Title="Pagar" onPress={this.Pagar} style={{justifyContent:"center"}}  >
<Text>Pagar</Text>
        </Button>

     
      </View>
      </Modal>
    </Container>
    )};
  }
const styles = StyleSheet.create({
  Input: {
    color: '#000000',
    fontSize: 14,
    fontWeight:"500",
    backgroundColor:'#FFFFFF',
  }, 
  modalBox:{
    marginTop:15
  },
  modalTitle:{
    textAlign:'center',
    fontSize:26,
    color:'#090909'
  },
  modalSubTitle:{
    textAlign:'center',
    fontSize:18,
    color:'#2F4F4F'
  },
  cashButton:{
    color:'#2F4F4F',
    fontSize: 20,   
    textAlign:'center'
  },
  textCashButton:{
    color:'#2F4F4F',
    fontSize: 18,   
    textAlign:'center'
  },
  cashBox:{
    marginTop: windowHeight * 0.08,
    backgroundColor: '#f9f9f9',
    padding:25
  },
})