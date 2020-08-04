import React, { Component, createRef, Fragment } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground, Image } from 'react-native'
import { Button, TouchableRipple, Text as RPText, withTheme, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resHeight, resWidth, resFont } from '../../../utils/utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomText from '../../../components/CustomText';
import { Constants } from 'react-native-unimodules';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';
import { NavigationActions } from 'react-navigation';
import { StatusBar} from 'expo-status-bar'

class InvOnboardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            hasNotification: false,
        };
        this.imageRef = createRef()
    }

    render() {
        const {hasNotification} = this.state
        const { colors } = this.props.theme;
        return (
           <Fragment>
               <StatusBar style='dark' />
               <View style={styles.page}>
               
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                   {/* <View style={styles.avatarContainer}>
                       <Avatar.Image style={styles.avatar} size={40} source={require('../../../assets/images/logo.png')} />
                       <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-bold' }}>Credit Wallet</CustomText>
                   </View> */}
               </View>
               <View style={{ flex: 2, width: resWidth(90), alignItems: 'center', justifyContent: 'center'}}>
                   <Image
                       style={{ height: '100%', resizeMode: 'contain', width: '100%' }}
                       source={require('../../../assets/images/investment.png')}
                   />
               </View>

               <View style={{ flex: 1 ,  width: '100%', alignItems: 'center', justifyContent: 'center' }}>
               <Button
                           style={{ borderColor: colors.primary, borderWidth: 1 }}
                           labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                           contentStyle={styles.signpbtn}
                           mode='contained' onPress={() => this.props.navigation.navigate(hasNotification ? 'New Investment' : 'Investment Apply')}>
                           Make an investment
           </Button>
                   <View style={styles.loginInfo}>
                   <CustomText style={{fontSize: resFont(15), fontFamily: 'Baloo-med' }}>Existing Investor?</CustomText>
               <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Login')}} style={styles.loginTxt}>
                   <CustomText style={{ color: colors.primary, fontSize: resFont(15), fontFamily: 'Baloo-med' }}>Login</CustomText>
               </TouchableWithoutFeedback>
                   </View>
                   {/* <TouchableWithoutFeedback onPress={()=> {this.props.navigation.navigate('Customer Loans', {}, NavigationActions.navigate({routeName: 'Onboard'}))}} style={styles.loginTxt}>
                   <CustomText style={{ color: colors.primary, fontSize: resFont(15), fontFamily: 'Baloo-med', textDecorationLine: 'underline' }}>Go to Loans</CustomText>
               </TouchableWithoutFeedback> */}
               </View>
               <SafeAreaView />
           </View>
           </Fragment>
        )
    }
}

export default withTheme(InvOnboardScreen)

const styles = StyleSheet.create({
    avatar: {
        marginRight: 5
    },
    page: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5fcff',
        fontFamily: 'Baloo',
        backgroundColor: 'white'
        // justifyContent: 'flex-end'
    },
    avatarContainer: {
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signpbtn: {
        height: resHeight(6),
        width: resWidth(90)
    },
    loginInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: resHeight(2)
    },
    loginTxt: {
        fontSize: resFont(50),
        marginLeft: resWidth(3)
    }
})