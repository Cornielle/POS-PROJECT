import React from 'react';
import { ListItem } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text, Image,ScrollView} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import Empleados from '../../Models/Empleados'
import Acciones from '../Screens/Acciones'
import MenuScreen from '../../src/Screens/MenuScreen'
export default class AccionesGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadEmpleadoData()  
        this._showMenu = this._showMenu.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
      }
      state = { 
        modalVisible:false,
        visible:false,
        checked:'unchecked',
        index:0,
        ModalVisibility:false,
        data:[],
        optionArray: [
          'Editar',
          'Activar',
          'Detalle',
          'Cancel'
        ],
        addUser:false,
        modalTitle:'',
        filterData:[],
        newData:'',
        text:'',
        IdEmpleado:"",
        Empleado:{
          NombrePersona:"",
          ApellidoPersona:"",
          NombreUsuario:"",
          Telefono:"",
          TipoIdentificacion:"",
          Identificacion:"",
          Roll:"",
          Correo:"",
          Activo:1,
          FechaCreacion: "",
          FechaModificacion:"",
          UsuarioCreacion:"",
          UsuarioModificacion:""
        }
    };
 
  _showModal = () => this.setState({visible:true})
  _hideModal = () => this.setState({visible:false})
  LoadEmpleadoData = async () =>{
    const options ={
        columns:'Id,NombrePersona,ApellidoPersona,Identificacion,TipoIdentificacion,NombreUsuario,Telefono,Roll',
        where:{
        Id_gt:0
        },
        page:1,
        limit:30
    }
  const empleobj = await Empleados.query(options)
  let arra =[]
  empleobj.map(x => {
    const{Id, NombrePersona, Roll, Activo} = x;
    var objeto  ={
    key: Id.toString(),
    name:NombrePersona,
    avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: Roll,
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
    const crear = await Empleados.createTable();
    console.log(crear);
  }
  FillEmpleado = async (id) =>{
    try{
      const {key} = id;
      // console.log(key);
      const Empleado = await Empleados.find(key)
      this.setState({Empleado})
      // console.log(this.state.Empleado);
    }
    catch(ex){
    Alert.alert("Ha ocurrido el siguiente error: "+ex);
    }
  }
_toggleForm(addUser){
  if(addUser===false){
    this.setState({addUser:false})
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
      this.FillEmpleado(id)
      this._showModal()
      this.setState({modalTitle:'Editar Usuario'})
      break
    case 1:
      this.state.data[this.state.index]['estado'] = !this.state.data[this.state.index]['estado']
      this.setState({ state: this.state });
      break
    case 2:
      this.FillEmpleado(id)
      this._showModal()
      this.setState({modalTitle:'Detalles Usuario'})
      break
    default:
      break
  }
}
handleSearch = (text) => {
  const filterData = this.state.data.filter(x => String(x.name).includes(text));
  this.setState({ filterData, text})
  console.log(filterData,'here')
}
handleEnd = () => {
  this.setState(state=>{page: this.state.page + 1});
}
setModalVisible(visible) {
  this.setState({modalVisible: visible});
    //To show the Bottom ActionSheetsfsff
    this.ActionSheet.show();
}
render(){
const {name, subtitle, navigation} = this.props
const {visible} = this.state
return(
<View>
{ this.state.addUser !== true && (
  <ScrollView style={{height:800, zIndex:-50}}>
  <View style={{  zIndex:-1}}>
  <Modal visible={visible}>
  <View style={styles.Form}> 
  <Card>
  <ModalControls modalTitle={this.state.modalTitle} hideModal={this._hideModal}/>
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
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Nombre'
            value={this.state.Empleado.NombrePersona}
            disabled={true}
            onChangeText={(NombrePersona)=> this.setState({NombrePersona})}
        />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Apellidos'
            value={this.state.Empleado.ApellidoPersona}
            onChangeText={(ApellidoPersona) => this.setState({ ApellidoPersona })}
            disabled={true}
        />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Nombre Usuario'
            value={this.state.Empleado.NombreUsuario}
            disabled= {true}
            onChangeText={(NombreUsuario) => this.setState({ NombreUsuario })}
        />
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
              rightAvatar={ item.estado === true ? <Badge>Activado</Badge> : <Badge>Desactivado</Badge>}
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
            onPress={() => this.setState({addUser:true})} 
            />
          </View> 
      </ScrollView>
      )
    }
      {this.state.addUser === true  
        &&(<Acciones navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
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
  bottom:10,
  left:normalize(300),
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
});