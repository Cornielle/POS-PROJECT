import * as React from 'react'
import Screen from './Screen'
import { View } from 'react-native'
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';// tema por defecto de paper
//exportando todos los componentes 
import Home  from '../Screens/Home'
import AddUser  from './AddUser'
import Products  from '../Screens/Products'
  
// Constantes que contienen la navegacion hacia cada componente en especifico , con sus nombres especificos
export const Users  = 
({navigation}) =>
    <PaperProvider theme={theme}>
            <AddUser 
                navigation={navigation}
                subtitle="Crear perfil de usuario" 
                name="Añadir usuario" 
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
export const CashierManagement = ({navigation}) => <Products navigation={navigation} name="Control de Caja" />
export const SalesManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Ventas" />
export const UsersManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Usuarios" />
export const InventoryManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Inventario" />
export const TableManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Mesas" />
export const TaxReceipt = ({navigation}) => <Screen navigation={navigation} name="Comprobante Fiscal" />



// configuracion del tema por defecto de react native paper
const theme = {
    ...DefaultTheme,
    roundness: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: '#38ef7d',

    },
  };

  // estilos propios
const styles = {
    container: {
        backgroundColor:'#38ef7d',
        color:'#ffffff'
    },
  };