import React, { Component, createRef, Fragment } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground, Image } from 'react-native'
import { Button, TouchableRipple, Text as RPText, withTheme, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resHeight, resWidth, resFont } from '../utils/utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomText from '../components/CustomText';
import { Constants } from 'react-native-unimodules';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import { NavigationActions } from 'react-navigation';
import { setUserType } from '../utils/storage';
import {StatusBar} from 'expo-status-bar'
class InitialScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            isLoading: false,
            hasNotification: false,
        };
        this.imageRef = createRef()
    }

    _handleUserType = (type) => {
        setUserType(type).then(this.props.navigation.navigate(type, {}, NavigationActions.navigate({routeName: 'Auth'})))
    }

    render() {
        const { hasNotification, isLoading } = this.state
        const { colors } = this.props.theme;
        return (
            <Fragment>
                <StatusBar style='light'/>
            <View style={styles.page}>
                <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode='cover' style={{ height: '100%', width: '100%' }}>
                    <View style={{ flex: 1, paddingVertical: 50}}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                       <View style={{width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 20}}>
                       <Avatar.Image size={40} source={require('../assets/images/logo.png')}  />
                       </View>
                       <CustomText style={{fontFamily: 'Baloo-bold', fontSize: resFont(20), color: 'white', marginVertical: 10}}>
                                Credit Wallet
                            </CustomText>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button
                        icon='cash-multiple'
                                style={{ marginTop: resHeight(2) }}
                                labelStyle={{ textTransform: 'none', color: 'white', fontSize: 15, fontFamily: 'Baloo-med' }}
                                contentStyle={styles.actionBtn}
                                loading={isLoading}
                                disabled={isLoading}
                                mode="contained"
                                onPress={() => this._handleUserType('Customer Loans')}
                            >
                                Loans
                            </Button>
                            <Button
                             icon='finance'
                                style={{ marginTop: resHeight(2) }}
                                labelStyle={{ textTransform: 'none', color: 'white', fontSize: 15, fontFamily: 'Baloo-med' }}
                                contentStyle={styles.actionBtn}
                                loading={isLoading}
                                disabled={isLoading}
                                mode="contained"
                            onPress={() => this._handleUserType('Customer Investments')}
                            >
                                Investments
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            </Fragment>
        )
    }
}

export default withTheme(InitialScreen)

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
    actionBtn: {
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