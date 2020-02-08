import * as React from 'react';
import {View , StyleSheet, Picker} from 'react-native'
import { DataTable, Card, Button,Text } from 'react-native-paper';
import Header from '../Components/Header';
import Search from '../Components/Search';
import {  Block  } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';
import { TouchableOpacity } from 'react-native-gesture-handler';


type State = {
  page: number;
  sortAscending: boolean;
  items: Array<{ key: number; name: string; calories: number; fat: number }>;
};




export default class Users extends React.Component {

  state = {
    page: 0,
    sortAscending: true,
    items: [
      {
        key: 1,
        name: 'Cupcake',
        calories: 356,
        fat: 16,
      },
      {
        key: 2,
        name: 'Eclair',
        calories: 262,
        fat: 16,
      },
      {
        key: 3,
        name: 'Frozen yogurt',
        calories: 159,
        fat: 6,
      },
      {
        key: 4,
        name: 'Gingerbread',
        calories: 305,
        fat: 3.7,
      },
      {
        key: 5,
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9,
      },
      {
        key: 6,
        name: 'Jelly Bean',
        calories: 375,
        fat: 0,
      },
    ],
  };
  render() {
    const { name, subtitle, navigation } =  this.props;
    const { sortAscending, page } = this.state;

    const items = 
    this.state.items
      .slice()
      .sort((item1,item2) =>
      (sortAscending
      ? item1.name < item2.name
      : item2.name < item1.name)
        ? 1 : -1
      );
      const itemsPerPage = 2;
      const from = this.state.page * itemsPerPage;
      const to = (this.state.page + 1) * itemsPerPage;
      
    return (
    <View style={styles.Container}>
        <Header name={name} subtitle={subtitle} goBackEnabled={true} 
        navigationEnabled={true} navigation={navigation} />
        <Search query={'test'}/>
        <Block row style={{height:20}}/>
        <Card>
        <DataTable>
        <DataTable.Header>
              <DataTable.Title
                sortDirection={
                  this.state.sortAscending ? 'ascending' : 'descending'
                }
                onPress={() =>
                  this.setState(state => ({
                    sortAscending: !state.sortAscending,
                  }))
                }
                style={styles.first}
              >
                Nombre
              </DataTable.Title>
              <DataTable.Title numeric >Rol</DataTable.Title>
              <DataTable.Title numeric >Estado</DataTable.Title>
              <DataTable.Title numeric ></DataTable.Title>
            </DataTable.Header>
            {/* <DataTable.Row>
              <Icon 
                name="ellipsis-v" 
                size={25} 
                color="#2c3e50" 
                style={styles.Icon}
                />
            </DataTable.Row> */}
            {items.slice(from, to).map(item => (
              <DataTable.Row key={item.key}>
                <DataTable.Cell style={styles.first}>
                  {item.name}
                </DataTable.Cell>
                <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                <DataTable.Cell numeric>
                    <Icon 
                      name="ellipsis-v" 
                      size={25} 
                      color="#2c3e50" 
                      style={styles.Icon} 
                      />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.floor(items.length / itemsPerPage)}
              onPageChange={page => {
                this.setState({ page });
              }}
              label={`${from + 1}-${to} of ${items.length}`}
            />
          </DataTable>
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor:'#f1f1f1'
  },
  Icon:{
    marginTop:normalize(15),
    alignItems: 'flex-end'
  },
    first: {
      flex: 1,
    },
});
