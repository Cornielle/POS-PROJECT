import React from 'react';
import { ListItem } from 'react-native-elements'
import { Avatar,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid, Button, Dimensions} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import ArticulosFields from '../../src/Fields/Articulos'
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
export default class ArticulosGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadArticuloData()  
        this.editField = this.editField.bind(this);
        this._showMenu = this._showMenu.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
        this.saveEdit = this.saveEdit.bind(this);        
        this.stateArticle =  this.stateArticle.bind(this);
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
          'Detalle',
          'Eliminar',
          'Editar',
          'Cargar imagen',
          'Cancel',
          'Tomar imagen con Camara',
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
        Articulo:{
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
        CatidadExistencia:'',
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
  LoadArticuloData = async () =>{
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
            db.executeSql(`SELECT * FROM Articulos WHERE Activo = 1 ORDER BY NombreArticulo ASC`,[]).then((result) => {
              console.log(result)
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 artiobj.push(row);
               }
               artiobj.map(x => {
                 const{rowid, NombreArticulo, PrecioCosto,FechaCreacion,PrecioVenta, Activo, Img, Abreviatura} = x;
                 console.log(PrecioCosto,'costo')
                 let date = FechaCreacion.split(' ');
                 let objeto = {
                 key: rowid,
                 name:NombreArticulo,
                 FechaCreacion:`${date[2]}/${date[1]}/${date[3]}` ,
                 //HoraCreacion: date[4][0]+date[4][1] > 11 && date[4][0]+date[4][1] < 23 ? `${ date[4]}PM` :`${ date[4]}AM`,
                 Abreviatura: Abreviatura,
                 subtitle: `P. Costo: RD$ ${PrecioCosto} ${"\n"}P. Venta: RD$ ${PrecioVenta}`,
                 Img: JSON.parse(Img),
                 estado: Activo ?true: false
               }
               arra.push(objeto)
               });
               this.setState({data:arra})
               this.setState({
                 filterData:arra
               })
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
    this.LoadArticuloData() 
    this.forceUpdateHandle()
  }
  /*Launch From Camera*/
  fromCamera = async (id) => {
    const options = {
      title: 'Tomar imagen desde la Camara',
      chooseFromLibraryButtonTitle:'Selecciona una foto de la Libreria',
    };
    console.log('WHEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY')
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
                db.executeSql(`UPDATE Articulos SET Img = ? WHERE rowid = ${id}`,
                [JSON.stringify(this.state.avatarSource)]).then((result) => {
                  ToastAndroid.show("Imagen agregada correctamente!", ToastAndroid.SHORT);
                  this.setState({
                    visible:false
                  })
                  this.LoadArticuloData()
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
                  this.LoadArticuloData()
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
        this.state.Articulo.Codigo,
        this.state.Articulo.CodigoDeBarra,
        this.state.Articulo.FechaModificacion,
        this.state.Articulo.NombreArticulo,
        this.state.Articulo.PrecioCosto,
        this.state.Articulo.PrecioVenta,
        this.state.Articulo.UsuarioModificacion,
        this.state.Articulo.rowid,
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
              db.executeSql(`UPDATE Articulos SET Codigo = ? , CodigoDeBarra = ?, FechaModificacion = ?, NombreArticulo = ?, PrecioCosto = ?, PrecioVenta = ?, UsuarioModificacion = ? WHERE rowid = ?`,
              params).then((result) => {
                ToastAndroid.show("Artículo editado correctamente!", ToastAndroid.SHORT);
                this.setState({
                  visible:false
                })
                this.LoadArticuloData()
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
              db.executeSql(`SELECT * FROM Articulos WHERE rowid = ${key}`,[]).then((result) => {
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

  stateArticle = async (id) =>{
    let db;
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
            db.executeSql(`UPDATE Articulos SET Activo = 0 WHERE rowid = ${id}`,[]).then((result) => {
              console.log(result)
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 this.setState({Articulo: row})
               }
               ToastAndroid.show("Eliminado Correctamente!", ToastAndroid.SHORT);
               this.LoadArticuloData()
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
    this.LoadArticuloData()
  }
}
_showMenu(index){
  this.setState({index})
  this.state.data[index]['estado']
  ? this.state.optionArray[1] = 'Eliminar' 
  : this.state.optionArray[1] = 'Activar'  
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
        modalTitle:'Detalles Artículo',
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
      this.FillArticulo(id)
      this.setState({
        modalTitle:'Editar Artículo',
        editFields:false
      })
      this._showModal()
      break
      case 3:
        /*Select Image from Library*/ 
      this.selectImage(id.key)
      break
      case 5:
        /*Took Image from Camera*/
      this.fromCamera(id.key)
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
    if(name==='NombreArticulo'){
      this.setState({NombreArticulo:fieldValue})
      this.state.Articulo.NombreArticulo = fieldValue 
    }
    else if(name==='Codigo'){
      this.setState({Codigo:fieldValue})
      this.state.Articulo.Codigo = fieldValue
    }
    else if(name==='CodigoDeBarra'){
      this.setState({CodigoDeBarra:fieldValue})
      this.state.Articulo.CodigoDeBarra = fieldValue
    } 
    else if(name==='PrecioCosto'){
      this.setState({PrecioCosto:fieldValue})
      this.state.Articulo.PrecioCosto = fieldValue
    } 
    else if(name==='PrecioVenta'){
      this.setState({PrecioVenta:fieldValue})
      this.state.Articulo.PrecioVenta = fieldValue
    } 
    else if(name==='Descripcion'){
      this.setState({Descripcion:fieldValue})
      this.state.Articulo.Descripcion = fieldValue
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
   subtitle={this.state.Articulo.NombreArticulo} 
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
            label='Nombre del Artículo'
            value={this.state.Articulo.NombreArticulo !==null ? this.state.Articulo.NombreArticulo : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreArticulo)=> this.editField(NombreArticulo, 'NombreArticulo')}
            />
              <TextInput
            style={styles.Input}
            mode='flat'
            label='Código de Barra'
            value={this.state.Articulo.CodigoDeBarra !==null ? this.state.Articulo.CodigoDeBarra : 'Cargando...'}
            disabled={editFields}
            onChangeText={(CodigoDeBarra) => this.editField(CodigoDeBarra,'CodigoDeBarra')}
            />
              <TextInput
            style={styles.Input}
            mode='flat'
            label='Precio de Costo'
            value={this.state.Articulo.PrecioCosto !==null ? this.state.Articulo.PrecioCosto.toString() : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(PrecioCosto) => this.editField( PrecioCosto, 'PrecioCosto' )}
            />
              <TextInput
            style={styles.Input}
            mode='flat'
            label='Precio de Venta'
            value={this.state.Articulo.PrecioVenta !==null ? this.state.Articulo.PrecioVenta.toString()  : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(PrecioVenta) => this.editField( PrecioVenta, 'PrecioVenta' )}
            />
            {this.state.editFields &&
            <View>
              {/*El codigo del articulos siempre sera*/}
                <TextInput
              style={styles.Input}
              mode='flat'
              label='Código del Artículo'
              value={this.state.Articulo.rowid !==null ? this.state.Articulo.rowid.toString() : 'Cargando...'}
              disabled={true}
              editable={true}
              onChangeText={(rowid) => this.editField(rowid,'rowid')}
              />
                <TextInput
              style={styles.Input}
              mode='flat'
              label='Usuario Creación'
              value={this.state.Articulo.UsuarioCreacion !==null ? this.state.Articulo.UsuarioCreacion : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(UsuarioCreacion) => this.editField( UsuarioCreacion, 'UsuarioCreacion')}
              />
                <TextInput
              style={styles.Input}
              mode='flat'
              label='Usuario Modificación'
              value={this.state.Articulo.UsuarioModificacion !==null ? this.state.Articulo.UsuarioModificacion : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(UsuarioModificacion) => this.editField( UsuarioModificacion,'UsuarioModificacion')}
              />
              
            </View>
            }
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
                <Text>Abreviatura:{"\n"}
                  <Text style={{color:'rgba(0, 0, 0, .5)'}}>
                    {item.Abreviatura}
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
          cancelButtonIndex={4}
          //If you want to highlight any specific option you can use below prop
          destructiveButtonIndex={1}
        />
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
      </View>
      </ScrollView>
      )
    }
      {this.state.addRecord === true  
        &&(<ArticulosFields navigationValue={
          this.props.navigation} 
          toggleForm={this._toggleForm}
        />)
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