import * as React from 'react';
import {View , StyleSheet} from 'react-native'
import { DataTable, Card, Button,Text } from 'react-native-paper';
import Header from '../Components/Header';
import Search from '../Components/Search';
import {  Block  } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';
export default class Users extends React.Component {
  render() {
    const { name, subtitle, navigation } =  this.props
    return (
    <View style={styles.Container}>
        <Header name={name} subtitle={subtitle} goBackEnabled={true} 
        navigationEnabled={true} navigation={navigation} />
        <Search query={'test'}/>
        <Block row style={{height:20}}/>
        <Card>
        <DataTable>
            <DataTable.Header>
            <DataTable.Title>#</DataTable.Title>  
            <DataTable.Title>Nombre</DataTable.Title>
            <DataTable.Title >Rol</DataTable.Title>
            <DataTable.Title >Estado</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>159</DataTable.Cell>
            <DataTable.Cell>6.0</DataTable.Cell>
            <DataTable.Cell>6.0</DataTable.Cell>
            <Icon 
              name="ellipsis-v" 
              size={25} 
              color="#2c3e50" 
              style={styles.Icon}
              />
            </DataTable.Row>

            <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>Ice</DataTable.Cell>
            <DataTable.Cell >237</DataTable.Cell>
            <DataTable.Cell>8.0</DataTable.Cell>
            <Icon 
              name="ellipsis-v" 
              size={25} 
              color="#2c3e50" 
              style={styles.Icon}
              />
            </DataTable.Row>

            <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={(page) => { console.log(page); }}r
            label="1-2 of 6"
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
  }
});
