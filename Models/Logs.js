import React from "react"
import * as SQLite from 'expo-sqlite'
import {BaseModel,types} from 'expo-sqlite-orm'

export default class Logs extends BaseModel {

constructor(obj){


super(obj)

}

static get database () {

return () => SQLite.openDatabase("PuntoVentaDb.db");
}

}