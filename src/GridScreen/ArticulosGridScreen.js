import React from 'react';
import { ListItem, FormLabel, FormInput } from 'react-native-elements'
import { Badge,Searchbar,Card, TextInput , Title,Paragraph, Avatar,  } from 'react-native-paper'
import { View, StyleSheet, Modal,Text, Button, Image,ScrollView} from 'react-native'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import * as Filesystem from "expo-file-system"
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import Empleados from '../../Models/Empleados'




export default class ArticulosGridScreen extends React.Component{

    constructor(props) {

    
        super(props);

        this.LoadEmpleadoData()  
        this._showMenu = this._showMenu.bind(this);
        // this.searchFilterFunction = this.searchFilterFunction.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    
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
const{Id, NombrePersona, NombreUsuario, Telefono, TipoIdentificacion, Roll, Activo} = x;
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
//console.log(this.state.data)

    }


 componentDidMount(){

    
        }

      
FillEmpleado = async (id) =>{
 
try{

  const {key} = id;
  console.log(key);
   const Empleado = await Empleados.find(key)

   this.setState({Empleado})

   console.log(this.state.Empleado);

}

catch(ex){

Alert.alert("Ha ocurrido el siguiente error: "+ex);

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

          //  console.log(idIndex);

            const id = this.state.data[idIndex];

          switch(action){
            case 0:

              console.log('editar')
                   
           
              this.FillEmpleado(id)

              this._showModal()
              break
            case 1:
              this.state.data[this.state.index]['estado'] = !this.state.data[this.state.index]['estado']
              this.setState({ state: this.state });
         
              break
            case 2:
            //console.log("Detalle");
          
               //   console.log(obj);

              // console.log(id)

             this.FillEmpleado(id)

              this._showModal()
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

<ScrollView>



          <View>


<Modal visible={visible}>

<View style={styles.Form}> 
<Card>
    <Card.Title title="Perfil De usuario" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
    <Card.Content>
    <View style={styles.Boxone}>

<Image style={styles.ImageBox} source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
</View>
    </Card.Content>
    { /*   <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}

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



    
    <Card.Actions>

      <Button title="Cerrar"onPress={this._hideModal} ></Button>
    </Card.Actions>
  </Card>
{
  /*
<Card>

<Card.Content>




<View style={styles.Boxone}>

<Image style={styles.ImageBox} source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
</View>

<View style={styles.Boxtwo}>


<TextInput label="Etiqueta" style={styles.Input} mode="flat" value=""  />
<TextInput label="Etiqueta" style={styles.Input} mode="flat" value=""  />
<TextInput label="Etiqueta" style={styles.Input} mode="flat" value=""  />
<TextInput label="Etiqueta" style={styles.Input} mode="flat" value=""  />
<TextInput label="Etiqueta" style={styles.Input} mode="flat" value=""  />
<TextInput label="Etiqueta" style={styles.Input} mode="flat" value=""  />
<TextInput label="Etiqueta" style={styles.Input} mode="flat" value=""  />

</View>

<Button onPress={this._hideModal} title="Cerrar Modal"></Button>

</Card.Content>
</Card>

*/
}
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
    
              <View>

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
                        onPress={() => this._showMenu(index)}
                        leftAvatar={{ source: { uri: item.avatar_url } }}
                        rightAvatar={ item.estado === true ? <Badge>Activado</Badge> : <Badge>Desactivado</Badge>}
                        title={item.name}
                        subtitle={item.subtitle}
                        icon=""
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
                  cancelButtonIndex={3}
                  //If you want to highlight any specific option you can use below prop
                  destructiveButtonIndex={1}
                />
          </View>
          </ScrollView>
        );
      } 

}

const styles = StyleSheet.create({

  Input: {
    color: '#161924',
    fontSize: 14,
    fontWeight:"200",
    backgroundColor:'#FFFFFF',
},
Form: {
  padding:normalize(15),
  marginBottom:10,
},

ModalStyle:{
flex:1,
},
 
ImageBox:{
  width:200,
  height:150,
  marginTop:15,
  borderWidth:1,
borderColor:'#F44336'
},
 Boxone:{

backgroundColor:"red",
justifyContent:"center",
alignItems:"center"

 },
 Boxtwo:{
 flex:4,
 backgroundColor:"blue"


 }






});