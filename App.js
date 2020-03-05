import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from 'react-navigation-stack'
import React from 'react'
import {View} from 'react-native'

//importando variable que continen la navegacion a los componentes
import {
  UsersLogin,
  UsersRegister,
  DashboardHome,
  CashierManagement,
  SalesManagement,
  UsersManagement,
  InventoryManagement,
  CategoryManagement,
  ArticulosManagemet,
  Stockmanagement,
  RolesManagement,
  AccionesManagement,
  VistasManagement,
ArticulosGreedManagemet
 
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
          /*
        <ActivityIndicator />
        <StatusBar barStyle="default" />
*/
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

    screen:ArticulosManagemet,
    path:'./src/Component',
    navigationOptions:{

      title:"Articulos"
    }
  },

  'Users':{
    screen: UsersManagement,
    path:'./src/Component/',
    navigationOptions:{
    
      title:'Users'
    
    }
  },
  'Categorias':{
screen: CategoryManagement,
path:'./src/Component/',
navigationOptions:{
  title:'Categorias'
}
  },
  'Grid':{
    screen: ArticulosGreedManagemet,
    path:'./src/Component/',
    navigationOptions:{
      title:'Grid'
    }
      },
  'Vistas':{
    screen: VistasManagement,
    path:'./src/Component/',
    navigationOptions:{
      title:'Vistas'
    }
      },
  'Roles':{
    screen: RolesManagement,
    path:'./src/Component/',
    navigationOptions:{
      title:'Roles'
    }
  },
      'Acciones':{
        screen: AccionesManagement,
        path:'./src/Component/',
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

  'Control de Caja': {
    screen: CashierManagement,
    path:'./src/Screens/',
  }, 
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
  'Control de Inventario': {
    screen: InventoryManagement,
    path:'./src/Screens/',
  },

});
/*
const AuthStack= createStackNavigator({Login:UsersLogin})
export default createAppContainer(createSwitchNavigator({
AuthLoading:AuthLoadingScreen,
App:DrawerNavigation,
Auth:AuthStack
}))
*/
export default createAppContainer(DrawerNavigation);

