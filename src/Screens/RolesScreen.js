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

export default class RolesScreen extends Component{


constructor(props){
super(props)

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
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Nombre'
                            value={this.state.NOMBRE}
                            onChangeText={(NOMBRE)=> this.setState({NOMBRE})}
                        />
                        <Text>{"\n"}</Text>                
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Apellidos'
                            value={this.state.APELLIDO}
                            onChangeText={(APELLIDO) => this.setState({ APELLIDO })}
                        />
                        <Text>{"\n"}</Text>
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Nombre Usuario'
                            value={this.state.NOMBREUSUARIO}
                            onChangeText={(NOMBREUSUARIO) => this.setState({ NOMBREUSUARIO })}
                        />
                        <Text>{"\n"}</Text>
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Telèfono'
                            keyboardType="numeric"
                            value={this.state.TELEFONO}
                            onChangeText={(TELEFONO) => this.setState({ TELEFONO })}
                        />
                        <Text>{"\n"}</Text>
                        <Block row style={{paddingLeft:normalize(10)}}>
                        <Text style={{fontWeight:'bold'}}>Tipo de Identificaciòn:      </Text>
                        <View>
                            <Text>Cedula</Text>
                            <RadioButton
                                value="Cedula"
                                status={this.state.TIPOIDENTIFICACION === 'Cedula' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({TIPOIDENTIFICACION: 'Cedula' }); }}
                            />
                        </View>
                        <Block row style={{paddingLeft:normalize(35)}} />
                        <View>
                            <Text>Pasaporte</Text>
                            <RadioButton
                                value="Pasaporte"
                                status={this.state.TIPOIDENTIFICACION === 'Pasaporte' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ TIPOIDENTIFICACION: 'Pasaporte' }); }}
                            />
                        </View>
                        </Block>
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label=''
                            placeholder={'XXX-XXXXXXX-X'}
                            value={this.state.IDENTIFICACION}
                            onChangeText={IDENTIFICACION => this.setState({ IDENTIFICACION })}
                        />
                        <Block row style={{paddingBotton:normalize(15)}} />
                        <Text>{"\n"}</Text>

                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Correo'
                            value={this.state.CORREO}
                            onChangeText={(CORREO) => this.setState({ CORREO })}
                        />
                        <Text>{"\n"}</Text>

                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Contraseña'
                            value={this.state.CONTRASENA}
                            onChangeText={CONTRASENA => this.setState({ CONTRASENA })}
                        />
                        <Text>{"\n"}</Text>
                        <TextInput
                            style={styles.Input}
                            mode='flat'
                            label='Repetir contraseña'
                            value={this.state.CONTRASENA2}
                            onChangeText={CONTRASENA2 => this.setState({ CONTRASENA2 })}
                        />
                        <Text>{"\n"}</Text>
                        <Text>Seleccionar un rol:</Text>
                        <Picker
                            selectedValue={this.state.IDROLL}
                            style={{height: 50, width: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({IDROLL: itemValue})
                            }>
                            <Picker.Item label="Rol 1" value="1" />
                            <Picker.Item label="Rol 2" value="2" />
                        </Picker>
                        <Button
                            labelStyle={styles.Button} 
                            mode="contained" 
                            onPress={this.GuardarEmpleado}
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
    );
    }








}