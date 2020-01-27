import * as React from 'react'
import Screen from './Screen'
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';// tema por defecto de paper

//exportando dimensiones

//exportando todos los componentes 
import Home  from '../Screens/Home'
import Register  from './Register'
import Products  from '../Screens/Products'
  
// Constantes que contienen la navegacion hacia cada componente en especifico , con sus nombres especificos
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
export const CashierManagement = ({navigation}) => <Products navigation={navigation} name="Control de Caja" />
export const SalesManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Ventas" />
export const UsersManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Usuarios" />
export const InventoryManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Inventario" />
export const TableManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Mesas" />
export const TaxReceipt = ({navigation}) => <Screen navigation={navigation} name="Comprobante Fiscal" />



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