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

export default class RolesGridScreen extends React.Component{

    constructor(props) {
        super(props);
        this._showMenu = this._showMenu.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

      }
        state = { 
            modalVisible:false,
            Roles:[],
            checked:'unchecked',
            index:0,
            data: [   ],
            optionArray: [
              'Editar',
              'Activar',
              'Detalle',
              'Cancel'
            ],
            filterData:[],
            newData:'',
            text:''
           
        };

        _showMenu(index){
          this.setState({
            index
          })
          this.state.data[index]['estado']
          ? this.state.optionArray[1] = 'Desactivar' 
          : this.state.optionArray[1] = 'Activar'  
        }
        _makeAction(action){    
          switch(action){
            case 0:
              console.log('editar')
              break
            case 1:
              this.state.data[this.state.index]['estado'] = !this.state.data[this.state.index]['estado']
              this.setState({ state: this.state });
              break
            case 2:
              console.log('detalle')
              break
            default:
              break
          }
        }

LoadData = async ()=>{

let Roles =[]
    const sql = 'SELECT * FROM Roles'
    const params = []
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
   databaseLayer.executeSql(sql, params).then( ({ rows }) => {

this.setState ({Roles:rows}) ;
    } )

    console.log(this.state.Roles)

    let arra=[]



}


async componentDidMount(){

   
   
       const sql =   'SELECT * FROM Roles'
       const params = []
       const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
      databaseLayer.executeSql(sql, params).then(({ rows }) => {
       this.setState({Roles:rows})
      
       } )


      
   }

LoadGrid =async () =>{

let arra =[];
console.log(this.state.Roles);
this.state.Roles.map(x =>{
 
    const{Comentario, NombreRol, FechaCreacion } =x

console.log(x)




});



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
        this.LoadGrid();
        const {name, subtitle, navigation} = this.props
        return(
          <View>
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
        );
      } 




}