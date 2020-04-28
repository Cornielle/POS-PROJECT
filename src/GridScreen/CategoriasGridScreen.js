import React from 'react';
import { ListItem } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import Categorias from '../../Models/Categorias';
import CategoriasField from '../Fields/Categorias'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';

export default class CategoriasGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadCategoriaData()  
        this.editField = this.editField.bind(this);
        this._showMenu = this._showMenu.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
        this.saveEdit = this.saveEdit.bind(this)        
        this.stateCategories=  this.stateCategories.bind(this)
        this.forceUpdateHandle =  this.forceUpdateHandle.bind(this)
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
        render:false,
        addRecord:false,
        modalTitle:'',
        filterData:[],
        newData:'',
        text:'',
        IdArticulo:"",
        editFields:false,
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
  _showModal = () => this.setState({visible:true})
  _hideModal = () => this.setState({visible:false})
  LoadCategoriaData = async () =>{
    const options ={
        columns:`id,Descripcion,NombreCategoria,
        Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,
         UsuarioCreacion,UsuarioModificacion`,
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
    name:NombreCategoria,
    FechaCreacion:`${date[2]}/${date[1]}/${date[3]}` ,
    HoraCreacion: date[4][0]+date[4][1] > 11 && date[4][0]+date[4][1] < 23 ? `${ date[4]}PM` :`${ date[4]}AM`,
    avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: ``,
    estado: Activo ?true: false
  }
  arra.push(objeto)
    });
    this.setState({data:arra})
    this.setState({
      filterData:arra
    })
    console.log(this.state.data)
  }
  async  componentDidMount(){
    const crear = await Categorias.createTable();
    this.LoadCategoriaData() 
  }
  forceUpdateHandle(){
    this.setState({state:this.state})
    this.forceUpdate();
  }
  saveEdit = async () =>{ 
    try{
      const props =  {
        NombreCategoria: this.state.Categoria.NombreCategoria,
        Descripcion: this.state.Categoria.Descripcion,
        Activo:this.state.Categoria.Activo,
        IdEmpresa:this.state.Categoria.IdEmpresa,
        IdSucursal:this.state.Categoria.IdSucursal,
        FechaCreacion: this.state.Categoria.FechaCreacion,
        FechaModificacion:this.state.Categoria.FechaModificacion,
        UsuarioCreacion:this.state.Categoria.UsuarioCreacion,
        UsuarioModificacion:this.state.Categoria.UsuarioModificacion,
      }
      const response = await  Categorias.update(props)
      if(Object.keys(response).length <=0){
        ToastAndroid.show("Error al insertar en la base de datos",ToastAndroid.SHORT);
      }else{
        ToastAndroid.show("Guardado Correctamente!", ToastAndroid.SHORT);
        this.state.visible = false
        this.LoadCategoriaData()
      }
    }
  catch(ex){
        console.log(ex, 'fatal error')
    }
  }
  FillCategoria = async (id) =>{
    try{
      const {key} = id;
      const Categorias = await Categorias.find(key)
      this.setState({Categorias})
    }
    catch(ex){
    Alert.alert("Ha ocurrido el siguiente error: "+ex);
    }
  }

  stateCategories = async (id) =>{ 
    const savingState= await Categorias.find(id)
    savingState.Activo = this.state.data[this.state.index]['estado'] ? 1:0
    savingState.save()
  }
_toggleForm(addRecord){
  if(addRecord===false){
    this.setState({addRecord:false})
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
      this.FillArticulo(id)
      this.setState({
        modalTitle:'Detalles Categoria',
        editFields:true
      })
      this._showModal()
      break
    case 1:
      this.state.data[this.state.index]['estado'] = !this.state.data[this.state.index]['estado']
      this.setState({ state: this.state });
      this.stateCategories(id.key)
      break
    case 2:
      this.FillArticulo(id)
      this.setState({
        modalTitle:'Editar Categoria',
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
    //To show the Bottom ActionSheetsfsff
    this.ActionSheet.show();
}
editField = (fieldValue, name) =>{
    if(name==='NombreCategoria'){
      this.setState({NombreCategoria:fieldValue})
      this.state.Categoria.NombreCategoria = fieldValue 
    }
    else if(name==='Codigo'){
      this.setState({Codigo:fieldValue})
      this.state.Articulo.Codigo = fieldValue
    }
    else if(name==='CodigoDeBarra'){
      this.setState({CodigoDeBarra:fieldValue})
      this.state.Articulo.CodigoDeBarra = fieldValue
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
        {!editFields?
      (<TextInput
            style={styles.Input}
            mode='flat'
            label='Descripción'
            value={this.state.Categoria.Descripcion !==null ? this.state.Categoria.Descripcion : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(Descripcion)=> this.editField(Descripcion, 'Descripcion')}
          />) :
          (<Text style={{color:'#000',padding:20}}>
            Descripción: {"\n"} {"\n"}   {this.state.Categoria.Descripcion}        
          </Text>)
          }
        </Card>
      </Card.Content>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Nombre de Categoria'
            value={this.state.Categoria.NombreCategoria !==null ? this.state.Categoria.NombreCategoria : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreCategoria)=> this.editField(NombreCategoria, 'NombreArticulo')}
            />
            {this.state.editFields &&
            <View>
                  <TextInput
              style={styles.Input}
              mode='flat'
              label='Usuario Creación'
              value={this.state.Categoria.UsuarioCreacion !==null ? this.state.Categoria.UsuarioCreacion : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(UsuarioCreacion) => this.editField( UsuarioCreacion, 'UsuarioCreacion')}
              />
                  <TextInput
              style={styles.Input}
              mode='flat'
              label='Usuario Modificación'
              value={this.state.Categoria.UsuarioModificacion !==null ? this.state.Categoria.UsuarioModificacion : 'Cargando...'}
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
            // onEndReached={0}
            // onEndThreshold={0}
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
        &&(<CategoriasField navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
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