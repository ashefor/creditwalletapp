import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import InvOnboardScreen from '../auth/InvOnboardScreen';
import LoginScreen from '../auth/LoginScreen';
import ForgotPassword from '../auth/ForgotPassword';
import GetStartedScreen from '../new-application/GetStarted';
import NewInvestmentBaseScreen from '../new-application/stepper/NewInvestmentBaseScreen';

const NewInvestmentStack = createStackNavigator({
    // 'Get Started': {
    //     screen: GetStartedScreen,
    //     navigationOptions: {
    //         headerTransparent: true,
    //         headerShown: false
    //     }
    // },
    'Investment Apply':  {
        screen: NewInvestmentBaseScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    }
}, {
    initialRouteName: 'Get Started',
    mode: 'card',
})

export default NewInvestmentStack;