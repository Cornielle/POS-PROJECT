import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView,  ToastAndroid, Platform} from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import * as Filesystem from "expo-file-system"
import * as SQLite from "expo-sqlite"
import {BaseModel, types} from 'expo-sqlite-orm'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Icon from 'react-native-vector-icons/FontAwesome';
import Empleados from '../../Models/Empleados.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Roles from "../../Models/Roles"
import Menu from "../../Models/Menu"

export default class MenuAccionesScreen extends React.Component{

constructor(obj){

super(obj);

}
 state = {

    IdMenu:0,
    IdAccion:0,
    Comentario:""



 }

componentWillMount(){


}

 

render(){
    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state
return(

    <ScrollView>
    <View style={styles.ViewStyle}>
        {/*Header generico que debe ser reutilizado en casi todas las vistas*/}
        <Header name={name} subtitle={subtitle} goBackEnabled={true} navigationEnabled={false} navigation={navigation}/>
        <View style={styles.Form}>
            <Card>
                <Card.Title 
                    style={styles.Card}
                    title="POS PROJECT" 
                    subtitle="Todas las tiendas en un solo lugar" 
                    left={(props) => <Avatar.Icon {...props} 
                    icon="account" />} 
                />
                <Card.Content>
                <KeyboardAvoidingView>
                    <TextInput
                        style={styles.Input}
                        mode='flat'
                        label='Nombre del Menu'
                        value={this.state.NombreMenu}
                        onChangeText={(NombreMenu)=> this.setState({NombreMenu})}
                    />
                    <Text>{"\n"}</Text>    
                    <TextInput
                        style={styles.Input}
                        mode='flat'
                        label='Label menu'
                        value={this.state.MenuLabel}
                        onChangeText={(MenuLabel)=> this.setState({MenuLabel})}
                    />
                    <Text>{"\n"}</Text>             
                    <Text>Seleccionar el padre del menu</Text>
                    <Picker
                        selectedValue={this.state.IdMenuPadre}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({IdVista: itemValue})
                        }>
                {
                         
                         this.state.Menu.map(xo =>(
                          <Picker.Item label={xo.NombreMenu.toString()} value={xo.Id.toString()} key={xo.Id.toString()} />
                         
                         )
                 
                         )

                 }
                    </Picker>

           
                    <TextInput
                        style={styles.Input}
                        mode='flat'
                        label='Comentarios'
                        value={this.state.Comentario}
                        onChangeText={(Comentario)=> this.setState({Comentario})}
                    />
                    <Text>{"\n"}</Text>      
                    <Button
                        labelStyle={styles.Button} 
                        mode="contained" 
                        onPress={this.GuardarVistas}
                    >
                        <Icon 
                            name="save" 
                            size={15} 
                            color="#ffffff" 
                            style={styles.Icon}
                        /> <Text>{"  "}</Text>   
                        Agregar
                    </Button>
                    </KeyboardAvoidingView>
                </Card.Content>
            </Card>
        </View>
    </View>
    </ScrollView>



)





}





















} 