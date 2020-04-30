import * as React from 'react';
import { Dimensions,StyleSheet,Modal, View, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Container, Header, Content,Title, Icon, List,
Card, CardItem, ListItem, Thumbnail, Text, Left, Body, 
Right, Button, Footer, FooterTab,Spinner} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import Categorias from '../../Models/Categorias'
import VentasSelectScreen from './VentasSelectScreen'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class VentasMain extends React.Component {
  constructor(props) {
    super(props);
    this.LoadCategoriaData()   
    this.state = {
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
      dataCategorias:'',
      productLoading:false,
      Categoria:{
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
      },
    };
    this._hideModal =  this._hideModal.bind(this);
    this.ventasMain =  this.ventasMain.bind(this);
    this.categoriesVisible =  this.categoriesVisible.bind(this);
    this.visibleProducts = this.visibleProducts.bind(this);
  }
  categoriesVisible = (value,loaded) => {
    console.log(value ,'checkkkkkkk')
    this.setState({
      product:value
    })
  }
  visibleProducts = () => {
    this.setState({
      product:true,
    })
  }
  LoadCategoriaData = async () =>{
    const options ={
        columns:`id,NombreCategoria,FechaCreacion`,
        where:{
        Id_gt:0
        },
        page:1,
        limit:30
    }    
  const artiobj = await Categorias.query(options) 
  let arra =[]
  this.state.HoraCreacion = ''
  artiobj.map(x => {
    const{id, NombreCategoria,FechaCreacion, Activo} = x;
    let date = FechaCreacion.split(' ');
    var objeto  ={
    key: id,
    title:NombreCategoria,
  }
  arra.push(objeto)
    });
    this.setState({dataCategorias:arra})
    this.setState({
      filterData:arra
    })
  }

  async componentDidMount() {
    const crear = await Categorias.createTable();
    this.LoadCategoriaData() 
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });

  }
  _hideModal = () => this.setState({ visible: false });
  ventasMain(){
    this.setState({
      product:false
    })
  }
  render() {
    const { dataCategorias, visible, isCash, isCard , product, productLoading } = this.state; 

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
                <Text style={{ fontSize:14,paddingLeft:windowWidth * 0.184}} note numberOfLines={1}>
                  Monto Neto:
                </Text>
                <Text style={{fontSize:14, paddingLeft:windowWidth * 0.184}} note numberOfLines={1}>
                  ITBIS:
                </Text>
                <Text style={{fontSize:16, paddingLeft:windowWidth * 0.183}}>
                  Total:
                </Text>
              </Body>        
              <Body>
                <Text style={{fontSize:14,paddingLeft:windowWidth * 0.004}} note numberOfLines={1}>
                 RD$ 1,500.00
                </Text>
                <Text style={{fontSize:14, paddingLeft:windowWidth * 0.004}} note numberOfLines={1}>
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
      {/*Payment Modal Section*/}
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