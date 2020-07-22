import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AuthStack from './AuthStack';
import NewInvestmentStack from './NewInvestmentStack';

const InvestmentStack = createStackNavigator({
    'Auth': {
        screen: AuthStack,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'New Investment': {
        screen: NewInvestmentStack,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    }
}, {
    initialRouteName: 'Auth',
    mode: 'card',
})

export default InvestmentStack;
