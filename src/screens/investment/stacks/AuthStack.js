import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import InvOnboardScreen from '../auth/InvOnboardScreen';
import LoginScreen from '../auth/LoginScreen';
import ForgotPassword from '../auth/ForgotPassword';

const AuthStack = createStackNavigator({
    'Onboard': {
        screen: InvOnboardScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Login':  {
        screen: LoginScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Forgot Password': {
        screen: ForgotPassword,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    }
}, {
    initialRouteName: 'Onboard',
    mode: 'card',
})

export default AuthStack;