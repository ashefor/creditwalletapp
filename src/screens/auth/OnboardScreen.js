import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Button, TouchableRipple, Text as RPText, withTheme, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resHeight, resWidth, resFont } from '../../utils/utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import OnboardCarousel from '../../components/OnboardCarousel';
import CustomText from '../../components/CustomText';
import { Constants } from 'react-native-unimodules';
class OnboardScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { colors } = this.props.theme;
        return (
            <View style={styles.page}>
                <SafeAreaView />
                <View style={styles.avatarContainer}>
                    <Avatar.Image style={styles.avatar} size={40} source={require('../../assets/images/logo.png')} />
                    <CustomText style={{fontSize: resFont(15), fontFamily: 'Baloo-semi-bold' }}>Credit Wallet</CustomText>
                </View>
               <View style={{height: resHeight(50), marginVertical: resHeight(5)}}>
               <OnboardCarousel />
               </View>
                <Button
                labelStyle={{textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white'}}
                    contentStyle={styles.signpbtn}
                    mode="contained" onPress={() => this.props.navigation.navigate('Get Started')}>
                    Apply for a loan
                </Button>
                <Button
                labelStyle={{textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white'}}
                    contentStyle={styles.signpbtn}
                    mode="contained" onPress={() => this.props.navigation.navigate('Offer Letter', { loan_id: '28780' })}>
                    Offer Letter
                </Button>
                <View style={styles.loginInfo}>
                    <CustomText style={{fontSize: resFont(15), fontFamily: 'Baloo-med' }}>Existing Customer?</CustomText>
                    <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('Login')} style={styles.loginTxt}>
                        <CustomText style={{ color: colors.primary, fontSize: resFont(15), fontFamily: 'Baloo-med' }}>Login</CustomText>
                    </TouchableWithoutFeedback>
                </View>

                <SafeAreaView />
            </View>
        )
    }
}

export default withTheme(OnboardScreen)

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
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight: 0,
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