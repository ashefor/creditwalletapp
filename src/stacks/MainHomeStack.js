import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LoanScreen from '../screens/loans/LoanScreen';
import LoanDetails from '../screens/loans/LoanDetails';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';
import HomeScreen from '../screens/home/HomeScreen';
import HomeStack from './HomeStack';
import NewLoanScreen from '../screens/home/NewLoanScreen';

const MainHomeStack = createStackNavigator({
    'Home': {
        screen: HomeStack,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'New Loan': {
        screen: NewLoanScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    }, 
}, {
    mode: 'card',
    headerMode: 'none'
})

export default MainHomeStack;

MainHomeStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Loan Liquidate' ) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}