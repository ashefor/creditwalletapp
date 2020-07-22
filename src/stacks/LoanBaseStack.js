import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AuthStack from '../stacks/AuthStack';
import { Constants } from 'react-native-unimodules';
import TabNavigator from '../stacks/TabStack';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';
import Splashscreen from '../screens/SplashScreen';
import GetStartedScreen from '../screens/new-application/GetStarted';
import NewApplicationBaseScreen from '../screens/new-application/stepper/NewApplicationBaseScreen';
import OfferLetter from '../screens/loanoffer/stepper/OfferLetter';
import AutoOfferLetter from '../screens/autoloanoffer/stepper/AutoOfferLetter';
import InvOnboardScreen from '../screens/investment/auth/InvOnboardScreen';

const LoanBaseStack = createStackNavigator({
    Loading: {
        screen: Splashscreen,
    },
    'Get Started': {
        screen: GetStartedScreen
    },
    'Offer Letter': {
        screen: OfferLetter,
        path: 'offerletter/:loanid'
    },
    'Offer': {
        screen: AutoOfferLetter,
        path: 'offer/:loanid'
    },
    Auth: {
        screen: AuthStack,
        // navigationOptions: {
        //     headerTransparent: true,
        //     headerShown: false,
        //     headerTitle: 'Header'
        // }
    },
    Main: {
        screen: TabNavigator
    },
    'New Application': {
        screen: NewApplicationBaseScreen
    },
    'Liquidate Loan': {
        screen: LiquidateLoan,
        path: 'liquidate/:loan_id'
    },
}, {
    // initialRouteName: 'Loans',
    mode: 'card',
    defaultNavigationOptions: {
        headerTransparent: true,
        headerShown: false,
        headerTitle: 'Header'
    }
})

export default LoanBaseStack;