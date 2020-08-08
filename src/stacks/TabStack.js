import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Ionicons, AntDesign} from '@expo/vector-icons';
import LoanStack from './LoanStack';
import HomeStack from './HomeStack';
import SettingStack from './SettingStack';
import MainHomeStack from './MainHomeStack';
import { resFont } from '../utils/utils';
import CustomText from '../components/CustomText';

const activeTintLabelColor = '#f56b2a';
const inactiveTintLabelColor = '#808080';
const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: ({ focused }) => (
                <CustomText style={{marginHorizontal: 20, fontSize: resFont(13), fontFamily: 'Baloo', textAlign: 'center', color: focused ? activeTintLabelColor : inactiveTintLabelColor }}>
                  Home
                </CustomText>
              ),
            tabBarIcon: ({tintColor}) => (<AntDesign name='home' size={resFont(15)} color={tintColor}/>),
        }
    },
    Loans: {
        screen: LoanStack,
        navigationOptions: {
            tabBarLabel: ({ focused }) => (
                <CustomText style={{marginHorizontal: 20, fontSize: resFont(13), fontFamily: 'Baloo', color: focused ? activeTintLabelColor : inactiveTintLabelColor }}>
                  Loans
                </CustomText>
              ),
            tabBarIcon: ({tintColor}) => (<AntDesign name='creditcard' size={resFont(15)} color={tintColor}/>),
            // tabBarVisible: false,
        }
    },
    Settings: {
        screen: SettingStack,
        navigationOptions: {
            tabBarLabel: ({ focused }) => (
                <CustomText style={{marginHorizontal: 20, fontSize: resFont(13), fontFamily: 'Baloo', color: focused ? activeTintLabelColor : inactiveTintLabelColor }}>
                  Settings
                </CustomText>
              ),
            tabBarIcon: ({tintColor}) => (<AntDesign name='setting' size={resFont(15)} color={tintColor}/>)
        }
    },
}, {
    defaultNavigationOptions: {
        tabBarOptions: {
            activeTintColor: '#f56b2a',
            style: {
                backgroundColor: '#f5fcff',
            }
        },
    }
})

export default TabNavigator