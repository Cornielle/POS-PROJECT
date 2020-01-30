import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DbCreator from "./Source/Components/DbCreator"
import QueryCreator from "./Source/Components/QueryCreator"
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import Estudiantes from './Models/Estudiantes'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Empleados from './Models/Empleados'
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";


//importando variable que continen la navegacion a los componentes
import {
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
      title: 'Sesion'
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

