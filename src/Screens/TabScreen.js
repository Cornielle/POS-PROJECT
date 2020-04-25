import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
 
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
 
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
 
const ThirdtRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );
  const FourthRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );
   
  const fifthRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    );
    const sixthRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    );
    const SeventhRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    );


const initialLayout = { width: Dimensions.get('window').width };
 
export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
    { key: 'fourth', title: 'Fourth' },
    { key: 'fifth', title: 'Fifth' },
    { key: 'sixth', title: 'Sixth' },
    { key: 'seventh', title: 'Seventh' },
  ]);
 
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third:ThirdtRoute,
    fourth:FourthRoute,
    fifth:fifthRoute,
    sixth:sixthRoute,
    seventh:SeventhRoute
  });
 
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      swipeEnabled={true}
      scrollEnabled={true}
    />
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});