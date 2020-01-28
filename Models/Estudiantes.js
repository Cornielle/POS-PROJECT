import React from 'react'
import{View} from 'react-native'
import{BaseModel, types} from 'expo-sqlite-orm'
import * as SQLite from 'expo-sqlite'

export default class Estudiantes extends BaseModel{

constructor(obj){
super(obj)
}

static get database(){

return async () => SQLite.openDatabase('PuntoVentaDb.db')
}

static get tableName(){

return 'Estudiantes'
}

static get columnMapping(){
return{
Id:{type:types.INTEGER, primary_key:true},
Calificaciones:{type:types.INTEGER, not_null:true},
NombreEstudiante:{type: types.TEXT , not_null:true },

}




}

}