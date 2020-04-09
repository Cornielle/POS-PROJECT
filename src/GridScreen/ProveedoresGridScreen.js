import React , { useState } from 'react';
import { ListItem } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import Proveedores from '../../Models/Proveedores';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import ProveedoresScreen from '../Screens/ProveedoresScreen';
export default class ProveedoresGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadProveedoresData()  
        this.editField = this.editField.bind(this);
        this._showMenu = this._showProveedor.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
        this.saveEdit = this.saveEdit.bind(this)        
        this.stateUsers =  this.stateUsers.bind(this)
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
        editFields:false,
        Proveedor:{
        id:0,
        NombreProveedor:'',
        Correo:'',
        Activo:0,
        FechaCreacion:'',
        FechaModificacion:'',
        UsuarioCreacion:'',
        UsuarioModificacion:''
        },
    };
  _showModal = () => this.setState({visible:true})
  _hideModal = () => this.setState({visible:false})
  LoadProveedoresData = async () =>{
    const optionsProveedores ={
        columns:`id ,NombreProveedor, Correo, FechaCreacion, Activo`,
        page:1,
        limit:30
    }    
  
  const artiobj = await Proveedores.query(optionsProveedores)
  console.log(artiobj, 'here')
  let arra =[]
  this.state.HoraCreacion = ''
  artiobj.map(x => {
    const{id, NombreProveedor,FechaCreacion, Activo, Correo} = x;
    let date = FechaCreacion.split(' ');
    var objeto  ={
    key: id,
    NombreProveedor:NombreProveedor,
    Correo:Correo,  
    FechaCreacion:`${date[2]}/${date[1]}/${date[3]}` ,
    HoraCreacion: date[4][0]+date[4][1] > 11 && date[4][0]+date[4][1] < 23 ? `${ date[4]}PM` :`${ date[4]}AM`,
    avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',  
    estado: Activo ?true: false  
  }
  arra.push(objeto)
    });
    this.setState({data:arra})
    this.setState({
      filterData:arra
    })
  }
  async  componentDidMount(){
    const crear = await Proveedores.createTable();
    this.LoadProveedoresData();
  }
  saveEdit = async () =>{ 
    try{
      const props =  {
        id: this.state.Proveedor.id,
        NombreProveedor: this.state.Proveedor.NombreProveedor,
        Activo:this.state.Proveedor.Activo,
        Comentario:this.state.Proveedor.Comentario
      }
      const response = await Proveedores.update(props)
      if(Object.keys(response).length <=0){
        ToastAndroid.show("Error al insertar en la base de datos",ToastAndroid.SHORT);
      }else{
        ToastAndroid.show("Guardado Correctamente!", ToastAndroid.SHORT);
        this.state.visible = false
        this.LoadProveedoresData()
      }
    }
  catch(ex){
        console.log(ex, 'fatal error')
    }
  }
  FillProveedor = async (id) =>{
    try{
      const {key} = id;
      const Proveedor = await Proveedores.find(key)
      this.setState({Proveedor})
    }
    catch(ex){
    console.log("Ha ocurrido el siguiente error: "+ex);
    }
  }

  stateUsers = async (id) =>{ 
    const savingState= await Proveedores.find(id)
    savingState.Activo = this.state.data[this.state.index]['estado'] ? 1:0
    savingState.save()
  }
_toggleForm(addRecord){
  if(addRecord===false){
    this.setState({addRecord:false})
  }
}
_showProveedor(index){
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
      this.FillProveedor(id)
      this.setState({
        modalTitle:'Detalles Proveedor',
        editFields:true
      })
      this._showModal()
      break
    case 1:
      this.state.data[this.state.index]['estado'] = !this.state.data[this.state.index]['estado']
      this.setState({ state: this.state });
      this.stateUsers(id.key)
      break
    case 2:
      this.FillProveedor(id)
      this.setState({
        modalTitle:'Editar Proveedor',
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
    if(name==='NombreProveedor'){
      this.setState({NombreProveedor:fieldValue})
      this.state.Proveedor.NombreProveedor = fieldValue 
    }
    else if(name==='Correo'){
      this.setState({Correo:fieldValue})
      this.state.Proveedor.Correo = fieldValue
    }
    else if(name==='RNC'){
      this.setState({RNC:fieldValue})
      this.state.Proveedor.RNC = RNC
    }
    else if(name==='Direccion'){
      this.setState({Direccion:fieldValue})
      this.state.Proveedor.Direccion = fieldValue
    }
    else if(name==='Telefono'){
      this.setState({Telefono:fieldValue})
      this.state.Proveedor.Telefono = fieldValue
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
          <Image style={styles.ImageBox} 
                 source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
          <View style={styles.fabIcon}>
          <FAB
            icon="camera"
            color="#fff"
            style={styles.fabImage}
            onPress={() => console.log('open imagen')} 
            />
          </View> 
      </View>
      </Card.Content>
      <View>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Nombre del Proveedor'
            value={this.state.Proveedor.NombreProveedor !==null ? this.state.Proveedor.NombreProveedor : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreProveedor)=> this.editField(NombreProveedor, 'NombreProveedor')}
            />
            <TextInput
              style={styles.Input}
              mode='flat'
              label='RNC'
              value={this.state.Proveedor.RNC !==null ? this.state.Proveedor.RNC : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(RNC) => this.editField(RNC,'RNC')}
            /> 
                        <TextInput
              style={styles.Input}
              mode='flat'
              label='Direccion'
              value={this.state.Proveedor.Direccion !==null ? this.state.Proveedor.Direccion : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(Direccion) => this.editField(Direccion,'Direccion')}
            /> 
                        <TextInput
              style={styles.Input}
              mode='flat'
              label='Correo'
              value={this.state.Proveedor.Correo !==null ? this.state.Proveedor.Correo : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(Correo) => this.editField(Correo,'Correo')}
            /> 
                        <TextInput
              style={styles.Input}
              mode='flat'
              label='Telefono'
              value={this.state.Proveedor.Telefono !==null ? this.state.Proveedor.Telefono : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(Telefono) => this.editField(Telefono,'Comentario')}
            /> 
            </View>
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
              onPress={() => this._showProveedor(index)}
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
              title={item.NombreProveedor}
              subtitle={item.Correo}
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
        &&(<ProveedoresScreen navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
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