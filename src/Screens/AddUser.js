import React, { Component } from 'react';
import { TextInput, Avatar, Button, Card, Title, Paragraph  } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import normalize from 'react-native-normalize';
import Header from '../Components/Header'
export default class addUser extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            text:'' 
        };
      }
  render(){
    const {name, subtitle, navigation} = this.props
    const { text } =  this.state
    return (
        <View>
            {/*Header generico que debe ser reutilizado en casi todas las vistas*/}
            <Header name={name} subtitle={subtitle} navigation={navigation}/>
            <View style={styles.Form}>
            <Card>
                <Card.Title 
                    title="POS PROJECT" 
                    subtitle="Todas las tiendas en un solo lugar" 
                    left={(props) => <Avatar.Icon {...props} 
                    icon="account" />} 
                />
                <Card.Content>
                    <TextInput
                        style={styles.Input}
                        mode='flat'
                        label='Nombres'
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
                        label='Cèdula'
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
                    <Text>{"\n"}</Text>
                </Card.Content>
            </Card>
            </View>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    Form: {
        padding:normalize(15),
        marginBottom:10,
    },
    Input: {
        color: '#161924',
        fontSize: 14,
        fontWeight:"200",
        backgroundColor:'#FFFFFF',
    }
})
