import 'react-native-gesture-handler';

import * as React from 'react';
import { Platform, StyleSheet, Text, View, I18nManager } from 'react-native';
import * as Linking from 'expo-linking'
import { AppLoading } from 'expo';

import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font'
import { Provider as PaperProvider, DefaultTheme, DarkTheme, configureFonts, } from 'react-native-paper';
import AppNavigation from './src/utils/Navigator';
import navigationservice from './src/utils/navigationservice';
import { NewLoanProvider } from './src/screens/new-application/provider/NewLoanProvider';
import { LoanOfferProvider } from './src/screens/loanoffer/provider/LoanOfferProvider';
import MainApp from './src/utils/Navigator';
import { AutoLoanOfferProvider } from './src/screens/autoloanoffer/provider/AutoLoanOfferProvider';

I18nManager.forceRTL(false);
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
let fontsLoaded = {
  'Baloo': require('./src/assets/fonts/baloo/Baloo2-Regular.ttf'),
  'Baloo-med': require('./src/assets/fonts/baloo/Baloo2-Medium.ttf'),
  'Baloo-bold': require('./src/assets/fonts/baloo/Baloo2-Bold.ttf'),
  'Baloo-extra-bold': require('./src/assets/fonts/baloo/Baloo2-ExtraBold.ttf'),
  'Baloo-semi-bold': require('./src/assets/fonts/baloo/Baloo2-SemiBold.ttf')
};


// const AppWrapper = React.forwardRef((props, ref) => (
// <MainApp ref={ref}>{props.children}</MainApp>
// ));
export default class App extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      fontsLoaded: false,
    };
  }
 
  
 

  async _loadFontsAsync() {
    await Font.loadAsync(fontsLoaded);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    Linking.getInitialURL().then(data => this.goToLink(data))

    Linking.addEventListener('url' , (data) => {
      this.handleOpenURL(data)
    })
  }

  handleOpenURL = (event) => { // D
    this.goToLink(event.url);
  }

  goToLink = (url) => {
    // alert(url)
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0]
    const id = route.split('/')[1]
    if (routeName === 'offerletter') {
      navigationservice.navigate('Offer Letter', {loanid: id})
    } else if (routeName === 'offer') {
      navigationservice.navigate('Offer', {loanid: id})
    } else {

    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    Linking.removeEventListener('url', this.handleOpenURL);
  }
render() {
  if(this.state.fontsLoaded) {
   return (
    <View style={styles.container}>
    <PaperProvider theme={theme}>
     <AutoLoanOfferProvider>
     <LoanOfferProvider>
        <NewLoanProvider>
         <AppNavigation ref={navRef => navigationservice.setTopLevelNavigator(navRef)}/>
        </NewLoanProvider>
      </LoanOfferProvider>
     </AutoLoanOfferProvider>
    </PaperProvider>
  </View>
   )
  } else {
    return <AppLoading />;
  }
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
