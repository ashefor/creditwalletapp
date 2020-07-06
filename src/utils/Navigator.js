

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import AuthStack from '../stacks/AuthStack';
import { Constants } from 'react-native-unimodules';
import TabNavigator from '../stacks/TabStack';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';
import Splashscreen from '../screens/SplashScreen';
import GetStartedScreen from '../screens/new-application/GetStarted';
import NewApplicationBaseScreen from '../screens/new-application/stepper/NewApplicationBaseScreen';
import OfferLetter from '../screens/loanoffer/stepper/OfferLetter';

const AppNavigation = createAppContainer(createSwitchNavigator({
    Loading: {
        screen: Splashscreen
    },
    'Get Started': {
        screen: GetStartedScreen
    },
    'Offer Letter': {
        screen: OfferLetter,
        path: 'offerletter/:loanid'
    },
    Auth: {
        screen: AuthStack
    },
    Main: {
        screen: TabNavigator
    },
    'New Application': {
        screen: NewApplicationBaseScreen
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