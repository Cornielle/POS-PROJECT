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
  Stockmanagement
 
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
    path:'./src/Component/',
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

  /*'Stock':{
    screen: Stockmanagement,
    path:'./src/Component/',
    navigationOptions:{
    
      title:'Categorias'
    
    }
  },*/
  'Categorias':{
screen: CategoryManagement,
path:'./src/Component/',
navigationOptions:{

  title:'Categorias'

}
  
  },
  'Login': {
    screen: UsersLogin,
    path:'./src/Component/',
    navigationOptions: {
      title: 'Iniciar Sesión'
    }
  },
  'Home': {
    screen: DashboardHome,
    path:'./src/Screens/',
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
    screen: UsersManagement,
    path:'./src/Screens/',
  },
  'Control de Inventario': {
    screen: InventoryManagement,
    path:'./src/Screens/',
  },

});





const AuthStack= createStackNavigator({Login:UsersLogin})


export default createAppContainer(createSwitchNavigator({
  AuthLoading:AuthLoadingScreen,
App:DrawerNavigation,
Auth:AuthStack



}))

//export default createAppContainer(DrawerNavigation);

