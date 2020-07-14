import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react'
import { View}  from 'react-native'


//importando variable que continen la navegacion a los componentes
import {
  UsersLogin,
  DashboardHome,
  SalesManagement,
  UsersManagement,
  InventoryManagement,
  CategoryManagement,
  ArticulosManagement,
  StockManagement,
  RolesManagement,
  AccionesManagement,
  MenuManagement,
  CloseCashierManagement,
  RolesMenuManagement,
  RolesGridManagement,
  MenuAccionesManagement,
  OptionManagement,
  ProveedoresManagement,
  VentasManagement,
  VentasDummyManagement,
  SalidaCajaManagement,
  CierreCajaManagement
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
  'Artículos':{
    screen:ArticulosManagement,
    navigationOptions:{
      title:"Artículos"
    }
  },
  'Stock':{
    screen:StockManagement,
    path:'./src/Component',
    navigationOptions:{
      title:"Almacén"
    }
  },
  'Categorias':{
    screen: CategoryManagement,
    path:'./src/Component/',
    navigationOptions:{
      title:'Categorias'
    }
  },
  'Usuarios':{
    screen: UsersManagement,
    navigationOptions:{
      title:'Empleados'
    }
  },
  'Home':{
    screen:DashboardHome,
    navigationOptions:{
    title:'Inicio'
    }
  },
  // 'Vistas':{
  //   screen: MenuManagement,
  //   navigationOptions:{
  //     title:'Menu'
  //   }
  //     },
  'Roles':{
    screen: RolesGridManagement,
    navigationOptions:{
      title:'Roles'
    }
  },
 /* 'Acciones':{
    screen: AccionesManagement,
    navigationOptions:{
    title:'Acciones'
    }      
  },
  */
  // 'Ventas':{
  //   screen:VentasManagement,
  //   navigationOptions:{
  //   title:'Ventas'
  //   }
  // },
  'Ventas': {
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
 /* "Cierre de Caja":{
    screen:   CloseCashierManagement,
    navigationOptions:{
    title:"Cierre de Caja"
    }
  },  */
  "Salida De Caja":{
   screen: SalidaCajaManagement,
    navigationOptions:{
    title:"Salida Caja"
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
// "Menu Acciones":{
//   screen:MenuAccionesManagement,
//   navigationOptions:{
//   title:"Menu Acciones"
//   }
// },
"Proveedores":{
screen:ProveedoresManagement,
navigationOptions:{
      title:"Proveedores"
    }
  }
  ,
"Cierre De Caja":{
screen:CierreCajaManagement,
navigationOptions:{
      title:"Cierre De Caja"
    }
  }
  
},  {
  initialRouteName: "Home"
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


//CloseCashierGridScreen