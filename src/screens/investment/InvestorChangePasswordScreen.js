import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native'
import { Appbar, TextInput, Button, withTheme, TouchableRipple, Snackbar, HelperText } from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { apiURL, request, requestWithToken, investmentURL, investorequestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';
import { setCustomerToken, setCustomer } from '../../utils/storage';
import CustomText from '../../components/CustomText';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import { Constants } from 'react-native-unimodules';
import { NavigationEvents } from 'react-navigation';



class InvestorChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            oldPassword: '',
            password: '',
            password_confirmation: '',
            isLoading: false,
            errorMsg: null,
            visible: false,
        };
        this.state = this.initialState
    }

    _onDismissSnackBar = () => this.setState({ visible: false });
    handleChangePassword = () => {
        this.setState({
            errorMsg: null
        })
        const url = `${investmentURL}change-password`;
        const data = {
            oldpassword: this.state.oldPassword,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        }
        if (!this.state.oldPassword) {
            return alert('Enter password')
        } else if (!this.state.password) {
            return alert('Enter new password')
        } else {
            Keyboard.dismiss()
            this.setState({ isLoading: true })
            investorequestWithToken(url, options).then(data => {
                this.setState({ isLoading: false }, () => {
                    this.setState({ visible: true })
                    // this.props.navigation.goBack();
                });
                // console.log(data)
            }).catch(error => {
                this.setState({ isLoading: false, errorMsg: error.message })
                console.log(error)
            })
        }

    }


    confirmNewPassword = password => {
        if (password) {
            return password !== this.state.password;
        }
    }

    componentWillUnmount = () => {
        console.log('unmount')
    }
    render() {
        const { visible, oldPassword, password, password_confirmation, isLoading, errorMsg } = this.state;
        const { colors } = this.props.theme
        return (
            <CustomSafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <NavigationEvents
                    onDidBlur={() => this.setState(this.initialState)}
                />
                <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0 }}>

                    <Appbar.Action icon='menu'
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Change Password"
                    />
                    <Appbar.Action

                    />
                </Appbar.Header>
                <Loader isLoading={isLoading} />
                <TouchableWithoutFeedback style={{ backgroundColor: 'red' }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                        <View style={{ marginTop: resHeight(1) }}>
                            <CustomText style={{ textAlign: 'left', fontSize: resFont(20), fontFamily: 'Baloo-bold', color: colors.primary }}>Change your password</CustomText>
                            <CustomText style={{ textAlign: 'left', fontSize: resFont(13), fontFamily: 'Baloo' }}>Change your Account Password</CustomText>
                            {errorMsg && <CustomText style={{ textAlign: 'center', color: colors.error, marginVertical: resHeight(1) }}>{errorMsg}</CustomText>}
                            <TextInput
                                secureTextEntry
                                style={{ marginTop: resHeight(1), backgroundColor: 'white' }}
                                mode='outlined'
                                label='Old Password'
                                value={oldPassword}
                                returnKeyType='done'
                                onChangeText={oldPassword => this.setState({ oldPassword })}
                            />
                            <TextInput
                                secureTextEntry
                                style={{ marginTop: resHeight(1), backgroundColor: 'white', height: resHeight(7) }}
                                mode='outlined'
                                label='New Password'
                                value={password}
                                returnKeyType='done'
                                onChangeText={password => this.setState({ password })}
                            />
                            <TextInput
                                secureTextEntry
                                style={{ marginTop: resHeight(1), backgroundColor: 'white', height: resHeight(7) }}
                                mode='outlined'
                                label='Confirm Password'
                                value={password_confirmation}
                                returnKeyType='done'
                                onChangeText={password => this.setState({ password_confirmation: password })}
                            />
                            {this.confirmNewPassword(password_confirmation) && <HelperText type='error' >
                                Passwords must match
                                                    </HelperText>}
                            <Button
                                style={{ marginTop: resHeight(2) }}
                                disabled={!oldPassword || !password || !password_confirmation || this.confirmNewPassword(password_confirmation)}
                                labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                contentStyle={styles.loginbtn}
                                mode="contained" onPress={this.handleChangePassword}>
                                Change password
                            </Button>

                        </View>
                        <Snackbar
                            visible={visible}
                            onDismiss={this._onDismissSnackBar}
                            action={{
                                label: 'Okay',
                                onPress: () => {
                                    // Do something
                                },
                            }}
                            style={{ backgroundColor: '#297045', color: '#fff' }}
                        >
                            Password Changed successfully
                            </Snackbar>
                    </View>
                </TouchableWithoutFeedback>
            </CustomSafeAreaView>


        )
    }
}

export default withTheme(InvestorChangePasswordScreen);
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
    textboxfieldd: {
        fontFamily: 'Baloo'
    }
});