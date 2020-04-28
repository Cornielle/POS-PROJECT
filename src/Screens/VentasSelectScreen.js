import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, ScrollView , Text} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Searchbar } from 'react-native-paper';
import { Header, Container, Left, Body , Button, Icon, Title } from 'native-base';

const initialLayout = { width: Dimensions.get('window').width };

export default function VentasSelectScreen(props) {
  const data =  props.data
  const [ready,setReady] = React.useState(false)
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(data);
  useEffect(() =>{  
      
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
          return  <View style={[styles.scene]} />
        default:
          return null;
      }
    };
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
              <Title style={{fontSize:20}}>Escoger Articulos</Title>
            </Body>
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