import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper'
import { getUser, getIntent } from '../utils/storage';
import * as Linking from 'expo-linking'
import navigationservice from '../utils/navigationservice';

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
            console.log(url)
            const route = url.replace(/.*?:\/\//g, '');
            const routes = route.split('/')
            // console.log(routes)
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
            console.log('else')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexGrow: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar.Image size={35} source={require('../assets/images/logo.png')} />
            </View>
        );
    }

}

const styles = StyleSheet.create({

})