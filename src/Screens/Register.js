import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, RadioButton  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import whatever from '../../src'
export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            text:'',
            checked:'first'
        };
      }
    render(){
        const {name, subtitle, navigation} = this.props
        const { text,enabled, checked } =  this.state
        return (
            <ScrollView>
            <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas*/}
                <Header name={name} subtitle={subtitle} navigationEnabled={false} navigation={navigation}/>
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
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Nombressss1'
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Apellidos'
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Telèfono'
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <Text>{"\n"}</Text>
                            <Block row style={{paddingLeft:normalize(10)}}>
                            <Text style={{fontWeight:'bold'}}>Tipo de Identificaciòn:      </Text>
                            <View>
                                <Text>Cedula</Text>
                                <RadioButton
                                    value="first"
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: 'first' }); }}
                                />
                            </View>
                            <Block row style={{paddingLeft:normalize(35)}} />
                            <View>
                                <Text>Pasaporte</Text>
                                <RadioButton
                                    value="first"
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: 'first' }); }}
                                />
                            </View>
                            </Block>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label=''
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <Block row style={{paddingBotton:normalize(15)}} />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Contraseña'
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <Text>{"\n"}</Text>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Repetir contraseña'
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <Text>{"\n"}</Text>
                            <Text>Seleccionar un rol:</Text>
                            <Picker
                                selectedValue={this.state.language}
                                style={{height: 50, width: 100}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({language: itemValue})
                                }>
                                <Picker.Item label="Rol 1" value="java" />
                                <Picker.Item label="Rol 2" value="js" />
                            </Picker>
                            <Button
                                labelStyle={styles.Button} 
                                icon="account" 
                                mode="contained" 
                                onPress={() => console.log('Pressed')}
                            >
                                Agregar
                            </Button>
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
