import React from 'react';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text,ScrollView} from 'react-native'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import Empleados from '../../Models/Empleados'
export default class OpeningClosingGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadEmpleadoData()  
        this._showMenu = this._showMenu.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._showModal =  this._showModal.bind(this);
        this._hideModal = this._hideModal.bind(this);
        this.formatAMPM =  this.formatAMPM.bind(this);
      }
      state = { 
        modalVisible:false,
        openingVisible:false,
        closedVisible:false,
        checked:'unchecked',
        index:0,
        ModalVisibility:false,
        data:[],
        optionArray: [
          'Detalle',
          'Cancelar'
        ],
        date:'',
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
 
  _showModal = (modalName) => {
    console.log(modalName)
    if(modalName ==='closed'){
      this.setState({modalTitle:'Cierre de Caja'})
      this.setState({openingVisible:true})
    } else {
      this.setState({modalTitle:'Apertura de Caja'})
      this.setState({closeVisible:true})
    }
  }
  _hideModal = () => {
    this.setState({openingVisible:false})
    this.setState({closedVisible:false})
  }
  LoadEmpleadoData = async () =>{
    const options ={
        columns:'Id,NombrePersona,ApellidoPersona,Identificacion,TipoIdentificacion,NombreUsuario,Telefono,Roll',
        where:{
        Id_gt:0
        },
        page:1,
        limit:30
    }
  const cashier = await Empleados.query(options)
  let arra =[]
  cashier.map(x => {
    const{Id, NombrePersona, Roll, Activo} = x;
    var objeto  ={
    key: Id.toString(),
    name:NombrePersona,
    avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: Roll,
    estado: true
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

  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
_showMenu(index){
  this.setState({index})
  this.state.data[index]['estado']
  ? this.state.optionArray[0] = 'Cerrar' 
  : this.state.optionArray[0] = 'Detalle' 
}
_makeAction(action){ 
  const idIndex = (this.state.index);
  const id = this.state.data[idIndex];
  this.setState({modalTitle:''})
  switch(action){
    case 0:
      this.FillEmpleado(id)
      if(id.estado ===true)
        this._showModal('closed')
        this.setState({ state: this.state });
        this.setState({modalTitle:'Cierre de Caja'})
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
render(){
const {name, subtitle, navigation} = this.props
const {openingVisible, closedVisible} = this.state
return(
<ScrollView style={{height:800, zIndex:-50}}>
<View style={{  zIndex:-1}}>
<Modal visible={openingVisible}>
  <View style={styles.Form}> 
    <Card style={styles.Card}>
      <ModalControls modalTitle={this.state.modalTitle? this.state.modalTitle: ''} hideModal={this._hideModal}/>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Caja:'
            placeholder=" Ingresar nombre de caja"
            value={this.state.Empleado.NombrePersona}
            onChangeText={(NombrePersona)=> this.setState({NombrePersona})}
        />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Monto de Apertura:'
            keyboardType='numeric'
            placeholder="Solo numeros decimales y enteros"
            value={this.state.Empleado.ApellidoPersona}
            onChangeText={(ApellidoPersona) => this.setState({ ApellidoPersona })}
        />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Fecha:'
            disabled={true}
            value={this.formatAMPM(new Date()) +' '+ new Date().toLocaleDateString('es-ES')}
            onChangeText={(NombreUsuario) => this.setState({ NombreUsuario })}
        />
    </Card>
  </View>
</Modal>
<Modal visible={closedVisible}>
  <View style={styles.Form}> 
    <Card style={styles.Card}>
      <ModalControls modalTitle={this.state.modalTitle? this.state.modalTitle: ''} hideModal={this._hideModal}/>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Caja:'
            placeholder=" Ingresar nombre de caja"
            value={this.state.Empleado.NombrePersona}
            onChangeText={(NombrePersona)=> this.setState({NombrePersona})}
        />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Monto de Apertura:'
            keyboardType='numeric'
            placeholder="Solo numeros decimales y enteros"
            value={this.state.Empleado.ApellidoPersona}
            onChangeText={(ApellidoPersona) => this.setState({ ApellidoPersona })}
        />
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Fecha:'
            disabled={true}
            value={this.formatAMPM(new Date()) +' '+ new Date().toLocaleDateString('es-ES')}
            onChangeText={(NombreUsuario) => this.setState({ NombreUsuario })}
        />
    </Card>
  </View>
</Modal>
  <Header 
    name={name} 
    subtitle={subtitle} 
    goBackEnabled={true} 
    navigationEnabled={true} 
    navigation={navigation}
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
                <Text>Fecha de Apertura:{"\n"}
                  <Text style={{fontSize:12, color:'rgba(0, 0, 0, .5)'}}>
                    Fecha de Apertura
                  </Text>
                </Text>
                <Text>Fecha de Cierre:{"\n"}
                <Text style={{fontSize:12, color:'rgba(0, 0, 0, .5)'}}>
                  Fecha de Cierre
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
          onEndReached={0}
          onEndThreshold={0}
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
        cancelButtonIndex={1}
        //If you want to highlight any specific option you can use below prop
        destructiveButtonIndex={1}
      />
    </View>
    <View style={styles.fab}>
      <FAB
        icon="plus"
        color="#fff"
        onPress={() => this._showModal('opening')} 
        />
    </View> 
    </ScrollView>
    );
  } 
}
const styles = StyleSheet.create({
  Input: {
    color: '#000000',
    fontSize: 14,
    fontWeight:"bold",
    backgroundColor:'#FFFFFF',
},
Card: {
  height:normalize(250),
  borderRadius:-1
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