import 'react-native-gesture-handler';

import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';

import { useFonts } from '@use-expo/font';
import { Provider as PaperProvider, DefaultTheme, DarkTheme, configureFonts, } from 'react-native-paper';
import AppNavigation from './src/utils/Navigator';
import navigationservice from './src/utils/navigationservice';
import { NewLoanProvider } from './src/screens/new-application/provider/NewLoanProvider';
import { LoanOfferProvider } from './src/screens/loanoffer/provider/LoanOfferProvider';
import MainApp from './src/utils/Navigator';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f56b2a',
    accent: '#f1c40f',
    surface: '#F5FCFF'
  }
};



const AppWrapper = React.forwardRef((props, ref) => (
<MainApp ref={ref}>{props.children}</MainApp>
));
export default function App() {
  const ref = React.createRef()
  let [fontsLoaded] = useFonts({
    'Baloo': require('./src/assets/fonts/baloo/Baloo2-Regular.ttf'),
    'Baloo-med': require('./src/assets/fonts/baloo/Baloo2-Medium.ttf'),
    'Baloo-bold': require('./src/assets/fonts/baloo/Baloo2-Bold.ttf'),
    'Baloo-extra-bold': require('./src/assets/fonts/baloo/Baloo2-ExtraBold.ttf'),
    'Baloo-semi-bold': require('./src/assets/fonts/baloo/Baloo2-SemiBold.ttf')
  });
  if (!fontsLoaded) {
    return (<AppLoading />)
  } else {
    return (
      <View style={styles.container}>
        <PaperProvider theme={theme}>
          <LoanOfferProvider>
            <NewLoanProvider>
             <MainApp ref={navRef => navigationservice.setTopLevelNavigator(navRef)}/>
            </NewLoanProvider>
          </LoanOfferProvider>
        </PaperProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
});
