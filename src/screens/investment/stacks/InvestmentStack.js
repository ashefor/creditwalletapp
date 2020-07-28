import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AuthStack from './AuthStack';
import NewInvestmentStack from './NewInvestmentStack';
import DrawerStack from './DrawerStack';
import SavingScreen from '../SavingScreen';

const InvestmentStack = createStackNavigator({
    'Auth': {
        screen: AuthStack,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Main': {
        screen: DrawerStack,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Savings': {
        screen: SavingScreen,
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
