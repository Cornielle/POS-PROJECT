import React from 'react';
import { ListItem } from 'react-native-elements'
import { Avatar,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid, Button, Dimensions} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import StockScreen from '../../src/Screens/StockScreen'
import  SQLite  from 'react-native-sqlite-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;
const items= [];
const editIcon = props => <Avatar.Icon {...props} icon="pen" />
const detailIcon = props => <Avatar.Icon {...props} icon="folder" />
import ImagePicker from 'react-native-image-picker';
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
        this.stateStock =  this.stateStock.bind(this);
        this.forceUpdateHandle =  this.forceUpdateHandle.bind(this);

      }
      state = { 
        modalVisible:false,
        visible:false,
        checked:'unchecked',
        index:0,
        ModalVisibility:false,
        data:[],
        optionArray: [
          'Eliminar',
          'Editar',
          'Cancel',
        ],
        render:false,
        addRecord:false,
        modalTitle:'',
        filterData:[],
        newData:'',
        text:'',
        avatarSource:null,
        IdArticulo:"",
        editFields:false,
        Stock:{
        rowid:0,
        Codigo:'',
        CategoriaId: 0,
        Descripcion:'',
        DescripcionPantalla:'',
        NombreArticulo:'',
        CodigoDeBarra:'',
        PrecioCosto:'',
        PrecioVenta:'',
        ProveedoresId:'',
        CantidadExistencia:'',
        MedidaDeVenta:'',
        Activo:'',
        IdEmpresa:0,
        IdSucursal:0,
        FechaCreacion: '',
        FechaModificacion:'',
        UsuarioCreacion:'',
        UsuarioModificacion:'',
        Abreviatura:''
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
            db.executeSql(`SELECT * FROM Almacen JOIN Articulos ON 
            Almacen.rowid = Articulos.rowid WHERE Almacen.Activo = 1  ORDER BY rowid ASC`,[]).then((result) => {
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 artiobj.push(row);
               }
               console.log('Almacen Data:',artiobj)
               this.state.HoraCreacion = ''
               artiobj.map(x => {
                const{rowid, FechaModificacion,NombreArticulo, CantidadActual,Activo, Img} = x;
                console.log(NombreArticulo ,'check this')
                let date = FechaModificacion !==null ? FechaModificacion.split(" ") : FechaModificacion;
                console.log(date,'date')
                var objeto  ={
                key: rowid,
                NombreArticulo:NombreArticulo,
                Img: JSON.parse(Img),
                FechaModificacion:FechaModificacion,
                CantidadExistencia: CantidadActual,
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
    this.LoadStockData() 
    this.forceUpdateHandle()
  }
  /*Launch From Camera*/
  fromCamera = async (id) => {
    const options = {
      title: 'Tomar imagen desde la Camara',
      chooseFromLibraryButtonTitle:'Selecciona una foto de la Libreria',
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'file://'+response.path };
        this.setState({ 
          avatarSource: source,
        });
        new Promise((resolve) => {
          let db;
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
                db.executeSql(`UPDATE Almacen SET Img = ? WHERE rowid = ${id}`,
                [JSON.stringify(this.state.avatarSource)]).then((result) => {
                  ToastAndroid.show("Imagen agregada correctamente!", ToastAndroid.SHORT);
                  this.setState({
                    visible:false
                  })
                  this.LoadStockData()
              }).catch((error) =>{      
              console.log("Error al colocar la imagen", error);  
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

        this.setState({ 
          avatarSource: source,
        });
        console.log(this.state.avatarSource,'here')
      }
    });
  }

  /*SELECTING IMAGE*/
  selectImage = async (id) => {
    const options = {
      title: 'Agregar Imagen',
      chooseFromLibraryButtonTitle:'Selecciona una foto de la Libreria',
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'file://'+response.path };
        this.setState({ 
          avatarSource: source,
        });
        new Promise((resolve) => {
          let db;
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
                db.executeSql(`UPDATE Articulos SET Img = ? WHERE rowid = ${id}`,
                [JSON.stringify(this.state.avatarSource)]).then((result) => {
                  ToastAndroid.show("Imagen agregada correctamente!", ToastAndroid.SHORT);
                  this.setState({
                    visible:false
                  })
                  this.LoadStockData()
              }).catch((error) =>{      
              console.log("Error al colocar la imagen", error);  
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

        this.setState({ 
          avatarSource: source,
        });
        console.log(this.state.avatarSource,'here')
      }
    });
  }
  forceUpdateHandle(){
    this.setState({state:this.state})
    this.forceUpdate();
  }
  saveEdit = async () =>{ 
    let db;
    let params = []
    try{
      const param =  [
        this.state.Stock.CantidadExistencia,
        this.state.Stock.rowid,
      ]
      param.map(item=>{
        params.push(item)
      })
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
              db.executeSql(`UPDATE Almacen SET CantidadExistencia = ? WHERE rowid = ?`,
              params).then((result) => {
                ToastAndroid.show("Artículo editado correctamente!", ToastAndroid.SHORT);
                this.setState({
                  visible:false
                })
                dba.executeSql('INSERT INTO AlmacenDetalle(AlmacenId,CantidadIngreso,Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,'+
                'UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?)',[DataToDetalle.AlmacId,DataToDetalle.CatidadExistencia,DataToDetalle,DataToDetalle.Activo,DataToDetalle.IdEmpresa,DataToDetalle.IdSucursal,
                  DataToDetalle.FechaCreacion,DataToDetalle.FechaModificacion,DataToDetalle.UsuarioCreacion,DataToDetalle.UsuarioModificacion]).then((result) => {
                  console.log("Database is ready ... executing query ...");
                  ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
                })
              this.LoadStockData()
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
    catch(ex){
      console.log(ex, 'fatal error')
    }
  }
  FillArticulo = async (id) =>{
    let db;
    const {key} = id;
    try{
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
              db.executeSql(`SELECT * FROM Almacen WHERE rowid = ${key}`,[]).then((result) => {
                 for (let i = 0; i < result[0].rows.length; i++) {
                   let row = result[0].rows.item(i);
                   this.setState({Articulo: row})
                 }
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
    catch(ex){
    console.log("Ha ocurrido el siguiente error: "+ex);
    }
  }

  stateStock = async (id) =>{
    let db
     console.log(id,'CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');
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
            console.log("Database OPEN" );
            db.executeSql(`UPDATE Almacen SET Activo = 0 WHERE rowid = ?`,[id]).then((result) => {
              console.log(result)
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 this.setState({Articulo: row})
               }
               db.executeSql(`UPDATE Articulos SET Activo = 0 WHERE rowid = ?`,[id]).then((result) => {
                console.log(result)
                 for (let i = 0; i < result[0].rows.length; i++) {
                   let row = result[0].rows.item(i);
                   this.setState({Articulo: row})
                 }
                 ToastAndroid.show("Eliminado Correctamente! en Articulos", ToastAndroid.SHORT);
                 this.LoadStockData()
                }).catch((error) =>{      
                console.log("Error a cargar datos", error);  
              });
               ToastAndroid.show("Eliminado Correctamente! en Almacen", ToastAndroid.SHORT);
               this.LoadStockData()
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
  catch(ex){
  console.log("Ha ocurrido el siguiente error: "+ex);
  }
  
_toggleForm(addRecord){
  if(addRecord===false){
    this.setState({addRecord:false})
    this.LoadStockData()
  }
}
_showMenu(index){
  this.setState({index})
  this.state.data[index]['estado']
  ? this.state.optionArray[0] = 'Editar' 
  : this.state.optionArray[1] = 'Eliminar'  
}
_makeAction(action){ 
  const idIndex = (this.state.index);
  const id = this.state.data[idIndex];
  console.log(id.key, 'this id')
  this.setState({modalTitle:''})
  switch(action){
    case 0:
      this.FillArticulo(id)
      this.setState({
        modalTitle:'Editar Artículo',
        editFields:false
      })
      this._showModal()
      break
    case 1:
      this.state.data[this.state.index]['estado'] = !this.state.data[this.state.index]['estado']
      this.setState({ state: this.state });
      this.stateStock(id.key)
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
    //To show the Bottom ActionSheet
    this.ActionSheet.show();
}
editField = (fieldValue, name) =>{
    console.log(fieldValue, 'checking')
    if(name==='CantidadExistencia'){
      this.setState({CantidadExistencia:fieldValue})
      this.state.Stock.CantidadExistencia = fieldValue 
    }
    if(name==='NombreArticulo'){
      this.setState({NombreArticulo:fieldValue})
      this.state.Stock.NombreArticulo = fieldValue 
    }
}
render(){
  const {name, subtitle, navigation} = this.props
  const {visible, editFields} = this.state
return(
<View>
<Image source={this.state.avatarSource} style={styles.uploadAvatar} />
<Modal visible={visible} transparent={true} >
  <View style={styles.Form}> 
  <Card style={{marginTop:windowHeight * 0.17}}>
  <View style={{
    flexDirection: 'row', 
    alignSelf: 'flex-end',
    border:1,
  }}>
    <Text 
      style={{color:'blue', marginRight:!editFields ? windowWidth * 0.62 : windowWidth * 0.793, marginTop:10}} 
      onPress={()=>this._hideModal()}
    >
      Volver
    </Text>
    {!editFields && 
      (<Text style={{color:'blue', margin:10}} onPress={()=>this.saveEdit()}>Guardar</Text>)
    }
  </View>
  <Card.Title title= {!editFields ? "Editar Artículo":"Detalles del Artículo"}

   left = {!editFields ? editIcon: detailIcon}
   style={{
      borderBottomColor: 'black',
      borderBottomWidth: 0.5,
      fontSize:16
    }}
  />
  <ScrollView style={{height:windowHeight*0.5}}>
  <Card.Content>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Cantidad en Existencia'
            value={this.state.Stock.NombreArticulo !==null ? this.state.Stock.NombreArticulo : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreArticulo)=> this.editField(NombreArticulo, 'NombreArticulo')}
            />
          </Card.Content>
        </ScrollView>
    </Card>
  </View>
  </Modal>
{this.state.addRecord !== true && (
  <ScrollView style={{height:windowHeight, zIndex:-50}}>
  <View style={{  zIndex:-1}}>
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
      placeholder="Escribe aquí..."
      value={this.state.text}
    />
      <View style={{zIndex:-2,height:windowHeight * 0.8}}>
        <FlatList
          extraData={this.state}
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
              leftAvatar={{source:item.Img, width:60, height:60, resizeMode: 'cover', rounded: false}}
              rightAvatar={ 
                <View>             
                  {/* {item.estado === true ? <BadgeActivado</Badge> : <Badge>Desactivado</Badge>} */}
                <Text>Cantidad en Existencia:{"\n"}
                <Icon
                  name="shopping-basket"
                  size={15}
                  color="rgba(0, 0, 0, .5)"
                />{" "}
                  <Text style={{fontSize:12, color:'rgba(0, 0, 0, .5)'}}>
                    {item.CantidadExistencia}
                  </Text>
                </Text>
              </View>
              }
              title={item.NombreArticulo}
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
          cancelButtonIndex={2}
          //If you want to highlight any specific option you can use below prop
          destructiveButtonIndex={1}
        />
        {this.state.data.length!==0 &&
        <View style={styles.fab}>
          <FAB
            icon="plus"
            color="#fff"
            onPress={() => 
              this.setState({
                addRecord:true,
                state:this.state
              })} 
            />
          </View> 
          }
      </View>
      </ScrollView>
      )
    }
      {this.state.addRecord === true  
        &&(<StockScreen navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
      }
    </View>
    );f
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
  zIndex:-1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  height:windowHeight,
},
ModalStyle:{
flex:1,
},
fab: {
  position:'absolute',
  top:windowHeight * 0.8,
  bottom:5,
  left:normalize(170),
  width:normalize(52),
  zIndex:11
},
ImageBox:{
  width:windowWidth * 0.6,
  height:windowHeight *0.03,
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