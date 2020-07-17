

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import * as Linking from 'expo-linking'
import AuthStack from '../stacks/AuthStack';
import { Constants } from 'react-native-unimodules';
import TabNavigator from '../stacks/TabStack';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';
import Splashscreen from '../screens/SplashScreen';
import GetStartedScreen from '../screens/new-application/GetStarted';
import NewApplicationBaseScreen from '../screens/new-application/stepper/NewApplicationBaseScreen';
import OfferLetter from '../screens/loanoffer/stepper/OfferLetter';
import AutoOfferLetter from '../screens/autoloanoffer/stepper/AutoOfferLetter';

const AppNavigation = createSwitchNavigator({
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
    'Offer': {
        screen: AutoOfferLetter,
        path: 'offer/:loanid'
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
        screen: LiquidateLoan,
        path: 'liquidate/:loan_id'
    }
})

const App = createAppContainer(AppNavigation)
const prefix = Linking.makeUrl('/');
// const MainApp = () => 
// export default () => {
//     return <App  uriPrefix={prefix}/>
// };

export default AppContainer = React.forwardRef((props, ref) => {
    return <App  {...props}  uriPrefix={prefix} ref={ref}/>
})
// export default AppContainer = createAppContainer(AppNavigation);