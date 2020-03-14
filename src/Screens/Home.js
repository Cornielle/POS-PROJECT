import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const data = [

{key:"A"},
{key:"B"},
{Key:"C"},
{key:"D"},
{key:"E"},
{key:"F"},
{Key:"G"},
{Key:"H"}
]

const NumColumns = 3;

export default class Home extends Component{

renderItem = ({item, index}) =>{


return(
<View style={styles.item}>

<Text style={styles.itemText}>{item.key}</Text>

</View>



)


}

  render(){
    return (
      <View style={styles.container}>









       { /*
        <Text>eo</Text>
        <Appbar style={styles.bottom}>
          <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
          <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
          <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
          <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
        </Appbar>
        */}
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginVertical:20
  },

item:{
backgroundColor:'#4D243D',
alignItems:'center',
justifyContent:'center',
flex:1,
margin:1,
height: Dimensions.get('window').width/ NumColumns,
},
itemInvisible:{

backgroundColor:'transparent'

},
itemText:{

color:'#fff'


}

});
