import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LoanScreen from '../screens/loans/LoanScreen';
import LoanDetails from '../screens/loans/LoanDetails';
import LiquidateLoan from '../screens/liquidate/LiquidateLoan';
import HomeScreen from '../screens/home/HomeScreen';

const HomeStack = createStackNavigator({
    'Home': {
        screen: HomeScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Loan Liquidate': {
        screen: LiquidateLoan,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }, 
}, {
    initialRouteName: 'Home',
    mode: 'card',
})

export default HomeStack;

HomeStack.navigationOptions = ({ navigation }) => {

    let tabBarVisible = true;

    let routeName = navigation.state.routes[navigation.state.index].routeName

    if ( routeName == 'Loan Liquidate' ) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}