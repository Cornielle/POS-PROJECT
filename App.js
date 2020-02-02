import { createAppContainer } from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";

//importando variable que continen la navegacion a los componentes
import {
  UsersLogin,
  UsersRegister,
  DashboardHome,
  CashierManagement,
  SalesManagement,
  UsersManagement,
  InventoryManagement,
} from "./src/Screens";

//creando los perfiles de navegacion en el drawer navigation
const DrawerNavigation = createDrawerNavigator({
  'Register': {
    screen: UsersRegister,
    path:'./src/Component/',
    navigationOptions: {
      title: 'Registro'
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
  }
});

export default createAppContainer(DrawerNavigation);

