import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import normalize from 'react-native-normalize';
import {FontAwesome5} from '@expo/vector-icons';
export default class MyComponent extends React.Component {
  _goBack = () => console.log('Went back');
  _handleSearch = () => console.log('Searching');
  _handleMore = () => console.log('Shown more');
  render() {
    const {name, subtitle} = this.props
    return (
        <SafeAreaView>
          <Appbar.Header>
          <Appbar.BackAction
            onPress={this._goBack}
            color={styles.title.color}
          />
          <Appbar.Content 
            color={styles.title.color}
            title={name} 
            subtitle={subtitle}/>
          <TouchableOpacity  
            style={{alignItems: "flex-end", margin:16}} 
            onPress={this.props.navigation.openDrawer}
          >
            {this.props.navigationEnabled === true &&(
              <FontAwesome5 
                name="bars" 
                size={24} 
                color={styles.title.color}
              />
            )}
          </TouchableOpacity>
        </Appbar.Header>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleContent: {
    left: normalize(50),
    flex: 1,
    color:'#ffffff'
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight:"200"
  }
});