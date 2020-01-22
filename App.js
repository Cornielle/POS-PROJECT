
import * as React from 'react';

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";

import { Dimensions } from "react-native";

import { Feather } from "@expo/vector-icons";

import {
  DashboardHome,
  CashierManagement,
  SalesManagement,
  UsersManagement,
  InventoryManagement,
  TableManagement,
  TaxReceipt
} from "./src/Screens";
const DrawerNavigation = createDrawerNavigator({
  'Inicio': {
    screen: DashboardHome,
    path:'./src/Screens/',
  },
  'Control de Caja': {
    screen: CashierManagement,
    path:'./src/Screens/',
  }, 
  'Control de Ventas': {
    screen: SalesManagement,
    path:'./src/Screens/',
  },
  'Control de Usuarios': {
    screen: UsersManagement,
    path:'./src/Screens/',
  },
  'Control de Usuarios': {
    screen: UsersManagement,
    path:'./src/Screens/',
  }
  //   CashierManagement,
  //   SalesManagement,
  //   UsersManagement,
  //   InventoryManagement,
  //   TableManagement,
  //   TaxReceipt
  // }
});

export default createAppContainer(DrawerNavigation);



/** Otra manera de hacer las rutas **/

// import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import {NativeRouter,Switch, Route} from "react-router-native";
// import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
// import Routes from './src/Routes';


// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'tomato',
//     accent: 'yellow',
//   },
// };
// export default class App extends React.Component {
//   render(){
//     return (
//     <NativeRouter>
//       <PaperProvider theme={theme}>
//       <Switch>
//         <View style={styles.container}>
//             <Routes/>
//         </View>
//       </Switch>
//       </PaperProvider>
//     </NativeRouter>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
