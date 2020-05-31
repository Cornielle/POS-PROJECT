import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { categories } from '../Data/dataMenuArrays';
import * as SQLite from "expo-sqlite"
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };
  constructor(props) {
    super(props);
    console.log(categories,'check')
  }


componentDidMount(){

  const sqlStock = "SELECT * FROM Caja WHERE Activo=?"
  const paramsStock = [1];
  const databaseLayerStock = new DatabaseLayer(async () => SQLite.openDatabase('PuntoVentaDb.db'))
  databaseLayerStock.executeSql(sqlStock,paramsStock).then(  ({ rows }) => {
  
   console.log(rows)
  } ) 


}

  onPressCategory = item => {
    const title = item.name;
    const category = item;
    this.props.navigation.navigate('RecipesList', { category, title });
  };
  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        {/* <Image style={styles.categoriesPhoto} source={require('../img/cart.png')} /> */}
        <Image style={styles.categoriesPhoto} source={{uri:item.photo_url}} />
        <Text style={styles.categoriesName}>{item.name}</Text>
      </View>
    </TouchableHighlight>
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
    categoriesItemContainer: {
      flex: 1,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 75,
      borderColor: '#cccccc',
    },
    categoriesPhoto: {
      width: '100%',
      height: 75,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 3
    },
    categoriesName: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      marginTop: 8
    },
    categoriesInfo: {
      marginTop: 3,
      marginBottom: 5
    }
  });
  