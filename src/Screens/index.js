import * as React from 'react'
import Screen from './Screen'
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';// tema por defecto de paper

//exportando todos los componentes 
import Home  from './Home'
import Register  from './Register'
import Products  from './Products'
import Login  from './Login'
import Categorias from "./Categorias"
import Articulos from "./Articulos"
import Stock from './Stock'
import Users  from './Users'
import RolesScreen from './RolesScreen'
import AccionesScreen from './AccionesScreen'
import MenuScreen from './MenuScreen'
import ArticulosGridScreen from "../GridScreen/ArticulosGridScreen"
import RolesMenuScreen from "./RolesMenuSceen"
import RolesGridScreen  from "../GridScreen/RolesGridScreen"
import MenuAccionesScreen from "./MenuAccionesScreen" 
import OptionScreen from "./OptionScreen"

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
            name="Control de Usuarios"
            />
    </PaperProvider>
export const UsersManagement  = 
({navigation}) => 
    <PaperProvider theme={theme}> 
        <Users 
            navigation={navigation} 
            name="Control de Usuarios"
            subtitle="Manejo de control de usuarios" 
        />
    </PaperProvider>
export const CashierManagement = ({navigation}) => <Products navigation={navigation} name="Control de Caja" />
export const SalesManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Ventas" />
export const InventoryManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Inventario" />
export const TableManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Mesas" />
export const TaxReceipt = ({navigation}) => <Screen navigation={navigation} name="Comprobante Fiscal" />
export const CategoryManagement =({navigation}) => <Categorias navigation ={navigation} subtitle="Categorias" name="Categorias" />
export const ArticulosManagemet =({navigation}) => <Articulos navigation={navigation} subtitle="Articulos" name="Articulos del stock" />
export const StockManagement =({navigation}) => <Stock navigation={navigation} subtitle="Stock" name="Stock" ></Stock>
export const RolesManagement = ({navigation}) => <RolesScreen navigation={navigation} subtitle="Roles" name="Roles" />
export const AccionesManagement = ({navigation}) => <AccionesScreen navigation={navigation} subtitle="Acciones" name="Acciones" />
export const MenuManagement = ({navigation}) => <MenuScreen navigation={navigation} subtitle ="Menu" name="Menu" />
export const ArticulosGreedManagemet = ({navigation}) => <ArticulosGridScreen navigation={navigation} subtitle="Grid" name="Grid" />
export const RolesMenuManagement = ({navigation}) => <RolesMenuScreen navigation={navigation} subtitle="Roles Menu" name="Roles Menu" />
export const RolesGridManagement = ({navigation}) => <RolesGridScreen navigation={navigation} subtitle="Roles" name="Roles" />
export const MenuAccionesManagement =({navigation}) => <MenuAccionesScreen navigation={navigation} subtitle="Menu Acciones" name="Menu Acciones" />
export const OptionManagement = ({navigation}) =><OptionScreen navigation={navigation} subtitle="Opciones" name="Opciones" />
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

