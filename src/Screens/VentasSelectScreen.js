import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Searchbar } from 'react-native-paper';
import { Checkbox } from 'galio-framework';
import NumericInput from 'react-native-numeric-input'
import { Header, Container, Left, Body , Button,Text, Icon, Title, Spinner, Content,
ListItem, Thumbnail,Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const initialLayout = { width: Dimensions.get('window').width };
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function VentasSelectScreen(props) {
  const data =  props.data
  const [checked, setChecked] = useState(false)
  const [ready,setReady] = useState(false)
  const [index, setIndex] = useState(0);
  const [routes] = useState(data);
  useEffect(() =>{  
    setReady(true)
    console.log(ready)
  }); 
  Object.keys(data).forEach((value, index) =>{
    data[index].key =  data[index].title.toLowerCase();
  })  
  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: '#3F51B5'}}
      indicatorStyle={{ backgroundColor: 'white' }}
      tabStyle={{width:'auto'}}
      scrollEnabled={true}
    />
  );
    const renderScene = ({ route }) => {
      switch (route.key) {
        case route.key:
          return (
          <ScrollView>
          <ListItem thumbnail>
            <Right>
            <Checkbox 
              color="#3F51B5"
              onPress={()=>setChecked(!checked)}  
              initialValue={checked}
            />
            </Right>
            <Left>
              <Thumbnail circle source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
            </Left>
            <Body>  
              <Text style={{fontSize:16}}>Barbie Holiday Castaña 2018 2018 2018</Text>     
              <Text note numberOfLines={1}>RD$ 3,400.00</Text>
            </Body>
            <Right>
            <NumericInput 
              totalWidth={85} 
              totalHeight={45}
              rounded 
            />
            </Right>
        </ListItem>
        </ScrollView>
          )
        default:
          return null;
      }
    };
  if(ready === false){
    return (
      <Container>
        <Content>
        <Spinner color="#3F51B5" style={{ marginTop: windowHeight * 0.4}} />
        </Content>
      </Container>
      );
    }
    return (
      <ScrollView>
          <Container>
            <Header>
              <Left>
                <Button
                onPress={()=>props.visible(false)}
                transparent>
                  <Icon name='arrow-back' /> 
                </Button>
              </Left>
              <Body>
                <Title style={{color:'white',fontSize:20}}>Escoger Articulos</Title>
              </Body>
              <Left>
                <Text style={{color:'white',fontWeight:'bold'}}>Agregar</Text>
              </Left>
            </Header>
          <Searchbar placeholder={'Buscar por Articulo/Codigo'}/>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
          />
        </Container>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});