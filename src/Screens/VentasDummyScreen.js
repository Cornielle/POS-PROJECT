import React from 'react';
import { Dimensions,StyleSheet,Modal, View,Alert} from 'react-native';
import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import {TextInput,Searchbar} from 'react-native-paper';
import { Container, Header, Content,Title, Icon, List,
Card, CardItem, ListItem, Thumbnail, Text, Left, Body, 
Right, Button, Footer, FooterTab,Spinner} from 'native-base';
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
    this.state = {
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
      articulosSelected: [],
      categorias:[],
      Articulo:{
        id:0,
        NombreCategoria: '',
        Descripcion: '',
        Activo:0,
        IdEmpresa:0,  
        IdSucursal:0,
        FechaCreacion: 0,
        FechaModificacion:'',
        UsuarioCreacion:'',
        UsuarioModificacion:'',
        HoraCreacion:'',
        },
    }
    this._hideModal =  this._hideModal.bind(this);
    this.ventasMain =  this.ventasMain.bind(this);
    this.setSelection =  this.setSelection.bind(this);
  }
 async  componentDidMount() {
  await Categorias.createTable();
  const sql = `SELECT Categorias.id as id ,Articulos.id as idArticulo, Articulos.NombreArticulo as NombreArticulo,
   Categorias.NombreCategoria as NombreCategoria , Articulos.DescripcionPantalla as DescripcionPantalla,
   Articulos.PrecioVenta as PrecioVenta, 
   Articulos.CatidadExistencia as CantidadExistencia  
   from Categorias inner join Articulos on Categorias.id = Articulos.CategoriaId limit 15`
  const params = []
  const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
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
        quantitySelected:0
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
  fontload = async () =>{
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });

  }
  setSelection(id,selected,item){
    if(selected === true){
      if(item.id===id)
        this.state.articulosSelected.push(item)
    }else {
      let newArray = this.state.articulosSelected.filter(element=>element!==item)
      this.setState({
        articulosSelected:newArray
      })
    }
  }
  setQuantity(id,value){
    this.state.articulos.map(articulo=>{
      if(value > 0 && articulo.id === id){
        articulo.quantitySelected = value
      }
    })
  }
  _hideModal = () => this.setState({ visible: false });
  ventasMain(){
    this.setState({
      product:false
    })
  }


  CantidadProducto = () =>{




  }




  render() {
    console.log(this.state.QuantityValue);
    const { visible, isCash, isCard , product, searchQuery, checked } = this.state;
    if (!this.state.isReady) {
      return (
      <Container>
        <Content>
        <Spinner color="blue" style={{ marginTop: windowHeight * 0.4}} />
        </Content>
      </Container>);
    }

    {/*Products Modal Section*/}
    if (product){
      return ( 
        <VentasSelectScreen visible={this.categoriesVisible} data={dataCategorias}/> 
      )
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
              {/* <Left>
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
              </Right> */}
            </ListItem>
            <ListItem thumbnail>
              {/* <Left>
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
              </Right> */}
            </ListItem>
            </ScrollView>
          </List>
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
                 RD$ 1,500.00
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
              onPress={()=>this.visibleProducts()}>
              <Icon name="basket" />
              <Text>Articulos</Text>
            </Button>
            <Button vertical
              onPress={()=> this.setState({visible:true})}>
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
        {this.state.categorias.map(element => (
          <Tab heading={
            <TabHeading><Text>{element}</Text></TabHeading>
          }>
          {this.state.articulos.map(item=>(
          item.NombreCategoria === element &&(  
          <ListItem thumbnail>
              <Left>
              <View>
              <Checkbox 
                    style={{marginRight: windowWidth * 0.02}}
                    color="#3F51B5"
                    onChange={(selected)=> {this.setSelection(item.id,selected,item)}}    
                    initialValue={item.selected}          
                  />
                  </View>
              </Left>
              <Left>
                  <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
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
                  minValue={0}
                  onChange={(value)=>{this.setQuantity(item.id,value)}}
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