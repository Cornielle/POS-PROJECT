import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter,Switch, Route} from "react-router-native";
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
export default class App extends React.Component {
  render(){
    return (
    <NativeRouter>
      <PaperProvider theme={theme}>
      <Switch>
        <View style={styles.container}>
            <Routes/>
        </View>
      </Switch>
      </PaperProvider>
    </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
