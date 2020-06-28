import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { Card } from 'react-native-paper';
import { categories } from '../Data/dataMenuArrays';
import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import PosTableCreator from '../Helpers/PosTableCreator'

export default class CloseCashierGridScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };
  constructor(props) {
    super(props);
    console.log(categories,'check')
  }


componentDidMount(){
/*
  const sqlStock = "SELECT * FROM Caja WHERE Activo=?"
  const paramsStock = [1];
  const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
  databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {
  
   console.log(rows)
  } ) 

*/

PosTableCreator();
}

  onPressCategory = item => {
    const title = item.name;
    const category = item;
    this.props.navigation.navigate(item.nav);
  }; 
  renderCategory = ({ item }) => (
    <>
    <TouchableHighlight   underlayColor="#ffffff" onPress={() => this.onPressCategory(item)}>
    <Card style={styles.Card}>
      <View style={styles.menuItemContainer}>
      {(item.name === 'Artículos'? 
      <ImageBackground style={styles.absoluteFillObject} source={require(`../img/cart.png`)}>
      </ImageBackground> 
      : (item.name === 'Stock'? 
      <ImageBackground style={styles.absoluteFillObject} source={require(`../img/stock.png`)}>
      </ImageBackground>  
      : (item.name === 'Categorías'? <ImageBackground style={styles.absoluteFillObject} source={require(`../img/categories.png`)}>
        </ImageBackground> 
      : (item.name === 'Ventas'? <ImageBackground style={styles.absoluteFillObject} source={require(`../img/ventas.png`)}>
        </ImageBackground> 
      :(item.name === 'Usuarios'? <ImageBackground style={styles.absoluteFillObject} source={require(`../img/usuarios.png`)}>
          </ImageBackground> 
      : (item.name === 'Acciones'? <ImageBackground style={styles.absoluteFillObject} source={require(`../img/acciones.png`)}>
    </ImageBackground> 
    :(item.name ==='Roles'? <ImageBackground style={styles.absoluteFillObject} source={require(`../img/roles.png`)}>
    </ImageBackground> :
    <ImageBackground style={styles.absoluteFillObject} source={require(`../img/cierrecaja.png`)}>
    </ImageBackground> 
        ))))))
      )}
      {/* <ImageBackground style={styles.absoluteFillObject} source={require(`../img/cart.png`)}>
        <Text style={styles.menuName}>{item.name}</Text>
      </ImageBackground>
      <ImageBackground style={styles.absoluteFillObject} source={require(`../img/cart.png`)}>
        <Text style={styles.menuName}>{item.name}</Text>
      </ImageBackground>
      <ImageBackground style={styles.absoluteFillObject} source={require(`../img/cart.png`)}>
        <Text style={styles.menuName}>{item.name}</Text>
      </ImageBackground>
      <ImageBackground style={styles.absoluteFillObject} source={require(`../img/cart.png`)}>
        <Text style={styles.menuName}>{item.name}</Text>
      </ImageBackground>
      <ImageBackground style={styles.absoluteFillObject} source={require(`../img/cart.png`)}>
        <Text style={styles.menuName}>{item.name}</Text>
      </ImageBackground> */}
          <View style={styles.overlay} />
      </View>
    <Text style={styles.menuName}>{item.name}</Text>
    </Card>
    </TouchableHighlight>
    </>
  );
  render() {
    return (
      <View>
        <FlatList
          data={categories}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding:10   
  },
    menuItemContainer: {
      flex: 1,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      backgroundColor:'rgba(0,0,0,1)',
    },
    Card: {
      borderRadius:10,
      width:'100%',
      marginTop:5,
      elevation:5,
      marginBottom:5
    },  
    menuPhoto: {
      width: '100%',
      height: 75,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowOffset: {
        width: 0,
        height: 3
      },  
    },
    menuName: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#383838',
      marginBottom:3
    },
    menuInfo: {
      marginTop: 3,
      marginBottom: 5
    },
    absoluteFillObject: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,     
    }
  });
  