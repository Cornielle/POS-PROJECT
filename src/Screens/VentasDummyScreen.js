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

import Categorias from "../../Models/Categorias"
import NumericInput from 'react-native-numeric-input'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
import Ventas from '../../Models/Ventas'
import VentasDetalle from '../../Models/VentasDetalle'
import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
//var db = openDatabase({ name: 'PuntoVenta.db' });
import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer';
 
const design = `
D0004           {<>}           Table #: A1
------------------------------------------
[ ] {Espresso}
    - No sugar, Regular 9oz, Hot
                              {H3} {R} x 1
------------------------------------------
[ ] Blueberry Cheesecake
    - Slice
                              {H3} {R} x 1
 
{QR[Where are the aliens?]}
`;
export default class VentasMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      product:false,
      isReady: false,
      searchQuery:'',
      loadingState:false,
      checked:false,
      mainTotal:[],
      articulos:[],
      articulosSelected: [],
      categorias:[],
      Articulo:{
        id:0,
        Codigo:'',
        CategoriaId: 0,
        Descripcion:'',
        DescripcionPantalla:'',
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

  loadDatadd =() =>{


    console.log("")
    console.log("")

    console.log("/*********************************weooo*******************************************/");
    console.log("")
    console.log("")
    var fecha = new Date();
    let db;
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
     
              db.executeSql("SELECT Categorias.rowid as id ,Articulos.rowid as idArticulo, Articulos.NombreArticulo as NombreArticulo,Categorias.NombreCategoria as NombreCategoria , Articulos.DescripcionPantalla as DescripcionPantalla,Articulos.PrecioVenta as PrecioVenta, Almacen.CantidadActual as CantidadExistencia  from Categorias inner join Articulos on Categorias.rowid = Articulos.CategoriaId inner join Almacen on Articulos.rowid = Almacen.ArticuloId",[]).then((results) => {
                  console.log("Database is ready ... executing query ...");
 
console.log(results);

let arrayArticulos = []
var len = results[0].rows.length;

 for (let i = 0; i < len; i++) {

var item=  results[0].rows.item(i);
let articulos = {   
  CantidadExistencia: item.CantidadExistencia,
  DescripcionPantalla: item.DescripcionPantalla,
  NombreArticulo: item.NombreArticulo,
  NombreCategoria: item.NombreCategoria,
  PrecioVenta: item.PrecioVenta,
  id: item.idArticulo,
  selected:false,
  quantitySelected:1,
  pricePerArticle:item.PrecioVenta
}
arrayArticulos.push(articulos) 


 }


 let categorias = [...new Set(arrayArticulos.map(item => item.NombreCategoria))];
 this.setState({
   categorias  
 })

 console.log(categorias)
 this.setState({
  articulos:arrayArticulos
})  
this.fontload();
 
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

  GuardarVentas = (Model)=> {
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
              db.executeSql('INSERT INTO Ventas(PrecioNeto, PrecioTotal'+
              ', DescuentoAplicado, Itbis'
              +', Activo , IdEmpresa , IdSucursal , FechaCreacion ,FechaModificacion '+
              ', UsuarioCreacion ,UsuarioModificacion ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
              ,[Model.EsPersonaFisica,Model.NombreProveedor,Model.RNC,Model.Direccion,
                Model.Telefono,Model.Correo,Model.Activo,Model.IdEmpresa,Model.IdSucursal,
                Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                  console.log("Database is ready ... executing query ...");
                  ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)

db.executeSql("SELECT * from Ventas").then((rows) =>{

console.log(resulst);


})



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
  };

/*
  loadData =  async() =>{
    const sql = `SELECT Categorias.rowid as id ,Articulos.rowid as idArticulo, Articulos.NombreArticulo as NombreArticulo,
    Categorias.NombreCategoria as NombreCategoria , Articulos.DescripcionPantalla as DescripcionPantalla,
    Articulos.PrecioVenta as PrecioVenta, 
    Articulos.CatidadExistencia as CantidadExistencia  
    from Categorias inner join Articulos on Categorias.id = Articulos.CategoriaId`
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite1.openDatabase('PuntoVentaDb.db'))
    databaseLayer.executeSql(sql, params).then(({ rows }) => {
      let arrayArticulos = []
      rows.map(item=>{
        let articulos = {   
          CantidadExistencia: item.CantidadExistencia,
          DescripcionPantalla: item.DescripcionPantalla,
          NombreArticulo: item.NombreArticulo,
          NombreCategoria: item.NombreCategoria,
          PrecioVenta: item.PrecioVenta,
          id: item.idArticulo,
          selected:false,
          quantitySelected:1,
          pricePerArticle:item.PrecioVenta
        }
        arrayArticulos.push(articulos) 
      })
      this.setState({
        articulos:arrayArticulos
      })  
    let categorias = [...new Set(rows.map(item => item.NombreCategoria))];
    this.setState({
        categorias  
      })
    })
    this.fontload();
  }

*/

 componentDidMount(){

  // this.CreateCategoria();

  //  this.scan();
   // this.connectPrint();
    //this.printtest();

    /*
    const sqlStock = 'SELECT name FROM sqlite_master WHERE type = "table"'
const paramsStock = [];
const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {

 console.log(rows)
} ) 
*/
   this.loadDatadd()

  //  this.CargaUltimaVenta();

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
       //console.log(print[0].inner_mac_address)
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
  
  
  
  printtest= () =>{
  
    BLEPrinter.printText(design);
    BLEPrinter.printText("");
    BLEPrinter.printText("");
    BLEPrinter.printText("");
    BLEPrinter.printText("");
    BLEPrinter.printText("");
    BLEPrinter.printText("");
  }


   Pagar = async () =>{



try{
 
   

  const SelectedProduct =[];

  let total =0;

 this.state.articulos.map(item=>{
   if(item.selected=== true){

total += (item.quantitySelected * item.PrecioVenta);
SelectedProduct.push(item)
   }





 });

 const fecha = new Date();
 const ventasItem ={
   PrecioNeto:total,
   
   PrecioTotal:total ,
   DescuentoAplicado:"10",
   Itbis:18,

   Activo:1,
   IdEmpresa:1,
   IdSucursal:1,
   FechaCreacion: fecha.toString(),
   FechaModificacion:null,
   UsuarioCreacion:"system",
   UsuarioModificacion:null
   
  }
  //console.log(ventasItem);
  /*
 const ll = await Ventas.create(ventasItem)

 console.log(ll);


 const sqlStock = "SELECT * FROM Ventas"
const paramsStock = [1];
const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {

 console.log(rows)
} ) 

*/
/*

const sql = `SELECT MAX(Id) as Max FROM Ventas`
const params = []
const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
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

  let VentasDetalleItem ={


    IdArticulo:SelectedProduct[0].id,
    PrecioArticulo:SelectedProduct[0].PrecioVenta,
    Cantidad:SelectedProduct[0].quantitySelected,
    IdAperturaCaja:1,
    IdVenta:this.state.MaxId,
    Activo:1,
      IdEmpresa:1,
      IdSucursal:1,
      FechaCreacion: fecha.toString(),
      FechaModificacion:null,
      UsuarioCreacion:"system",
      UsuarioModificacion:null
   
   
   
   
   };
  
  console.log(VentasDetalleItem)
  
   this.GuardarVentaDetalle(VentasDetalleItem);
 
});


//SelectedProduct.map( x =>{

/*
let VentasDetalleItem ={


 IdArticulo:x.id,
 PrecioArticulo:x.PrecioVenta,
 Cantidad:x.quantitySelected,
 IdAperturaCaja:1,
 IdVenta:this.state.MaxId,
 Activo:1,
   IdEmpresa:1,
   IdSucursal:1,
   FechaCreacion: fecha.toString(),
   FechaModificacion:null,
   UsuarioCreacion:"system",
   UsuarioModificacion:null




};
*/




//});

/*
const sqlStock = "SELECT * FROM VentasDetalle"
const paramsStock = [];
const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {

 console.log(rows)
} ) 

*/
}

catch(ex){

console.log(ex);

}





   







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
    const { visible, isCash, isCard , product, searchQuery,articulos } = this.state;
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
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' 
                      }} />
                  </Left>
                  <Body>  
                    <Text>{item.NombreArticulo}</Text>     
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
                <Text style={{ fontSize:14,paddingLeft:windowWidth * 0.004}} note numberOfLines={1}>
                    {}
                </Text>
                <Text style={{ fontSize:14, paddingLeft:windowWidth * 0.004}} note numberOfLines={1}>
                 RD$ 500.00
                </Text>
                <Text style={{ fontSize:16, paddingLeft:windowWidth * 0.003}}>
                 RD$ 2.00000000
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
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' 
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
        <Text style={styles.modalTitle}>RD$ 100.00</Text>
        <Text style={styles.modalSubTitle}>Monto Total</Text>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Monto Efectivo'
            value=''
            disabled={isCash}
          />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Monto Tarjeta'
            value={'600'}
            disabled={isCard}
          />
      <TouchableOpacity >
        <Text 
          onPress={()=>{this.setState({isCash:!isCash})}} 
          style={{
            marginTop: windowHeight * 0.08,
            backgroundColor:!isCash? '#6be585' : '#f9f9f9',
            marginTop: windowHeight * 0.08,
            textAlign:'center',
            padding:25
        }}>
        <Icon style={styles.cashButton}type="FontAwesome5" name="money-bill" />
          {" "}Efectivo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text 
          onPress={()=>{this.setState({isCard:!isCard})}} 
          style={{
            marginTop: windowHeight * 0.08,
            backgroundColor:!isCard? '#6be585' : '#f9f9f9',
            textAlign:'center',
            padding:25
        }}>
        <Icon style={styles.cashButton}type="FontAwesome5" name="credit-card" />
          {" "}Tarjeta
        </Text>
      </TouchableOpacity> 

      <Button Title="Pagar" onPress={this.Pagar}  >
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
    marginTop:60
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