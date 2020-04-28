import React from 'react';
import { ListItem } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , FAB } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import  ModalControls from '../Components/ModalControls'
import { View, StyleSheet, Modal, Text, Image,ScrollView, ToastAndroid} from 'react-native'
import normalize from 'react-native-normalize';
import HeaderGrid from '../Components/HeaderGrid'
import Articulos from '../../Models/Articulos';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';

import ArticulosFields from '../../src/Fields/Articulos'
export default class ArticulosGridScreen extends React.Component{
    constructor(props) {
        super(props);
        this.LoadArticuloData()  
        this.editField = this.editField.bind(this);
        this._showMenu = this._showMenu.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
        this.saveEdit = this.saveEdit.bind(this)        
        this.stateArticle =  this.stateArticle.bind(this)
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
        Articulo:{
        id:0,
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
        HoraCreacion:''
        },
    };

 
  _showModal = () => this.setState({visible:true})
  _hideModal = () => this.setState({visible:false})
  LoadArticuloData = async () =>{
    const options ={
        columns:`id,Codigo,CategoriaId,Descripcion,DescripcionPantalla,NombreArticulo,CodigoDeBarra,PrecioCosto,PrecioVenta,
         ProveedoresId,CatidadExistencia,MedidaDeVenta,Activo,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,
         UsuarioCreacion,UsuarioModificacion`,
        where:{
        Id_gt:0
        },
        page:1,
        limit:30
    }    

  
  const artiobj = await Articulos.query(options) 
  let arra =[]
  this.state.HoraCreacion = ''
  artiobj.map(x => {
    const{id, NombreArticulo, PrecioCosto,FechaCreacion,PrecioVenta, Activo} = x;
    console.log(PrecioCosto,'costo')
    let date = FechaCreacion.split(' ');
    var objeto  ={
    key: id,
    name:NombreArticulo,
    FechaCreacion:`${date[2]}/${date[1]}/${date[3]}` ,
    HoraCreacion: date[4][0]+date[4][1] > 11 && date[4][0]+date[4][1] < 23 ? `${ date[4]}PM` :`${ date[4]}AM`,
    avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: `Costo: RD$ ${PrecioCosto} ${"\n"}Venta: RD$ ${PrecioVenta}`,
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
    this.LoadArticuloData() 
    // const crear = await Articulos.createTable(); 
  }
  forceUpdateHandle(){
    this.setState({state:this.state})
    this.forceUpdate();
  }
  saveEdit = async () =>{ 
    try{
      const props =  {
        id: this.state.Articulo.id,
        Activo: this.state.Articulo.Activo,
        CategoriaId: 0,
        CatidadExistencia: this.state.Articulo.CatidadExistencia,
        Codigo: this.state.Articulo.Codigo,
        CodigoDeBarra: this.state.Articulo.CodigoDeBarra,
        Descripcion: this.state.Articulo.Descripcion,
        DescripcionPantalla: this.state.Articulo.DescripcionPantalla,
        FechaCreacion: this.state.Articulo.FechaCreacion,
        FechaModificacion: this.state.Articulo.FechaModificacion,
        IdEmpresa: this.state.Articulo.IdEmpresa,
        IdSucursal: this.state.Articulo.IdSucursal,
        MedidaDeVenta: this.state.Articulo.MedidaDeVenta,
        NombreArticulo: this.state.Articulo.NombreArticulo,
        PrecioCosto: this.state.Articulo.PrecioCosto,
        PrecioVenta: this.state.Articulo.PrecioVenta,
        ProveedoresId: this.state.Articulo.ProveedoresId,
        UsuarioCreacion: this.state.Articulo.UsuarioCreacion,
        UsuarioModificacion: this.state.Articulo.UsuarioModificacion,
      }
      const response = await Articulos.update(props)
      if(Object.keys(response).length <=0){
        ToastAndroid.show("Error al insertar en la base de datos",ToastAndroid.SHORT);
      }else{
        ToastAndroid.show("Guardado Correctamente!", ToastAndroid.SHORT);
        this.state.visible = false
        this.LoadArticuloData()
      }
    }
  catch(ex){
        console.log(ex, 'fatal error')
    }
  }
  FillArticulo = async (id) =>{
    try{
      const {key} = id;
      const Articulo = await Articulos.find(key)
      this.setState({Articulo})
    }
    catch(ex){
    Alert.alert("Ha ocurrido el siguiente error: "+ex);
    }
  }

  stateArticle = async (id) =>{ 
    const savingState= await Articulos.find(id)
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
        modalTitle:'Detalles Articulo',
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
        modalTitle:'Editar Articulo',
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
    else if(name==='CatidadExistencia'){
      this.setState({CatidadExistencia:fieldValue})
      this.state.Articulo.CatidadExistencia = fieldValue
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
    else if(name==='UsuarioCreacion'){
      this.setState({UsuarioCreacion:fieldValue})
      this.state.Articulo.UsuarioCreacion = fieldValue
    } 
    else if(name==='UsuarioModificacion'){
      this.setState({UsuarioModificacion:fieldValue})
      this.state.Articulo.UsuarioModificacion = fieldValue
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
            value={this.state.Articulo.Descripcion !==null ? this.state.Articulo.Descripcion : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(Descripcion)=> this.editField(Descripcion, 'Descripcion')}
          />) :
          (<Text style={{color:'#000',padding:20}}>
            Descripción: {"\n"} {"\n"}   {this.state.Articulo.Descripcion}        
          </Text>)
          }
        </Card>
      </Card.Content>
        <TextInput
            style={styles.Input}
            mode='flat'
            label='Nombre del Articulo'
            value={this.state.Articulo.NombreArticulo !==null ? this.state.Articulo.NombreArticulo : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(NombreArticulo)=> this.editField(NombreArticulo, 'NombreArticulo')}
            />
                <TextInput
            style={styles.Input}
            mode='flat'
            label='Código del Articulo'
            value={this.state.Articulo.Codigo !==null ? this.state.Articulo.Codigo : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(Codigo) => this.editField(Codigo,'Codigo')}
            />
                <TextInput
            style={styles.Input}
            mode='flat'
            label='Codigo de Barra'
            value={this.state.Articulo.CodigoDeBarra !==null ? this.state.Articulo.CodigoDeBarra : 'Cargando...'}
            disabled={editFields}
            onChangeText={(CodigoDeBarra) => this.editField(CodigoDeBarra,'CodigoDeBarra')}
            />
                <TextInput
            style={styles.Input}
            mode='flat'
            label='Cantidad en Existencia'
            value={this.state.Articulo.CatidadExistencia !==null ? this.state.Articulo.CatidadExistencia.toString() : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(CatidadExistencia) => this.editField(CatidadExistencia,'CatidadExistencia')}
            />
                <TextInput
            style={styles.Input}
            mode='flat'
            label='Precio de Costo'
            value={this.state.Articulo.PrecioCosto !==null ? this.state.Articulo.PrecioCosto : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(PrecioCosto) => this.editField( PrecioCosto, 'PrecioCosto' )}
            />
                <TextInput
            style={styles.Input}
            mode='flat'
            label='Precio de Venta'
            value={this.state.Articulo.PrecioVenta !==null ? this.state.Articulo.PrecioVenta : 'Cargando...'}
            disabled={editFields}
            editable={true}
            onChangeText={(PrecioVenta) => this.editField( PrecioVenta, 'PrecioVenta' )}
            />
            {this.state.editFields &&
            <View>
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
        &&(<ArticulosFields navigationValue={this.props.navigation} toggleForm={this._toggleForm}/>)
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