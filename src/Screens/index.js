import * as React from 'react'
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';// tema por defecto de paper

//exportando todos los componentes 
import Home  from './Home'
import Register  from './Register'
import Products  from './Products'
import Login  from './Login'
import CategoriasGridScreen from "../GridScreen/CategoriasGridScreen"
import Articulos from "../Fields/Articulos"
import Stock from '../Fields/Stock'
import Categorias from "./Categorias"
import StockGridScreen from '../GridScreen/StockGridScreen'
import Users  from './Users'
import RolesScreen from './RolesScreen'
import AccionesGridScreen  from '../GridScreen/AccionesGridScreen'
import MenuGridScreen from '../GridScreen/MenuGridScreen'
import UsersGridScreen from "../GridScreen/UsersGridScreen"
import OpeningClosingGridScreen from "../GridScreen/OpeningClosingGridScreen"
import RolesMenuScreen from "./RolesMenuSceen"
import RolesGridScreen  from "../GridScreen/RolesGridScreen"
import ArticulosGridScreen from "../GridScreen/ArticulosGridScreen";
import AccionesMenuGridScreen from "../GridScreen/MenuGridScreen" 
import OptionScreen from "./OptionScreen"
import ProovedoresGridScreen from "../GridScreen/ProveedoresGridScreen"
import Acciones from '../../Models/Acciones';

//import Users from './Users'

// Constantes que contienen la navegacion hacia cada componente en especifico , con sus nombres especificos//
export const UsersRegister  = 
({navigation}) =>
    <PaperProvider theme={theme}>
            <Register 
                navigation={navigation}
                name="Registro"
                subtitle="Crear perfil de usuario" 
            />
    </PaperProvider>
export const DashboardHome  = 
({navigation}) => 
    <PaperProvider theme={theme}> 
        <Home 
            navigation={navigation}
            name="Home"
            subtitle="Inicio" 
        />    
    </PaperProvider>
export const UsersLogin = 
({navigation}) => 
    <PaperProvider theme={theme}> 
        <Login 
            navigation={navigation} 
            name="Iniciar Sesión"
            />
    </PaperProvider>
export const OpeningClosingCash = 
({navigation}) => 
    <OpeningClosingGridScreen 
        navigation={navigation} 
        name="Apertura/Cierre de Caja" 
    />
export const ArticulosManagement =({navigation}) => <ArticulosGridScreen navigation={navigation} subtitle="Articulos" name="Control de Articulos" />



export const CashierManagement = ({navigation}) => <Products navigation={navigation} name="Control de Caja" />
export const SalesManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Ventas" />
export const InventoryManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Inventario" />
export const TableManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Mesas" />
export const TaxReceipt = ({navigation}) => <Screen navigation={navigation} name="Comprobante Fiscal" />
export const CategoryManagement =({navigation}) => <CategoriasGridScreen navigation ={navigation} subtitle="Categorias" name="Categorias" />
// export const ArticulosManagemet =({navigation}) => <Articulos navigation={navigation} subtitle="Articulos" name="Articulos del stock" />
export const StockManagement =({navigation}) => <StockGridScreen navigation={navigation} subtitle="Stock" name="Stock"  />
export const RolesManagement = ({navigation}) => <RolesScreen navigation={navigation} subtitle="Roles" name="Roles" />
export const AccionesManagement = ({navigation}) => <AccionesGridScreen navigation={navigation} subtitle="Control de Acciones" name="Acciones" />
export const MenuManagement = ({navigation}) => <MenuGridScreen navigation={navigation} subtitle ="Menu" name="Control de Menu" />
export const UsersManagement = ({navigation}) => <UsersGridScreen navigation={navigation} subtitle="Control de Usuarios" name="Usuarios" />
export const RolesMenuManagement = ({navigation}) => <RolesMenuScreen navigation={navigation} subtitle="Roles Menu" name="Roles Menu" />
export const RolesGridManagement = ({navigation}) => <RolesGridScreen navigation={navigation} subtitle="Roles" name="Roles" />
export const MenuAccionesManagement =({navigation}) => <AccionesMenuGridScreen navigation={navigation} subtitle="Menu Acciones" name="Menu Acciones" />
export const OptionManagement = ({navigation}) =><OptionScreen navigation={navigation} subtitle="Opciones" name="Opciones" />
export const ProveedoresManagement = ({navigation}) => <ProovedoresGridScreen navigation={navigation} subtitle="Proveedores" name="Proveedores" /> 
// configuracion del tema por defecto de react native paper
const theme = {
    ...DefaultTheme,
    roundness: 4,
    mode:'adaptive',
    colors: {
      ...DefaultTheme.colors,
      primary: '#42b842',

    },
  };

