import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ActivityIndicator, Colors } from 'react-native-paper'
import { getCustomer, getIntent, getUserType } from '../utils/storage';
import * as Linking from 'expo-linking'
import navigationservice from '../utils/navigationservice';
import { resFont, resHeight } from '../utils/utils';
import CustomText from '../components/CustomText';
import { NavigationActions } from 'react-navigation';

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
                const userType = await getUserType()
                if(userType){
                    if(userType.includes('Loans')) {
                        this.props.navigation.navigate("Customer Loans", {}, NavigationActions.navigate({routeName: 'Main'}))
                    } else {
                        this.props.navigation.navigate("Customer Investments", {}, NavigationActions.navigate({routeName: 'Main'}))
                    }
                } else {
                    this.props.navigation.navigate('Initial Screen')
                }
            }
        } else {
            const userType = await getUserType()
            if(userType){
                if(userType.includes('Loans')) {
                    this.props.navigation.navigate("Customer Loans", {}, NavigationActions.navigate({routeName: 'Main'}))
                } else {
                    this.props.navigation.navigate("Customer Investments", {}, NavigationActions.navigate({routeName: 'Main'}))
                }
            } else {
                this.props.navigation.navigate('Initial Screen')
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexGrow: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar.Image size={resFont(40)} source={require('../assets/images/logo.png')} />
                <CustomText style={{fontFamily: 'Baloo-semi-bold', fontSize: resFont(20), color: '#000', marginVertical: resHeight(2)}}>Please wait ...</CustomText>
            </View>
        );
    }

}

const styles = StyleSheet.create({

})