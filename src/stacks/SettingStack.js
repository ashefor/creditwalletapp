import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import SettingScreen from '../screens/settings/SettingScreen';
import ChangePasswordScreen from '../screens/settings/ChangePasswordScreen';

const SettingStack = createStackNavigator({
    'Settings': {
        screen: SettingScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Change Password': {
        screen: ChangePasswordScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }, 
}, {
    initialRouteName: 'Settings',
    mode: 'card',
})

export default SettingStack;