import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LoanScreen from '../screens/loans/LoanScreen';
import LoanDetails from '../screens/loans/LoanDetails';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';

const LoanStack = createStackNavigator({
    'Loans': {
        screen: LoanScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Loan Details': {
        screen: LoanDetails,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }, 
    'Liquidate Loan': {
        screen: LiquidateLoan,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }, 
}, {
    initialRouteName: 'Loans',
    mode: 'card',
})

export default LoanStack;

LoanStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Liquidate Loan' ) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}