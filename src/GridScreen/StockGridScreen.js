import React from 'react';
import { ListItem } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text, Image,ScrollView} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import Stock from '../../Models/Stock';
import StockScreen from '../Screens/StockScreen';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
export default class StockGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadStockData()  
        this.editField = this.editField.bind(this);
        this._showMenu = this._showMenu.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.stateArticle =  this.stateArticle.bind(this)
      }
      state = { 
        modalVisible:false,
        visible:false,
        checked:'unchecked',
        index:0,
        ModalVisibility:false,
        data:[],
        optionArray: [
          'Detalle',
          'Activar',
          'Editar',
          'Cancel'
        ],
        addRecord:false,
        modalTitle:'',
        filterData:[],
        newData:'',
        text:'',
        editFields:false,
        Stock:{
            id:0,
            ArticuloId:0,
            CantidadExistencia:0,
            Activo:0,
            IdEmpresa:0,
            IdSucursal:0,
            FechaCreacion: '',
            FechaModificacion:'',
            UsuarioCreacion:'',
            UsuarioModificacion:''
        },
    };
  _showModal = () => this.setState({visible:true})
  _hideModal = () => this.setState({visible:false})

  LoadStockData = async () =>{
      let db;
      let artiobj = []
      let arra =[]
      new Promise((resolve) => {
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
            ).then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql(`SELECT * FROM Almacen ORDER BY rowid ASC`,[]).then((result) => {
                console.log(result)
                 for (let i = 0; i < result[0].rows.length; i++) {
                   let row = result[0].rows.item(i);
                   artiobj.push(row);
                 }
                 console.log('Almacen Data:',artiobj)
                 this.state.HoraCreacion = ''
                 artiobj.map(x => {
                  const{id, FechaCreacion, CantidadExistencia,Activo} = x;
                  console.log(FechaCreacion)
                  let date = FechaCreacion.split(' ');
                  var objeto  ={
                  key: id,
                  FechaCreacion:`${date[2]}/${date[1]}/${date[3]}` ,
                  HoraCreacion: date[4][0]+date[4][1] > 11 && date[4][0]+date[4][1] < 23 ? `${ date[4]}PM` :`${ date[4]}AM`,
                  avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                  subtitle: CantidadExistencia,
                  estado: Activo ?true: false
                 }
                 arra.push(objeto)
                 });
                 this.setState({data:arra})
                 this.setState({
                   filterData:arra
                 })
                 console.log(this.state.data, 'here in stock')
            }).catch((error) =>{      
            console.log("Error a cargar datos", error);  
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

  async  componentDidMount(){
    this.setState({
      state:this.state
    })
    this.LoadStockData()  
  }
  saveEdit = async () =>{ 
    const props =  {
      id:this.state.Stock.id,
      ArticuloId:this.state.Stock.ArticuloId,
      CantidadExistencia:this.state.Stock.CantidadExistencia,
      Activo:this.state.Stock.Activo,
      IdEmpresa:this.state.Stock.IdEmpresa,
      IdSucursal:this.state.Stock.IdSucursal,
      FechaCreacion: this.state.Stock.FechaCreacion,
      FechaModificacion:this.state.Stock.FechaModificacion,
      UsuarioCreacion:this.state.Stock.UsuarioCreacion,
      UsuarioModificacion:this.state.Stock.UsuarioModificacion
  
    }
   const saving = await Stock.update(props)
  }

  FillStock = async (id) =>{
    try{
      const {key} = id;
      const Articulo = await Stock.find(key)
      this.setState({Stock})
    }
    catch(ex){
    Alert.alert("Ha ocurrido el siguiente error: "+ex);
    }
  }

  stateArticle = async (id) =>{ 
    const savingState= await Stock.find(id)
    savingState.Activo = this.state.data[this.state.index]['estado'] ? 1:0
    savingState.save()
    console.log(savingState, 'i can fly on')
  }
_toggleForm(addRecord){
  if(addRecord===false){
    this.setState({
      addRecord:false,
    })
    this.LoadStockData()  
  }
}
_showMenu(index){
  this.setState({index})
  this.state.data[index]['estado']
  ? this.state.optionArray[1] = 'Desactivar' 
  : this.state.optionArray[1] = 'Activar'  
}
_makeAction(action){ 
  const idIndex = (this.state.index);
  const id = this.state.data[idIndex];
  this.setState({modalTitle:''})
  switch(action){
    case 0:
      this.FillStock(id)
      this.setState({
        modalTitle:'Detalles Stock',
        editFields:true
      })
      this._showModal()
      break
    case 1:
      this.state.data[this.state.index]['estado'] = !this.state.data[this.state.index]['estado']
      this.setState({ state: this.state });
      this.stateArticle(id.key)
      break
    case 2:
      this.FillStock(id)
      this.setState({
        modalTitle:'Editar Stock',
        editFields:false
      })
      this._showModal()
      break
    default:
      break
  }
}
handleSearch = (text) => {
  const filterData = this.state.data.filter(x => String(x.name).includes(text));
  this.setState({ filterData, text})
}
handleEnd = () => {
  this.setState(state=>{page: this.state.page + 1});
}
setModalVisible(visible) {
  this.setState({modalVisible: visible});
    this.ActionSheet.show();
}
editField = (fieldValue, name) =>{

     if(name==='CantidadExistencia'){
      this.setState({CantidadExistencia:fieldValue})
      this.state.Stock.CantidadExistencia = fieldValue
    } 
    if(name==='Nombre'){
      this.setState({CantidadExistencia:fieldValue})
      this.state.Stock.CantidadExistencia = fieldValue
    } 
}
render(){
const {name, subtitle, navigation} = this.props
const {visible, editFields} = this.state
return(
<View>
{this.state.addRecord !== true && (
  <ScrollView style={{height:800, zIndex:-50}}>
  <View style={{  zIndex:-1}}>
  <Modal visible={visible}>
  <View style={styles.Form}> 
  <Card>
  <ScrollView >
  <ModalControls modalTitle={this.state.modalTitle} hideModal={this._hideModal} isEdit={editFields} saveEdit={this.saveEdit}/>
      <Card.Content  style={styles.cardContent}>
      <View style={styles.Boxone}>
          <Image style={styles.ImageBox} source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
          <View style={styles.fabIcon}>
          <FAB
            icon="camera"
            color="#fff"
            style={styles.fabImage}
            onPress={() => console.log('open imagen')} 
            />
          </View> 
      </View>
      <Card style={styles.cardDescription}>
        </Card>
      </Card.Content>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Nombre'
            value={this.state.Stock.Nombre? this.state.Stock.Nombre : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreStock)=> this.editField(NombreStock, 'NombreStock')}
            />
                <TextInput
            style={styles.Input}
            mode='flat'
            label='Cantidad'
            value={this.state.Stock.CantidadExistencia? this.state.Stock.CantidadExistencia : 'Cargando...'}
            disabled={editFields}
            editable={true} />

            {this.state.editFields &&
            <View>
                  <TextInput
              style={styles.Input}
              mode='flat'
              label='Usuario Creación'
              value={this.state.Stock.UsuarioCreacion? this.state.Stock.UsuarioCreacion : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(UsuarioCreacion) => this.editField( UsuarioCreacion, 'UsuarioCreacion')}
              />
                  <TextInput
              style={styles.Input}
              mode='flat'
              label='Usuario Modificación'
              value={this.state.Stock.UsuarioModificacion? this.state.Stock.UsuarioModificacion : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(UsuarioModificacion) => this.editField( UsuarioModificacion,'UsuarioModificacion')}
              />
            </View>
            }
        </ScrollView>
    </Card>
  </View>
  </Modal>
    <HeaderGrid 
      name={name} 
      subtitle={subtitle} 
      goBackEnabled={true} 
      navigationEnabled={true} 
      navigation={navigation}
      gridHeader={false}
    />
    <Searchbar
      searchIcon={{ size: 24 }}
      onChangeText={this.handleSearch}
      placeholder="Escribe aqui..."
      value={this.state.text}
    />
      <View style={{zIndex:-2,height:normalize(500)}}>
        <FlatList
          data={this.state.filterData}
          keyExtractor={(x,i) => i}
          renderItem={({ item, index }) =>
            <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}            
          >
            <ListItem 
              style={{zIndex:-2}}
              onPress={() => this._showMenu(index)}
              leftAvatar={{ source: { uri: item.avatar_url } }}
              rightAvatar={ 

                <View>                 
                  {item.estado === true ? <Badge>Activado</Badge> : <Badge>Desactivado</Badge>}
                <Text>Fecha de Creación:{"\n"}
                <Icon
                  name="calendar-check-o"
                  size={15}
                  color="rgba(0, 0, 0, .5)"
                />{" "}
                  <Text style={{fontSize:12, color:'rgba(0, 0, 0, .5)'}}>
                    {item.FechaCreacion}
                  </Text>
                </Text>
                <Text>Hora de Creación:{"\n"}
                <Icon
                  name="clock-o"
                  size={15}
                  color="rgba(0, 0, 0, .5)"
                />{" "}
                  <Text style={{fontSize:12, color:'rgba(0, 0, 0, .5)'}}>
                    {item.HoraCreacion}
                  </Text>
                </Text>
              </View>
              }
              title={item.name}
              subtitle={item.subtitle}
              bottomDivider
            />
              </TouchableOpacity>
            }
          /> 
        </View>
        <ActionSheet
          onPress={(index) => this._makeAction(index)}
          ref={o => (this.ActionSheet = o)}
          //Title of the Bottom Sheet
          title={'¿Que deseas hacer?'}
          //Options Array to show in bottom sheet
          options={this.state.optionArray}
          //Define cancel button index in the option array
          //this will take the cancel option in bottom and will highlight it
          cancelButtonIndex={3}
          //If you want to highlight any specific option you can use below prop
          destructiveButtonIndex={1}
        />
      </View>
      <View style={styles.fab}>
          <FAB
            icon="plus"
            color="#fff"
            onPress={() => this.setState({addRecord:true})} 
            />
          </View> 
      </ScrollView>
      )
    }
      {this.state.addRecord === true  
        &&(<StockScreen navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
      }
    </View>
    );
  } 
}
const styles = StyleSheet.create({
  Input: {
    color: '#000000',
    fontSize: 14,
    fontWeight:"500",
    backgroundColor:'#FFFFFF',
},
Form: {
  padding:normalize(15),
  marginBottom:10,
  zIndex:-1,
},
ModalStyle:{
flex:1,
},
fab: {
  position:'absolute',
  top:normalize(550),
  bottom:5,
  left:normalize(170),
  width:normalize(52),
  zIndex:11
},
ImageBox:{
  width:160,
  height:160,
  borderRadius:normalize(160/2),
  borderWidth:1,
  marginBottom:normalize(30),
  },
  Boxone:{
    justifyContent:"center",
    alignItems:"center",
    height:normalize(200)
 },
  cardContent:{
    backgroundColor: '#0b8793'
  },
  Boxtwo:{
    flex:4,
    backgroundColor:"blue"
  },
  modalTitle:{
    fontSize:18,
    marginTop:10,
    fontFamily:'Roboto',
    textAlign:'center',
    fontWeight:"bold",
    color:'white'
  },       
  fabIcon:{
    position:'relative',
    bottom:normalize(80),
    left:normalize(50), 
    paddingBottom:2
  },
  fabImage: {
    alignItems:'center',
  },
  cardDescription:{
    marginBottom:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation:1
  }
});