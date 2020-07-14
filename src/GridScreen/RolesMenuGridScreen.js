import React , { useState } from 'react';
import { ListItem } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid,SafeAreaView} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import Roles from '../../Models/Roles';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import RolesMenuScreen from '../Screens/RolesMenuScreen';
export default class RolesGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadRolesData()  
        this.editField = this.editField.bind(this);
        this._showMenu = this._showRole.bind(this);
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
        Role:{
        id:0,
        NombreRol:'',
        Comentario:'',
        Activo:0,
        FechaCreacion:'',
        FechaModificacion:'',
        UsuarioCreacion:'',
        UsuarioModificacion:''
        },
    };

 
  _showModal = () => this.setState({visible:true})
  _hideModal = () => this.setState({visible:false})
  LoadRolesData = async () =>{
    const optionsRoles ={
        columns:`id ,NombreRol, Comentario, FechaCreacion, Activo`,
        page:1,
        limit:30
    }    
  
  const artiobj = await Roles.query(optionsRoles)
 // console.log(artiobj, 'here')
  let arra =[]
  this.state.HoraCreacion = ''
  artiobj.map(x => {
    const{id, NombreRol,FechaCreacion, Activo, Comentario} = x;
    let date = FechaCreacion.split(' ');
    var objeto  ={
    key: id,
    NombreRol:NombreRol,
    Comentario:Comentario,  
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
    // console.log(this.state.data)
  }
  async  componentDidMount(){
    const crear = await Roles.createTable();
    this.LoadRolesData()  
  }
  saveEdit = async () =>{ 
    try{
      const props =  {
        id: this.state.Role.id,
        NombreRol: this.state.Role.NombreRol,
        Activo:this.state.Role.Activo,
        Comentario:this.state.Role.Comentario
      }
      const response = await Roles.update(props)
      if(Object.keys(response).length <=0){
        ToastAndroid.show("Error al insertar en la base de datos",ToastAndroid.SHORT);
      }else{
        ToastAndroid.show("Guardado Correctamente!", ToastAndroid.SHORT);
        this.state.visible = false
        this.LoadRolesData()
      }
    }
  catch(ex){
        console.log(ex, 'fatal error')
    }
  }
  FillArticulo = async (id) =>{
    try{
      const {key} = id;
      const Role = await Roles.find(key)
      this.setState({Role})
    }
    catch(ex){
    console.log("Ha ocurrido el siguiente error: "+ex);
    }
  }

  stateUsers = async (id) =>{ 
    const savingState= await Roles.find(id)
    savingState.Activo = this.state.data[this.state.index]['estado'] ? 1:0
    savingState.save()
  }
_toggleForm(addRecord){
  if(addRecord===false){
    this.setState({addRecord:false})
  }
}
_showRole(index){
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
        modalTitle:'Detalles Role',
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
        modalTitle:'Editar Role',
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
    if(name==='NombreRol'){
      this.setState({NombreRol:fieldValue})
      this.state.Role.NombreRol = fieldValue 
    }
    else if(name==='Comentario'){
      this.setState({Comentario:fieldValue})
      this.state.Role.Comentario = fieldValue
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
            label='Nombre del Rol'
            value={this.state.Role.NombreRol !==null ? this.state.Role.NombreRol : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreRol)=> this.editField(NombreRol, 'NombreRol')}
            />
            <TextInput
              style={styles.Input}
              mode='flat'
              label='Comentario'
              value={this.state.Role.Comentario !==null ? this.state.Role.Comentario : 'Cargando...'}
              disabled={editFields}
              editable={true}
              onChangeText={(Comentario) => this.editField(Comentario,'Comentario')}
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
          keyExtractor={(x,i) => i.toString()}
          renderItem={({ item, index }) =>
            <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}            
          >
            <ListItem 
              style={{zIndex:-2}}
              onPress={() => this._showRole(index)}
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
              title={item.NombreRol}
              // subtitle={item.RoleLabel}
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
        &&(<RolesMenuScreen navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
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