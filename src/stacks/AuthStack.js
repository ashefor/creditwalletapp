import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import OnboardScreen from '../screens/auth/OnboardScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
import SetPasswordScreen from '../screens/auth/SetPasswordScreen';

const AuthStack = createStackNavigator({
    'Login': {
        screen: LoginScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
            headerTitle: 'Header'
        }
    },
    'Forgot Password': {
        screen: ForgotPassword,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Onboard': {
        screen: OnboardScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Set Password': {
        screen: SetPasswordScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    }
}, {
    initialRouteName: 'Onboard',
    mode: 'card',
})

export default AuthStack