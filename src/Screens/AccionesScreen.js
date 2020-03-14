import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker,Alert, KeyboardAvoidingView } from 'react-native';
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


export default class AccionesScreen extends React.Component{


constructor(props){

super(props)

}
state ={

    IdVista:"",
    NombreControl:"",
    TipoControl:"",
    Comentario:""

}

componentDidMount(){



    
}
render(){
 

    const {name, subtitle, navigation} = this.props
    const { text,enabled, checked } =  this.state
    return (
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

                    <Text>Seleccionar una vistas</Text>
                            <Picker
                                selectedValue={this.state.IdVista}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({IdVista: itemValue})
                                }>
                                <Picker.Item label="Rol 1" value="1" />
                                <Picker.Item label="Rol 2" value="2" />
                            </Picker>

                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Nombre Del Control'
                            value={this.state.NombreControl}
                            onChangeText={(NombreControl)=> this.setState({NombreControl})}
                        />
                        <Text>{"\n"}</Text>                
                        <Text>Seleccionar una vistas</Text>
                            <Picker
                                selectedValue={this.state.IdVista}
                                style={{height: 50, width: 200}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({IdVista: itemValue})
                                }>
                                <Picker.Item label="Rol 1" value="1" />
                                <Picker.Item label="Rol 2" value="2" />
                            </Picker>

                        <Text>{"\n"}</Text>  
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Comentario'
                            value={this.state.Comentario}
                            onChangeText={(Comentario) => this.setState({ Comentario })}
                        />
                        <Text>{"\n"}</Text>
                     
                        <Button
                            labelStyle={styles.Button} 
                            mode="contained" 
                            onPress={this.GuardarRol}
                        >
                            <Icon 
                                name="save" 
                                size={15} 
                                color="#ffffff" 
                                style={styles.Icon}
                            /> <Text>{"\n"}</Text>   
                            Agregar
                        </Button>
                        </KeyboardAvoidingView>
                    </Card.Content>
                </Card>
            </View>
        </View>
        </ScrollView>
    );
    }


}


const styles = StyleSheet.create({
    ViewStyle:{
        backgroundColor:"#f6f6f6",
    },
    Form: {
        padding:normalize(15),
        marginBottom:10,
    },
    Input: {
        color: '#161924',
        fontSize: 14,
        fontWeight:"200",
        backgroundColor:'#FFFFFF',
    },
    Button:{
        color:'#ffffff',
    }
})
