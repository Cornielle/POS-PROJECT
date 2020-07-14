import React from 'react';
import { ListItem } from 'react-native-elements'
import { Avatar,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid, Button, Dimensions} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import RolesScreen from '../../src/Screens/RolesScreen'
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
export default class RolesGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadRolData()  
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
          'Cancel',
        ],
        render:false,
        addRecord:false,
        modalTitle:'',
        filterData:[],
        newData:'',
        text:'',
        avatarSource:null,
        IdRol:"",
        editFields:false,
        Rol:{
        rowid:0,
        Codigo:'',
        CategoriaId: 0,
        Descripcion:'',
        DescripcionPantalla:'',
        NombreRol:'',
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
  LoadRolData = async () =>{
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
            db.executeSql(`SELECT * FROM Roles WHERE Activo = 1 ORDER BY NombreRol ASC`,[]).then((result) => {
              console.log(result)
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 artiobj.push(row);
               }
               artiobj.map(x => {
                 const{rowid, NombreRol, Descripcion, Activo} = x;
                 let objeto = {
                 key: rowid,
                 NombreRol:NombreRol,
                 Descripcion:Descripcion,
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
    this.LoadRolData() 
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
                db.executeSql(`UPDATE Roles SET Img = ? WHERE rowid = ${id}`,
                [JSON.stringify(this.state.avatarSource)]).then((result) => {
                  ToastAndroid.show("Imagen agregada correctamente!", ToastAndroid.SHORT);
                  this.setState({
                    visible:false
                  })
                  this.LoadRolData()
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
                db.executeSql(`UPDATE Roles SET Img = ? WHERE rowid = ${id}`,
                [JSON.stringify(this.state.avatarSource)]).then((result) => {
                  ToastAndroid.show("Imagen agregada correctamente!", ToastAndroid.SHORT);
                  this.setState({
                    visible:false
                  })
                  this.LoadRolData()
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
        this.state.Rol.NombreRol,
        this.state.Rol.rowid,
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
              db.executeSql(`UPDATE Roles SET NombreRol = ? WHERE rowid = ?`,
              params).then((result) => {
                ToastAndroid.show("Artículo editado correctamente!", ToastAndroid.SHORT);
                this.setState({
                  visible:false
                })
                this.LoadRolData()
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
  FillRol = async (id) =>{
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
              db.executeSql(`SELECT * FROM Roles WHERE rowid = ${key}`,[]).then((result) => {
                 for (let i = 0; i < result[0].rows.length; i++) {
                   let row = result[0].rows.item(i);
                   this.setState({Rol: row})
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
            db.executeSql(`UPDATE Roles SET Activo = 0 WHERE rowid = ${id}`,[]).then((result) => {
              console.log(result)
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 this.setState({Rol: row})
               }
               ToastAndroid.show("Eliminado Correctamente!", ToastAndroid.SHORT);
               this.LoadRolData()
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
    this.LoadRolData()
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
      this.FillRol(id)
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
      this.FillRol(id)
      this.setState({
        modalTitle:'Editar Artículo',
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
    //To show the Bottom ActionSheet
    this.ActionSheet.show();
}
editField = (fieldValue, name) =>{
    console.log(fieldValue, 'checking')
    if(name==='NombreRol'){
      this.setState({NombreRol:fieldValue})
      this.state.Rol.NombreRol = fieldValue 
    }
    else if(name==='Descripcion'){
      this.setState({Descripcion:Descripcion})
      this.state.Rol.Descripcion = fieldValue
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
   subtitle={this.state.Rol.NombrePersona} 
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
            label='Nombre Rol'
            value={this.state.Rol.NombreRol !==null ? this.state.Rol.NombreRol : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreRol)=> this.editField(NombreRol, 'NombreRol')}
            />
              <TextInput
            style={styles.Input}
            mode='flat'
            label='Descripcion'
            value={this.state.Rol.Descripcion !==null ? this.state.Rol.Descripcion : 'Cargando...'}
            disabled={editFields}
            onChangeText={(Descripcion) => this.editField(Descripcion,'Descripcion')}
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
              leftAvatar={<Avatar.Icon size={48} icon="account" />}
              title={item.NombreRol}
              subtitle={item.Descripcion}
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
        &&(<RolesScreen navigationValue={
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