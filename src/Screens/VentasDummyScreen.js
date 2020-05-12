import React from 'react';
import { Dimensions,StyleSheet,Modal, View,Alert} from 'react-native';
import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import {TextInput,Searchbar} from 'react-native-paper';
import { Container, Header, Content,Title, Icon, List,
Card, CardItem, ListItem, Thumbnail, Text, Left, Body, 
Right, Button, Footer, FooterTab,Spinner, Tab, Tabs, TabHeading, ScrollableTab} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Categorias from "../../Models/Categorias"
import NumericInput from 'react-native-numeric-input'
import { Checkbox } from 'galio-framework';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class VentasMain extends React.Component {
  
  constructor(props) {
    super(props); 
    this._hideModal =  this._hideModal.bind(this);
    this.ventasMain =  this.ventasMain.bind(this);
  }

    fontload = async () =>{
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      this.setState({ isReady: true });
    }
 async  componentDidMount() {

  await Categorias.createTable();
  const sql =   `SELECT Categorias.id as id , Articulos.NombreArticulo as NombreArticulo  ,
   Categorias.NombreCategoria as NombreCategoria , Articulos.DescripcionPantalla as DescripcionPantalla,
   Articulos.PrecioVenta as PrecioVenta, 
   Articulos.CatidadExistencia as CantidadExistencia  
   from Categorias inner join Articulos on Categorias.id = Articulos.CategoriaId`
  const params = []
  const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
  databaseLayer.executeSql(sql, params).then(({ rows }) => {
  this.setState({ListaCategorias:rows})
    
  console.log(rows);
  } )
 //   this.LoadCategorias();
this.fontload();
  }

async LoadCategorias(){

try{
  /*
  const sql =   'SELECT * from Categorias'
  const params = []
  const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
 databaseLayer.executeSql(sql, params).then(({ rows }) => {
  this.setState({ListaCategorias:rows})

  console.log(rows);
  } )

  */
  /*

  let datosCat  = []
  const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
  databaseLayer.executeSql('SELECT * from Categorias').then(({ rows }) => {
    this.setState({ListaCategorias:rows})
  
 //   console.log(rows);
    } )
*/


} catch(ex){

  }
}
TabRender =(item) =>{
  if ( typeof item === 'undefined') {
    Alert.alert("Tou vacio");
          }
          else{
            console.log("Vine para irme")
return(
      <View>
    {
this.state.ListaCategorias.map(elemet =>(
  <Tab heading={ <TabHeading><Text>{elemet.NombreCategoria}</Text></TabHeading>}>
<ListItem thumbnail>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
              </Left>
              <Body>  
                <Text>Barbie Holiday Castaña 2018</Text>     
                <Text note numberOfLines={1}>Cant: 9999</Text>
              </Body>
              <Right>
              <Text note numberOfLines={1}>RD$ 3,400.00</Text>
              </Right>
              <Right>  
                <TouchableOpacity>     
                  <Icon name="close"/>
                </TouchableOpacity>  
              </Right>
            </ListItem>

  </Tab>
      ))
    }
    </View>)
  }
}

  _hideModal = () => this.setState({ visible: false });
  ventasMain(){
    this.setState({
      product:false
    })
  }
  state = {
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
  };

  render() {
    const { visible, isCash, isCard , product, searchQuery, checked } = this.state;
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
          <List>
          <ScrollView>
            <ListItem thumbnail>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
              </Left>
              <Body>  
                <Text>Barbie Holiday Castaña 2018</Text>     
                <Text note numberOfLines={1}>Cant: 9999</Text>
              </Body>
              <Right>
              <Text note numberOfLines={1}>RD$ 3,400.00</Text>
              </Right>
              <Right>  
                <TouchableOpacity>     
                  <Icon name="close"/>
                </TouchableOpacity>  
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
              </Left>
              <Body>  
                <Text>Barbie Holiday Castaña 2018</Text>     
                <Text note numberOfLines={1}>Cant: 9999</Text>
              </Body>
              <Right>
              <Text note numberOfLines={1}>RD$ 3,400.00</Text>
              </Right>
              <Right>  
                <TouchableOpacity>     
                  <Icon name="close"/>
                </TouchableOpacity>  
              </Right>
            </ListItem>
            </ScrollView>
          </List>
        </Card>
        <Card>
            <CardItem>
              <Body>
                <Text style={{float:'left', fontSize:14,paddingLeft:windowWidth * 0.184}} note numberOfLines={1}>
                  Monto Neto:
                </Text>
                <Text style={{float:'left', fontSize:14, paddingLeft:windowWidth * 0.184}} note numberOfLines={1}>
                  ITBIS:
                </Text>
                <Text style={{float:'left', fontSize:16, paddingLeft:windowWidth * 0.183}}>
                  Total:
                </Text>
              </Body>        
              <Body>
                <Text style={{float:'left', fontSize:14,paddingLeft:windowWidth * 0.004}} note numberOfLines={1}>
                 RD$ 1,500.00
                </Text>
                <Text style={{float:'left', fontSize:14, paddingLeft:windowWidth * 0.004}} note numberOfLines={1}>
                 RD$ 500.00
                </Text>
                <Text style={{float:'left', fontSize:16, paddingLeft:windowWidth * 0.003}}>
                 RD$ 2.00000000
                </Text>
              </Body>
            </CardItem>
          </Card>
            <Footer>
          <FooterTab>
            <Button vertical
              onPress={()=>this.setState({
                product:true
              })}>
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
      <Modal  visible={product}>
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
        {this.state.ListaCategorias.map(element => (
        <Tab heading={ <TabHeading><Text>{element.NombreCategoria}</Text></TabHeading>}>
        <ListItem thumbnail>
            <Left>
            <Checkbox 
                  style={{marginRight: windowWidth * 0.02}}
                  color="#3F51B5"
                  onPress={()=>this.setState({checked:!checked})}  
                  initialValue={checked}
                />
            </Left>
            <Left>
                <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
            </Left>
            <Body>  
              <Text>{element.NombreArticulo}</Text>     
              <Text note numberOfLines={1}>Disponibles: {element.CantidadExistencia}</Text>
              <Text note numberOfLines={1}>Precio: RD$ {element.PrecioVenta}.00</Text>
            </Body>
            <Right>  
            <NumericInput 
                totalWidth={80} 
                totalHeight={40}
                valueType={'real'}
                rounded 
              />
            </Right>
          </ListItem>
        </Tab>
          ))}
          <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
          <ListItem thumbnail>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
              </Left>
              <Body>  
                <Text>Barbie Holiday Castaña 2018</Text>     
                <Text note numberOfLines={1}>Cant: 9999</Text>
              </Body>
              <Right>
              <Text note numberOfLines={1}>RD$ 3,400.00</Text>
              </Right>
              <Right>  
                <TouchableOpacity>     
                  <Icon name="close"/>
                </TouchableOpacity>  
              </Right>
            </ListItem>
          </Tab>
          <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
          <ListItem thumbnail>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
              </Left>
              <Body>  
                <Text>Barbie Holiday Castaña 2018</Text>     
                <Text note numberOfLines={1}>Cant: 9999</Text>
              </Body>
              <Right>
              <Text note numberOfLines={1}>RD$ 3,400.00</Text>
              </Right>
              <Right>  
                <TouchableOpacity>     
                  <Icon name="close"/>
                </TouchableOpacity>  
              </Right>
            </ListItem>
          </Tab>
          <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
          <ListItem thumbnail>
            <Left>
            <Checkbox 
                  style={{marginRight: windowWidth * 0.02}}
                  color="#3F51B5"
                  onPress={()=>this.setState({checked:!checked})}  
                  initialValue={checked}
                />
            </Left>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
              </Left>
              <Body>  
                <Text>Barbie Holiday Castaña 2018</Text>     
                <Text note numberOfLines={1}>RD$ 3,400.00</Text>
              </Body>
              <Right>
              <NumericInput 
                totalWidth={80} 
                totalHeight={40}
                rounded 
              />
              </Right>
              <Right>  
              </Right>
            </ListItem>
          </Tab>
          <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
          <ListItem thumbnail>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
              </Left>
              <Body>  
                <Text>Barbie Holiday Castaña 2018</Text>     
                <Text note numberOfLines={1}>Cant: 9999</Text>
              </Body>
              <Right>
              <Text note numberOfLines={1}>RD$ 3,400.00</Text>
              </Right>
              <Right>  
                <TouchableOpacity>     
                  <Icon name="close"/>
                </TouchableOpacity>  
              </Right>
            </ListItem>
          </Tab>
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
            marginTop: windowHeight * 0.08,
            textAlign:'center',
            padding:25
        }}>
        <Icon style={styles.cashButton}type="FontAwesome5" name="credit-card" />
          {" "}Tarjeta
        </Text>
      </TouchableOpacity> 
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