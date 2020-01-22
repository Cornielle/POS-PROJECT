import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

export default class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            //states
        };
      }
      componentDidMount(){
        console.log(this.props.name)
      }

    render() {
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity style={{alignItems: "flex-end", margin:16}} 
                    onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color={styles.text.color} />
                    </TouchableOpacity>
                    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.text}>{this.props.name}</Text>
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