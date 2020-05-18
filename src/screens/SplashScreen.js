import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {Avatar} from 'react-native-paper'
import { getUser } from '../utils/storage';


export default class Splashscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this._bootstrapAppAsync()
    }
    _bootstrapAppAsync = async () => {
        getUser().then(user => user ? this.props.navigation.navigate('Main') : this.props.navigation.navigate('Auth')).catch(error => this.props.navigation.navigate('Auth'))
    }

    render() {
        return (
            <View style={{ flex: 1, flexGrow: 1, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
                 <Avatar.Image size={40} source={require('../assets/images/logo.png')} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
   
})