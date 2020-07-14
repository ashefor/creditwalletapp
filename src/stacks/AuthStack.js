import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OnboardScreen from '../screens/auth/OnboardScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';

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
    'Sign Up': {
        screen: SignupScreen,
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