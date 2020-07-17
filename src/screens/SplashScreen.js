import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ActivityIndicator, Colors } from 'react-native-paper'
import { getUser, getIntent } from '../utils/storage';
import * as Linking from 'expo-linking'
import navigationservice from '../utils/navigationservice';
import { resFont } from '../utils/utils';

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
        Linking.addEventListener('url', (data) => {
            this.handleUrl(data.url)
        })
        await Linking.getInitialURL().then(data => this.handleUrl(data));
    }

    handleUrl = async (url) => {
        if (url) {
            const route = url.replace(/.*?:\/\//g, '');
            const routes = route.split('/')
            const routeName = routes[2]
            const id = routes[3]
            if (routeName == 'liquidate') {
                navigationservice.navigate('Loan Liquidate', { loan_id: id })
            } else if (routeName == 'offerletter') {
                navigationservice.navigate('Offer Letter', { loanid: id })
            } else {
                await getUser().then(user => user ? this.props.navigation.navigate('Main') : this.props.navigation.navigate('Auth')).catch(error => this.props.navigation.navigate('Auth'))
            }
        } else {
            await getUser().then(user => user ? this.props.navigation.navigate('Main') : this.props.navigation.navigate('Auth')).catch(error => this.props.navigation.navigate('Auth'))
            // console.log('else')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexGrow: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar.Image size={resFont(40)} source={require('../assets/images/logo.png')} />
                <ActivityIndicator  size={resFont(30)} color={Colors.primary}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({

})