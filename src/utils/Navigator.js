

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import * as Linking from 'expo-linking'
import InvestmentStack from '../screens/investment/stacks/InvestmentStack';
import LoanBaseStack from '../stacks/LoanBaseStack';
import InitialScreen from '../screens/InitialScreen';
import Splashscreen from '../screens/SplashScreen';

const AppNavigation = createSwitchNavigator({
    Loading: {
        screen: Splashscreen,
    },
   'Initial Screen': {
       screen: InitialScreen,
   },
   'Customer Loans': {
    screen: LoanBaseStack
   },
    'Customer Investments' : {
        screen: InvestmentStack
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