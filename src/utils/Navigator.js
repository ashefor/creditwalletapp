

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import AuthStack from '../stacks/AuthStack';
import { Constants } from 'react-native-unimodules';
import TabNavigator from '../stacks/TabStack';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';
import Splashscreen from '../screens/SplashScreen';

const AppNavigation = createAppContainer(createSwitchNavigator({
    Loading: {
        screen: Splashscreen
    },
    Auth: {
        screen: AuthStack
    },
    Main: {
        screen: TabNavigator
    },
    'Liquidate Loan': {
        screen: LiquidateLoan
    }
}, {
    defaultNavigationOptions: {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        },
    }
}))

export default AppNavigation;