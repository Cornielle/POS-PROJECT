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

export const CashierManagement = ({navigation}) => <Products navigation={navigation} name="Control de Caja" />
export const SalesManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Ventas" />
export const UsersManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Usuarios" />
export const InventoryManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Inventario" />
export const TableManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Mesas" />
export const TaxReceipt = ({navigation}) => <Screen navigation={navigation} name="Comprobante Fiscal" />
export const CategoryManagement =({navigation}) => <Categorias navigation ={navigation} subtitle="Categorias" name="Categorias" />
export const ArticulosManagemet =({navigation}) => <Articulos navigation={navigation} subtitle="Articulos" name="Articulos del stock" />
export const StockManagement =({navigation}) => <Stock navigation={navigation} subtitle="Stock" name="Stock" ></Stock>
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

