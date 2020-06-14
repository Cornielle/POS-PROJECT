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
const items= [];

export default class StockScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      selectedItem: '',
      CantidadActual : '',
      Descripcion : '',
      IdEmpresa: '',
      IdSucursal: '',
      FechaCreacion : '',
      FechaModificacion : '',
      UsuarioCreacion : '',
      UsuarioModificacion : '',
      articulos : ''
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
                 items.push(row)
               }
               ToastAndroid.show("Cargado Correctamente",ToastAndroid.SHORT)
               console.log('Articulos Data:',items)
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
    Activo : 1,
    IdEmpresa : 1,
    ArticuloId : this.state.selectedItem.rowid,
    IdSucursal : 1,
    FechaCreacion : new Date(),
    FechaModificacion : null,
    UsuarioCreacion : 'system',
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
          db.executeSql(`SELECT rowid , CantidadActual FROM Almacen WHERE ArticuloId = ${Model.ArticuloId}`,[]).then((result) => {
            result.map(item=>{
              console.log(item.rows.length, 'checkinggg')
              if(item.rows.length > 0 ){
                ToastAndroid.show("Articulo ya existente en almacen, favor escoger otro articulo",ToastAndroid.SHORT)
                return
              } else {
                db.executeSql(`INSERT INTO Almacen (ArticuloId,
                  CantidadActual , Descripcion ,
                  Activo  , IdEmpresa , IdSucursal , 
                  FechaCreacion ,FechaModificacion ,
                  UsuarioCreacion  ,UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                  [Model.ArticuloId, Model.CantidadActual,Model.Descripcion,Model.Activo,Model.IdEmpresa,
                  Model.IdSucursal,Model.FechaCreacion.toString(),Model.FechaModificacion,
                  Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                    console.log("Guardado Correctamente");
                    ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
                  }).catch((error) =>{      
                  console.log("ERROR GUARDANDO EN STOCK");  
                });
              }
            })
          }).catch((error) =>{      
            console.log("Error a cargar datos", error);  
          });
      })
    })
  });
}
    renderSearch = () =>{
        return (
          <>
            {/* Single */}
            <SearchableDropdown
              onItemSelect={(item) => {
                this.setState({ selectedItem: item }, console.log(item));
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
              items={items}
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
                  onTextChange: text => alert(text)
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

