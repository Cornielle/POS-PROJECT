import React , { useState } from 'react';
import { ListItem } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid, Picker} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import Empleados from '../../Models/Empleados';
import Roles from '../../Models/Roles'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';


import VentasScreen from '../Screens/VentasScreen'
export default class VentasGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadUsersData()  
        this.editField = this.editField.bind(this);
        this._showMenu = this._showMenu.bind(this);
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
        rolArray:[],
        render:false,
        addRecord:false,
        modalTitle:'',
        filterData:[],
        newData:'',
        text:'',
        editFields:false,
        Empleado:{
        id:0,
        Rol:0,
        NombrePersona:'',
        Contrasena:'',
        Activo:0,
        IdEmpresa:0,
        IdSucursal:0,
        FechaCreacion:'',
        FechaModificacion:'',
        UsuarioCreacion:'',
        UsuarioModificacion:''
        },
    };

 
  _showModal = () => this.setState({visible:true})
  _hideModal = () => this.setState({visible:false})
  LoadUsersData = async () =>{
    const optionsEmpleados ={
        columns:`id ,Rol, NombrePersona, FechaCreacion, Activo`,
        // where:{
        // Id_gt:0
        // },
        page:1,
        limit:30
    }    
    const optionsRol ={
      columns:`Id,NombreRol`,
      // where:{
      // Id_gt:0
      // },
      page:1,
      limit:30
  }    
    
  
  const artiobj = await Empleados.query(optionsEmpleados)
  const rol =  await Roles.query(optionsRol)
  this.setState({
    rolArray:rol
  })
  console.log(this.state.rolArray, 'here')
  let arra =[]
  this.state.HoraCreacion = ''
  artiobj.map(x => {
    const{id, NombrePersona,FechaCreacion, Activo, Rol} = x;
    let date = FechaCreacion.split(' ');
    console.log( rol[0])
    var objeto  ={
    key: id,
    name:NombrePersona,  
    FechaCreacion:`${date[2]}/${date[1]}/${date[3]}` ,
    HoraCreacion: date[4][0]+date[4][1] > 11 && date[4][0]+date[4][1] < 23 ? `${ date[4]}PM` :`${ date[4]}AM`,
    avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    Rol: rol[0].Id === Rol? `${rol[0].NombreRol}` : '',   
    estado: Activo ?true: false  
  }
  arra.push(objeto)
    });
    this.setState({data:arra})
    this.setState({
      filterData:arra
    })
    // console.log(this.state.data)
  }
  async  componentDidMount(){
    const crear = await Empleados.createTable();
    this.LoadUsersData()  
  }
  saveEdit = async () =>{ 
    try{
      const props =  {
        id: this.state.Empleado.id,
        NombrePersona: this.state.Empleado.NombrePersona,
        Rol:this.state.Empleado.Rol,
        Activo:this.state.Empleado.Activo
      }
      const response = await Empleados.update(props)
      if(Object.keys(response).length <=0){
        ToastAndroid.show("Error al insertar en la base de datos",ToastAndroid.SHORT);
      }else{
        ToastAndroid.show("Guardado Correctamente!", ToastAndroid.SHORT);
        this.state.visible = false
        this.LoadUsersData()
      }
    }
  catch(ex){
        console.log(ex, 'fatal error')
    }
  }
  FillArticulo = async (id) =>{
    try{
      const {key} = id;
      const Empleado = await Empleados.find(key)
      this.setState({Empleado})
    }
    catch(ex){
    console.log("Ha ocurrido el siguiente error: "+ex);
    }
  }

  stateUsers = async (id) =>{ 
    const savingState= await Empleados.find(id)
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
        modalTitle:'Detalles Empleado',
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
      this.FillArticulo(id)
      this.setState({
        modalTitle:'Editar Empleado',
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
    if(name==='NombrePersona'){
      this.setState({NombrePersona:fieldValue})
      this.state.Empleado.NombrePersona = fieldValue 
    }
    else if(name==='Rol'){
      this.setState({Rol:fieldValue})
      this.state.Empleado.Rol = fieldValue
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
      </Card.Content>
      <View>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Nombre'
            value={this.state.Empleado.NombrePersona !==null ? this.state.Empleado.NombrePersona : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombrePersona)=> this.editField(NombrePersona, 'NombrePersona')}
            />
            <TextInput
              style={styles.Input}
              mode='flat'
              label='Rol'
              value={this.state.Empleado.Rol !==null ? this.state.Empleado.Rol.toString() : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(Rol) => this.editField(Rol,'Rol')}
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
              subtitle={item.Rol}
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
        &&(<VentasScreen navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
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