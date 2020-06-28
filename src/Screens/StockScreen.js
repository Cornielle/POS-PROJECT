import React, {Component, Fragment} from 'react';
import { TextInput, Avatar, Button, Card } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StyleSheet, Text, View, ScrollView, Picker,Alert,  ToastAndroid, SafeAreaView } from 'react-native';
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/FontAwesome';

import  SQLite  from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "PuntoVenta.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

export default class StockScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: '',
      CantidadActual : '',
      Descripcion : '',
      IdEmpresa: '',
      IdSucursal: '',
      FechaCreacion : '',
      FechaModificacion : '',
      UsuarioCreacion : '',
      UsuarioModificacion : '',
      articulos : '',
      disable:'true',
      items: []
    }
    this.insertStock = this.insertStock.bind(this)
    this.renderSearch = this.renderSearch.bind(this)
  }


  /*GET ARTICULOS*/
  componentDidMount(){
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
          )
          .then(DB => {
            db = DB;
            let articulos = [];
            console.log("Database OPEN");
            db.executeSql(`SELECT rowid , NombreArticulo FROM Articulos`,[]).then((result) => {
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 articulos.push(row)
               }
               this.setState({
                items:articulos
               })
               console.log('Articulos Data:',this.state.items.length)
          }).catch((error) =>{      
          console.log("Error a cargar datos");  
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


/*INSERT FUNCTION*/
insertStock = () =>{
  const Model={
    CantidadActual : this.state.CantidadActual,
    Descripcion : this.state.Descripcion,
    FechaCreacion : new Date(),
    FechaModificacion : null,
    UsuarioCreacion : 'system',
    ArticuloId : this.state.selectedItem.rowid,
    UsuarioModificacion : null
  }
  console.log(Model, 'check after post')
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
        )
        .then(DB => {
          db = DB;
          console.log("Database OPEN");
                db.executeSql(`UPDATE Almacen SET
                  CantidadActual = ? , Descripcion = ? , FechaCreacion = ? ,FechaModificacion = ? ,
                  UsuarioCreacion = ?  ,UsuarioModificacion = ? WHERE ArticuloId = ${Model.ArticuloId}`,
                  [Model.CantidadActual,Model.Descripcion,Model.FechaCreacion.toString(),
                  Model.FechaModificacion, Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                    ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
                    this.setState({
                      CantidadActual:'',
                      Descripcion:'',
                      items: new Array(), 
                      selectedItem: ''
                    })
                    this.props.toggleForm(false)
                  }).catch((error) =>{      
                  console.log("ERROR GUARDANDO EN Almacen", error);  
            })
          }).catch((error) =>{      
            console.log("Error a cargar datos", error);  
          });
    })
  });
}
    renderSearch = () =>{
        return (
          <>
            {/* Single */}
            <SearchableDropdown
              onItemSelect={(item) => {
                this.setState({ 
                  selectedItem: item,
                  disable:false
                 }, console.log(item, 'aca'));
              }}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={this.state.items}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "Busca un articulo",
                  underlineColorAndroid: "transparent",
                  style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                  },
                  onTextChange: () => this.setState({
                    disable:true
                  })
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
          />
          </>
    );
    }
    render(){
      const { items}  =  this.state
        return (
            // <ScrollView>
            <SafeAreaView>
            <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas */}
                <Header name={'Stock'} 
                        goBackEnabled={true}
                        goBackNavigationName={'Grid'}
                        navigationEnabled={true}
                        navigation={this.props.navigationValue}
                        toggleFormHeader={this.props.toggleForm}
                        gridHeader={false}
                    />
                <View style={styles.Form}>
                    <Card>
                        <Card.Title 
                            style={styles.Card}
                            title="Agregar Articulo en Stock" 
                            left={(props) => <Avatar.Icon {...props} 
                            icon="account" />} 
                        />
                        <Card.Content>
                          {items.length == 0 && 
                            (<Text style={{color:'red' ,textAlign:'center'}}> No hay articulos registrados </Text>)
                          }
                        {this.renderSearch()}
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Agregar Cantidad'
                                value={this.state.CantidadActual}
                                onChangeText={(CantidadActual)=> this.setState({CantidadActual})}
                            />
                              <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Descripcion'
                                value={this.state.Descripcion}
                                onChangeText={(Descripcion)=> this.setState({Descripcion})}
                            />
                            <Text>{"\n"}</Text>
                            <Button
                              labelStyle={styles.Button} 
                              mode="contained" 
                              onPress={this.insertStock}
                              disabled={this.state.disable}
                            >
                                <Icon 
                                    name="save" 
                                    size={15} 
                                    color="#ffffff" 
                                    style={styles.Icon}
                                /> <Text>{"  "}</Text>     
                                Agregar Articulo
                            </Button>
                        </Card.Content>
                    </Card>
                </View>
            </View>
            </SafeAreaView>
        );

      }
      // render(){return (this.renderSearch())}
    }
    const styles = StyleSheet.create({
      ViewStyle:{
          backgroundColor:"#f6f6f6",
      },
      Form: {
          padding:normalize(15),
          marginBottom:10,
      },
      Input: {
          color: '#161924',
          fontSize: 14,
          fontWeight:"200",
          backgroundColor:'#FFFFFF',
      },
      Button:{
          color:'#ffffff',
      }
  })

