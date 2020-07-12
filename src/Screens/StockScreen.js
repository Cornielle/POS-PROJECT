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
            let stock = [];
            console.log("Database OPEN");
            db.executeSql(`SELECT t1.rowid , NombreArticulo, CantidadActual FROM Articulos as t1 JOIN Almacen as
             t2 ON t1.rowid =  t2.rowid WHERE t2.Activo = 1`,[]).then((result) => {
               for (let i = 0; i < result[0].rows.length; i++) {
                 let row = result[0].rows.item(i);
                 stock.push(row)
               }
               this.setState({
                items:stock
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
  let updateQty = parseInt(this.state.CantidadActual) + parseInt(this.state.items[0].CantidadActual)
  const Model={
    CantidadActual : updateQty,
    // Descripcion : this.state.Descripcion,
    FechaCreacion : new Date(),
    FechaModificacion : null,
    UsuarioCreacion : 'system',
    ArticuloId : this.state.selectedItem.rowid,
    UsuarioModificacion : null,
    IdEmpresa:1,
    IdSucursal:1
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
                  CantidadActual = ? ,FechaModificacion = ? ,
                  UsuarioCreacion = ?  ,UsuarioModificacion = ? WHERE ArticuloId = ${Model.ArticuloId}`,
                  [Model.CantidadActual,
                  Model.FechaModificacion, Model.UsuarioCreacion,Model.UsuarioModificacion]).then(() => {
                    ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
                    this.setState({
                      CantidadActual:'',
                      // Descripcion:'',
                      items: new Array(), 
                      selectedItem: ''
                    })
                    db.executeSql('INSERT INTO AlmacenDetalle(AlmacenId,'+
                    'CantidadIngreso ,IdEmpresa,IdSucursal,FechaCreacion,FechaModificacion,UsuarioCreacion,'+
                    'UsuarioModificacion) VALUES (?,?,?,?,?,?,?,?)',[Model.ArticuloId,Model.CantidadActual,Model.IdEmpresa, Model.IdSucursal,
                      Model.FechaCreacion,Model.FechaModificacion,Model.UsuarioCreacion,Model.UsuarioModificacion]).then((AlmacenResult)=>{
                       console.log("AlmacenDetalle Inserto Correctamente")
                       ToastAndroid.show("Guardado Correctamente",ToastAndroid.SHORT)
                       this.props.toggleForm(false)
                     }).catch((errorStock)=>{
                       console.log(errorStock)
                     });
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
                 }, console.log(item.NombreArticulo, 'aca'));
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
      console.log(items, 'checkingGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
        return (
            // <ScrollView>
            <SafeAreaView>
            <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas */}
                <Header name={'Almacén'} 
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
                            title="Agregar Articulo en Almacén" 
                            left={(props) => <Avatar.Icon {...props} 
                            icon="account" />} 
                        />
                        <Card.Content>
                          {items.length == 0 && 
                            (<Text style={{color:'red' ,textAlign:'center'}}> 
                              No hay articulos registrados 
                            </Text>)
                          }
                        {this.renderSearch()}
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                keyboardType="numeric"
                                label='Agregar Cantidad'
                                value={this.state.CantidadActual}
                                onChangeText={(CantidadActual)=> this.setState({CantidadActual})}
                            />
                              {/* <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Descripcion'
                                value={this.state.Descripcion}
                                onChangeText={(Descripcion)=> this.setState({Descripcion})}
                            /> */}
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

