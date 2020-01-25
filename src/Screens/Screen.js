import React, { Component } from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import Home  from '../Screens/Home'

export default class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            //states
        };
      }
    render() {
        const {name} = this.props
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity style={{alignItems: "flex-end", margin:16}} 
                    onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color={styles.text.color} />
                    </TouchableOpacity>
                    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}> 
                        <Home/>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },
    text: {
        color: '#161924',
        fontSize: 20,
        fontWeight:"500"
    }
})