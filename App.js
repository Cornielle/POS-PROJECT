import { createAppContainer} from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";
import React from 'react'
import {View} from 'react-native'

//importando variable que continen la navegacion a los componentes
import {
  UsersLogin,
  UsersRegister,
  DashboardHome,
  OpeningClosingCash,
  SalesManagement,
  UsersManagement,
  InventoryManagement,
  CategoryManagement,
  ArticulosManagement,
  Stockmanagement,
  RolesManagement,
  AccionesManagement,
  MenuManagement,
  ArticulosGridManagement,
  RolesMenuManagement,
  RolesGridManagement,
 
} from "./src/Screens";
import { lockToLandscapeLeft } from "react-native-orientation";
 
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  // Fetch the token from storage then navigate to our appropriate place

componentDidMount(){
 this.props.navigation.navigate('Auth');
}
  

  // Render any loading content that you like here
  render() {
    
    return (
      <View>
        {
        }

      </View>
    );
  }
}


//creando los perfiles de navegacion en el drawer navigation
const DrawerNavigation = createDrawerNavigator({
  'Register': {
    screen: UsersRegister,
    navigationOptions: {
      title: 'Registro'
    }
  },
  'Articulos':{
    screen:ArticulosManagement,
    navigationOptions:{
      title:"Articulos"
    }
  },

  'Users':{
    screen: UsersManagement,
    navigationOptions:{
      title:'Users'
    
    }
  },
  'Categorias':{
    screen: CategoryManagement,
    navigationOptions:{
      title:'Categorias'
    }
  },
  'Grid':{
    screen: ArticulosGridManagement,
    navigationOptions:{
      title:'Grid'
    }
  },
  'Vistas':{
    screen: MenuManagement,
    navigationOptions:{
      title:'Menu'
    }
      },
  'Roles':{
    screen: RolesManagement,
    navigationOptions:{
      title:'Roles'
    }
  },
  'Acciones':{
    screen: AccionesManagement,
    navigationOptions:{
    title:'Acciones'
    }      
  },
  'Login': {
    screen: UsersLogin,
    navigationOptions: {
      title: 'Iniciar Sesión'
    }
  },
  'Home': {
    screen: DashboardHome,
    navigationOptions: {
      title: 'Inicio'
    }
  },
  "Roles Menu":{
    screen: RolesMenuManagement,
    navigationOptions:{
    title:"Roles Menu"
    }
  }, 
  "Roles Grid":{
    screen:RolesGridManagement, 
    navigationOptions:{
    title:"Roles Grid"
    }
  },
  'OCCashier': {
  screen: OpeningClosingCash,
  navigationOptions:{
    title:"Apertura/Cierre de caja"
    }
  }, 
});
  /*
  'Control de Ventas': {
    screen: SalesManagement,
    path:'./src/Screens/',
  },
    'Control de Usuarios': {
    screen: UsersLogin,
    path:'./src/Screens/',
    navigationOptions: {
      title: 'Iniciar Sesión'
    }
  },
  'Control de Usuarios': {
    screen: UsersLogin,
    path:'./src/Screens/',
    navigationOptions: {
      title: 'Iniciar Sesión'
    }
  },
  'Control de Inventario': {
    screen: InventoryManagement,
    path:'./src/Screens/',
  },
*/
/*
const AuthStack= createStackNavigator({Login:UsersLogin})
export default createAppContainer(createSwitchNavigator({
AuthLoading:AuthLoadingScreen,
App:DrawerNavigation,
Auth:AuthStack
}))
*/
export default createAppContainer(DrawerNavigation);

