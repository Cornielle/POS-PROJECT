import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react'
import { View}  from 'react-native'

//importando variable que continen la navegacion a los componentes
import {
  UsersLogin,
  DashboardHome,
  // OpeningClosingCash,
  SalesManagement,
  UsersManagement,
  InventoryManagement,
  CategoryManagement,
  ArticulosManagement,
  StockManagement,
  RolesManagement,
  AccionesManagement,
  MenuManagement,
// ArticulosGreedManagemet,
  RolesMenuManagement,
  RolesGridManagement,
  MenuAccionesManagement,
  OptionManagement,
  ProveedoresManagement,
  VentasManagement,
  VentasDummyManagement
} from "./src/Screens";
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
  // 'Login': {
  //   screen: UsersLogin,
  //   navigationOptions: {
  //     title: 'Iniciar Sesión'
  //   }
  // },
  'Articulos':{
    screen:ArticulosManagement,
    navigationOptions:{
      title:"Articulos"
    }
  },
  'Stock':{
    screen:StockManagement,
    path:'./src/Component',
    navigationOptions:{
      title:"Stock"
    }
  },
  'Users':{
    screen: CategoryManagement,
    path:'./src/Component/',
    navigationOptions:{
      title:'Categorias'
    }
  },
  'Usuarios':{
    screen: UsersManagement,
    navigationOptions:{
      title:'Users'
    }
  },
  'Vistas':{
    screen: MenuManagement,
    navigationOptions:{
      title:'Menu'
    }
      },
  'Roles':{
    screen: RolesGridManagement,
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
  // 'Ventas':{
  //   screen:VentasManagement,
  //   navigationOptions:{
  //   title:'Ventas'
  //   }
  // },
  'ventasdummy': {
    screen:VentasDummyManagement,
    navigationOptions:{
    title:'Ventas'
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
  // "Roles Grid":{
  //   screen:RolesGridManagement, 
  //   navigationOptions:{
  //   title:"Roles Grid"
  //   }
  // },
  // 'OCCashier': {
  // screen: OpeningClosingCash,
  // navigationOptions:{
  //   title:"Apertura/Cierre de caja"
  //   }
  // },
"Menu Acciones":{
  screen:MenuAccionesManagement,
  navigationOptions:{
  title:"Menu Acciones"
  }
},
"Proveedores":{
screen:ProveedoresManagement,
navigationOptions:{
      title:"Proveedores"
    }
  }
})
 //export default createAppContainer(DrawerNavigation);
  
/*
  'Control de Caja': {
    screen: CashierManagement,
    path:'./src/Screens/',
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
});

*/

const  navigationOptions = {
  title: 'Iniciar Sesión',
  headerTitleStyle:{textAlign:'center', color:'white'},
  headerStyle:{backgroundColor:'green'},
  headerTitleAlign: 'center'
}

const AuthStack= createStackNavigator({
  "Iniciar Sesión":UsersLogin
},
{
  defaultNavigationOptions: 
    navigationOptions
  
})
export default createAppContainer(createSwitchNavigator({
  AuthLoading:AuthLoadingScreen,
  App:DrawerNavigation,
  Auth:AuthStack
}))
