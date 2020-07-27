import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AuthStack from '../stacks/AuthStack';
import { Constants } from 'react-native-unimodules';
import TabNavigator from '../stacks/TabStack';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';
import GetStartedScreen from '../screens/new-application/GetStarted';
import NewApplicationBaseScreen from '../screens/new-application/stepper/NewApplicationBaseScreen';
import OfferLetter from '../screens/loanoffer/stepper/OfferLetter';
import AutoOfferLetter from '../screens/autoloanoffer/stepper/AutoOfferLetter';
import InvOnboardScreen from '../screens/investment/auth/InvOnboardScreen';

const LoanBaseStack = createStackNavigator({
    // 'Get Started': {
    //     screen: GetStartedScreen
    // },
    Auth: {
        screen: AuthStack,
        // navigationOptions: {
        //     headerTransparent: true,
        //     headerShown: false,
        //     headerTitle: 'Header'
        // }
    },
    'Offer Letter': {
        screen: OfferLetter,
        path: 'offerletter/:loanid'
    },
    'Offer': {
        screen: AutoOfferLetter,
        path: 'offer/:loanid'
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
    mode: 'card',
    defaultNavigationOptions: {
        headerTransparent: true,
        headerShown: false,
        headerTitle: 'Header'
    }
})

export default LoanBaseStack;