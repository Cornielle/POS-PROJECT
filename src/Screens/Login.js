import React, { Component } from 'react';
import { TextInput, Button, Card, Checkbox  } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Block} from 'galio-framework'
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
import { TouchableOpacity } from 'react-native-gesture-handler';
//import whatever from '../src'
export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            id:'',
            pass:'',
            checked:'unchecked'
        };
        this.login = this.login.bind(this);
      }
    login(){
        console.log('exists')
    }
    render(){
        const {name, subtitle, navigation} = this.props
        const { text,enabled, checked } =  this.state
        return (
            <ScrollView>
            <View style={styles.ViewStyle}>
                {/*Header generico que debe ser reutilizado en casi todas las vistas*/}
                <Header name={name} subtitle={subtitle} goBackEnabled={false} navigationEnabled={false} navigation={navigation}/>
                <View style={styles.Form}>
                    <Card>
                        <Card.Cover source={{ uri: 'https://picsum.photos/900' }} />
                        <Card.Content>
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Cédula'
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <TextInput
                                style={styles.Input}
                                mode='flat'
                                label='Contraseña'
                                value={text}
                                onChangeText={text => this.setState({ text })}
                            />
                            <Text>{"\n"}</Text>
                            <Block row>
                                <Text style={{color:'#000000', fontSize:12}}>¿Olvidaste la Contraseña? </Text>
                                <TouchableOpacity>
                                    <Text style={styles.Forgot}> Haz clic aquí </Text>
                                </TouchableOpacity>
                            </Block>
                        </Card.Content>
                        <Text>{"\n"}</Text>
                    </Card>
                    <Text>{"\n"}</Text>
                    <Block style={styles.ButtonBlock}>
                        <Button 
                            mode="contained" 
                            style={styles.Button}
                            color="#42b842" 
                            width={normalize(125)}
                            onPress={() => console.log('Pressed')}
                        >
                            <Text style={{color:'#ffffff'}}>Ingresar</Text>
                    </Button>
                    </Block>
                </View>
            </View>
            </ScrollView>
        );
        }
    }
        const styles = StyleSheet.create({
            ViewStyle:{
                backgroundColor:"#f9f9f9",
                height:normalize(700)
            },
            Button:{
                height:normalize(42),
            },
            Form: {
                padding:normalize(15),
                marginTop:normalize(50)

            },
            Input: {
                color: '#161924',
                fontSize: 14,
                fontWeight:"200",
                backgroundColor:'#FFFFFF',
            },
            Forgot:{
                color:'blue',
                fontSize:12
            },
            ButtonBlock:{
                alignItems:'center',
            }
    })
