import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import InvestorDashboard from '../InvestorDashboard';
import { resWidth, resHeight, resFont } from '../../../utils/utils';
import { MaterialIcons } from '@expo/vector-icons';
import DrawerComponent from '../../../components/DrawerComponent';
import InvestorChangePasswordScreen from '../InvestorChangePasswordScreen';
import SavingScreen from '../SavingScreen';
import Null from '../../../components/Null';

const DrawerStack = createDrawerNavigator({
    'Dashboard': {
        screen: InvestorDashboard,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
            drawerIcon: ({ tintColor }) => <MaterialIcons name="info-outline" size={24} color={tintColor} />
        }
    },
    'Change Password': {
        screen: InvestorChangePasswordScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
            drawerIcon: ({ tintColor }) => <MaterialIcons name="settings" size={24} color={tintColor} />
        }
    },
}, {
    drawerBackgroundColor: 'white',
    drawerType: 'front',
    drawerWidth: resWidth(80),
    contentComponent: (props) => <DrawerComponent {...props} />,
    // hideStatusBar: true,
    contentOptions: {
        inactiveTintColor: '#000',
        activeTintColor: '#f56b2a',
        itemStyle: {
            // backgroundColor: 'red',
            // marginBottom: resHeight(2.5),
            // padding: 0,
        },
        labelStyle: {
            fontSize: resFont(16),
            marginLeft: 0,
            fontFamily: 'Baloo-med'
        },
        iconContainerStyle: {
            padding: 0,
            width: resWidth(10)
        }
    }
})

export default DrawerStack;