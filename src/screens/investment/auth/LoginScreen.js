import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput as RNTextInput, Keyboard, ScrollView, StatusBar } from 'react-native'
import { Appbar, TextInput, Button, withTheme, TouchableRipple, Snackbar, HelperText } from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../../../utils/utils';
import { apiURL, request, investmentURL } from '../../../utils/request';
import Loader from '../../../components/Loader';
import { setCustomerToken, setCustomer } from '../../../utils/storage';
import CustomText from '../../../components/CustomText';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';
import navigationservice from '../../../utils/navigationservice';
import { NavigationActions } from 'react-navigation';
import { Constants } from 'react-native-unimodules';
const axios = require('axios').default;



class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
        isLoading: false,
        errorMsg: null,
        snackBarVisible: false
    };
    

    _onDismissSnackBar = () => this.setState({ snackBarVisible: false });
    handleLogin = () => {
        this.setState({
            errorMsg: null
        })
        const url = `${investmentURL}login`;
        const user = {
            email: this.state.username,
            password: this.state.password
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
        }
        if (!this.state.username) {
            return alert('Enter username')
        } else if (!this.state.password) {
            return alert('Enter password')
        } else {
            Keyboard.dismiss()
            this.setState({ isLoading: true })
            axios({
                method: 'POST',
                url: url,
                data: user
            }).then((data) => {
                // console.log(data.data)
                this.setState({ isLoading: false });
                if (data.data.status === 'success') {
                    setCustomerToken(data.data.token);
                    setCustomer(data.data.data.borrower);
                    this.props.navigation.navigate('Main')
                } else {
                    this.setState({snackBarVisible: true, isLoading: false,  errorMsg: `User ${data.data.message}` })
                }
            }).catch((error) => {
                // console.log('err' +error)
                this.setState({snackBarVisible: true, isLoading: false, errorMsg: error.message })
                // console.log(error)
            })
            // request(url, options).then(data => {
            //     console.log(data)
            //     this.setState({ isLoading: false });
            //     if (data.status === 'success') {
            //         setCustomerToken(data.token);
            //         setCustomer(data.customer);
            //         this.props.navigation.navigate('Main')
            //     } else {
            //         console.log(data)
            //     }
            //     // console.log(data)
            // }).catch(error => {
            //     console.log(error)
            //     this.setState({ isLoading: false, errorMsg: error.message })
            //     // console.log(error)
            // })
        }

    }

    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(String(email).toLowerCase());
        }
    }
    render() {
        const { username, password, isLoading, errorMsg, snackBarVisible } = this.state;
        const { colors } = this.props.theme
        return (
            <CustomSafeAreaView style={{ backgroundColor: '#f5fcff' }}>
                {/* <CustomText>{0 + StatusBar.currentHeight}</CustomText> */}
                <View style={{ flex: 1 }}>
                    <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                        <Appbar.BackAction
                            onPress={() => this.props.navigation.goBack()}
                        />
                        <Appbar.Content
                            titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                            title="Login to your account"
                        />
                        <Appbar.Action
                        />
                    </Appbar.Header>
                    {/* <Loader isLoading={isLoading} backgroundColor="'rgba(247, 247, 247, .3)'"/> */}
                    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} keyboardDismissMode='interactive'>
                        <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                            <View style={{ marginTop: resHeight(1) }}>
                                <CustomText style={{ textAlign: 'left', fontSize: resFont(20), fontFamily: 'Baloo-bold', color: colors.primary }}>Hi, Welcome Back</CustomText>
                                <CustomText style={{ textAlign: 'left', fontSize: resFont(14), fontFamily: 'Baloo' }}>Kindly provide your email and password to access your investment(s) portal</CustomText>
                                {/* {errorMsg && <CustomText style={{ textAlign: 'center', color: colors.error, marginVertical: resHeight(1) }}>{errorMsg}</CustomText>} */}
                                <TextInput
                                    style={{ marginTop: resHeight(1), backgroundColor: 'white', height: resHeight(7) }}
                                    label='Email'
                                    value={username}
                                    mode="outlined"
                                    autoCapitalize='none'
                                    returnKeyType='done'
                                    keyboardType='email-address'
                                    onChangeText={username => this.setState({ username })}
                                />
                                  {this.validateEmail(username) && <HelperText type='error' visible={true}>
                                        Please valid email only
                                   </HelperText>}
                                <TextInput
                                    secureTextEntry
                                    style={{ marginTop: resHeight(1), backgroundColor: 'white', height: resHeight(7) }}
                                    label='Password'
                                    mode="outlined"
                                    value={password}
                                    returnKeyType='done'
                                    onChangeText={password => this.setState({ password })}
                                />
                                <Button
                                    style={{ marginTop: resHeight(2) }}
                                    labelStyle={{ textTransform: 'none', color: 'white', fontSize: 15, fontFamily: 'Baloo-med' }}
                                    contentStyle={styles.loginbtn}
                                    loading={isLoading}
                                    disabled={isLoading || this.validateEmail(username) || !password}
                                    mode="contained" onPress={this.handleLogin}>
                                    {isLoading ? 'Logging in' : 'Login'}
                                </Button>
                                <Button
                                    style={{ marginTop: resHeight(3) }}
                                    labelStyle={{ textTransform: 'capitalize', fontFamily: 'Baloo-med', color: colors.primary }}
                                    onPress={() => {this.props.navigation.navigate('Forgot Password')}}
                                >
                                    Forgot Password?
                                </Button>

                            </View>
                        </View>
                        
                    </ScrollView>
                    <Snackbar
                            visible={snackBarVisible}
                            onDismiss={this._onDismissSnackBar}
                            style={{ backgroundColor: 'maroon', color: '#fff' }}
                        >
                            {errorMsg}
                            </Snackbar>
                </View>
            </CustomSafeAreaView>


        )
    }
}

export default withTheme(LoginScreen);
const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 30
    },
    loginbtn: {
        height: resHeight(6),
        width: resWidth(90)
    },
});