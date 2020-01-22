import React from 'react'
import Screen from './Screen'
export const DashboardHome  = ({navigation}) => <Screen navigation={navigation} name="Dashboard Home" />
export const CashierManagement = ({navigation}) => <Screen navigation={navigation} name="Control de Caja" />
export const SalesManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Ventas" />
export const UsersManagement  = ({navigation}) => <Screen navigation={navigation} name="Control de Usuarios" />
export const InventoryManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Inventario" />
export const TableManagement = ({navigation}) => <Screen navigation={navigation} name="Manejo de Mesas" />
export const TaxReceipt = ({navigation}) => <Screen navigation={navigation} name="Comprobante Fiscal" />