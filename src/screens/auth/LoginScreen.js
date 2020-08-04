import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TouchableWithoutFeedback, TextInput as RNTextInput, Keyboard, ScrollView, StatusBar } from 'react-native'
import { Appbar, TextInput, Button, Paragraph, withTheme, Snackbar, TouchableRipple, Portal, Dialog } from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { apiURL, request } from '../../utils/request';
import Loader from '../../components/Loader';
import { setCustomerToken, setCustomer, storeUsername, getUsername } from '../../utils/storage';
import CustomText from '../../components/CustomText';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import navigationservice from '../../utils/navigationservice';
import { Constants } from 'react-native-unimodules';
import * as LocalAuthentication from 'expo-local-authentication';

class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
        isLoading: false,
        isBioLoading: false,
        errorMsg: null,
        canUseBiometric: false,
        hasBiometrics: false,
        showInfoDialog: false,
        snackBarVisible: false,
        types: [],
    };


    componentDidMount = async () => {
        this.checkDeviceForHardware();
        this.checkForBiometrics();
        this.checkForBiometricsType()
    }
    _onDismissSnackBar = () => this.setState({ snackBarVisible: false });

    showAndroidAlert = () => {
        Alert.alert(
            'Fingerprint Scan',
            'Place your finger over the touch sensor and press scan.',
            [
                {
                    text: 'Scan',
                    onPress: () => {
                        // this.scanFingerprint();
                    },
                },

            ]
        );
    };

    tryAuth = async () => {
        const user = await getUsername();
        if (user) {
            const data = await LocalAuthentication.authenticateAsync({ promptMessage: 'Login' });
            if (data.success) {
                this.handleBioLogin(user);
            }
        } else {
            this.setState({ showInfoDialog: true })
        }
    }

    hideInfoDialog = () => {
        this.setState({ showInfoDialog: false })
    }

    checkForBiometricsType = async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        // console.log(types)
        this.setState({types})
        console.log(this.state.types)
    }
    checkDeviceForHardware = async () => {
        const canUseBiometric = await LocalAuthentication.hasHardwareAsync()
        console.log(canUseBiometric)
        this.setState({ canUseBiometric })
    }

    checkForBiometrics = async () => {
        const hasBiometrics = await LocalAuthentication.isEnrolledAsync();
        // console.log(hasBiometrics)
        this.setState({ hasBiometrics })
    }

    handleBioLogin = (user) => {
        this.setState({
            errorMsg: null
        })
        const url = `${apiURL}login`;
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
        }
        Keyboard.dismiss()
        this.setState({ isBioLoading: true, snackBarVisible: false })
        request(url, options).then(data => {
            this.setState({ isBioLoading: false });
            if (data.status === 'success') {
                storeUsername(user)
                setCustomerToken(data.token);
                if (data.firstlogin === '1') {
                    navigationservice.navigate('Set Password')
                } else {
                    setCustomer(data.customer);
                    this.props.navigation.navigate('Main')
                }
            } else {
                this.setState({ snackBarVisible: true, isBioLoading: false, errorMsg: data.message })
            }
            // console.log(data)
        }).catch(error => {
            this.setState({ isBioLoading: false, snackBarVisible: true, errorMsg: error.message })
            // console.log(error)
        })

    }


    handleLogin = () => {
        this.setState({
            errorMsg: null
        })
        const url = `${apiURL}login`;
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
        }
        Keyboard.dismiss()
        this.setState({ isLoading: true, snackBarVisible: false })
        request(url, options).then(data => {
            this.setState({ isLoading: false });
            if (data.status === 'success') {
                storeUsername(user)
                setCustomerToken(data.token);
                if (data.firstlogin === '1') {
                    navigationservice.navigate('Set Password')
                } else {
                    setCustomer(data.customer);
                    this.props.navigation.navigate('Main')
                }
            } else {
                this.setState({ snackBarVisible: true, isLoading: false, errorMsg: data.message })
            }
            // console.log(data)
        }).catch(error => {
            this.setState({ isLoading: false, snackBarVisible: true, errorMsg: error.message })
            // console.log(error)
        })

    }
    render() {
        const { username, password, isLoading, errorMsg, snackBarVisible, hasBiometrics, types, canUseBiometric, isBioLoading, showInfoDialog } = this.state;
        const { colors } = this.props.theme
        return (
            <CustomSafeAreaView style={{ backgroundColor: '#f5fcff' }}>
                {/* <StatusBar style='dark'/> */}
                <Loader isLoading={isBioLoading}>
                    <CustomText style={{ textAlign: 'center', fontFamily: 'Baloo' }}>Logging in ...</CustomText>
                </Loader>
                <Portal>
                    <Dialog
                        visible={showInfoDialog}
                        onDismiss={this.hideInfoDialog}>
                        <Dialog.Title style={{ textAlign: 'center' }}>Alert</Dialog.Title>
                        <Dialog.Content style={{ alignItems: 'center', justifyContent: 'center', texAlign: 'center' }}>
                            <Paragraph style={{ fontSize: 16, textAlign: 'center' }}>Please login in normally for the first time to save credentials</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Button onPress={this.hideInfoDialog}>Okay</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <View style={{ flex: 1 }}>
                    <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                        <Appbar.Action icon='close' onPress={() => this.props.navigation.goBack()}
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
                                <CustomText style={{ textAlign: 'left', fontSize: resFont(13), fontFamily: 'Baloo' }}>Kindly provide your username and password to access your loan(s) account</CustomText>
                                {/* {errorMsg && <CustomText style={{ textAlign: 'center', color: colors.error, marginVertical: resHeight(1) }}>{errorMsg}</CustomText>} */}
                                <TextInput
                                    style={{ marginTop: resHeight(1), backgroundColor: 'white', height: resHeight(7) }}
                                    label='Username'
                                    value={username}
                                    mode="outlined"
                                    autoCapitalize='none'
                                    returnKeyType='done'
                                    onChangeText={username => this.setState({ username })}
                                />
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
                                    disabled={isLoading || !username || !password}
                                    mode="contained" onPress={this.handleLogin}>
                                    {isLoading ? 'Logging in' : 'Login'}
                                </Button>

                                {/* {canUseBiometric && types.map((type, index) => <Button key={index} icon={type === 1 ? 'fingerprint' : 'face'}
                                    style={{ marginTop: resHeight(1) }}
                                    labelStyle={{ textTransform: 'capitalize', fontFamily: 'Baloo-med', color: colors.primary }}
                                    onPress={this.tryAuth}
                                >
                                    Login with {type === 1 ? 'Fingerprint': 'Face ID'} Instead
                                </Button>)} */}
                                <Button
                                    style={{ marginTop: resHeight(1) }}
                                    labelStyle={{ textTransform: 'capitalize', fontFamily: 'Baloo-med', color: colors.primary }}
                                    onPress={() => this.props.navigation.navigate('Forgot Password')}
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