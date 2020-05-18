import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Ionicons, AntDesign} from '@expo/vector-icons';
import LoanStack from './LoanStack';
import HomeStack from './HomeStack';
import SettingStack from './SettingStack';

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<AntDesign name='home' size={20} color={tintColor}/>),
        }
    },
    Loans: {
        screen: LoanStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<AntDesign name='creditcard' size={20} color={tintColor}/>),
            // tabBarVisible: false,
        }
    },
    Settings: {
        screen: SettingStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (<AntDesign name='setting' size={20} color={tintColor}/>)
        }
    },
}, {
    defaultNavigationOptions: {
        tabBarOptions: {
            activeTintColor: '#f56b2a',
    
        },
    }
})

export default TabNavigator