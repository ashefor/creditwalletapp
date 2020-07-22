import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput as RNTextInput, Keyboard, ScrollView } from 'react-native'
import { Appbar, TextInput, Button, withTheme, TouchableRipple } from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../../../utils/utils';
import { apiURL, request } from '../../../utils/request';
import Loader from '../../../components/Loader';
import { setToken, setUser } from '../../../utils/storage';
import CustomText from '../../../components/CustomText';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';
import navigationservice from '../../../utils/navigationservice';
import { NavigationActions } from 'react-navigation';



class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
        isLoading: false,
        errorMsg: null
    };
    
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
        if (!this.state.username) {
            return alert('Enter username')
        } else if (!this.state.password) {
            return alert('Enter password')
        } else {
            Keyboard.dismiss()
            this.setState({ isLoading: true })
            request(url, options).then(data => {
                this.setState({ isLoading: false });
                if (data.status === 'success') {
                    setToken(data.token);
                    if (data.firstlogin === '1') {
                        navigationservice.navigate('Set Password')
                    } else {
                        setUser(data.customer);
                        this.props.navigation.navigate('Main')
                    }
                }
                // console.log(data)
            }).catch(error => {
                this.setState({ isLoading: false, errorMsg: error.message })
                // console.log(error)
            })
        }

    }
    render() {
        const { username, password, isLoading, errorMsg } = this.state;
        const { colors } = this.props.theme
        return (
            <CustomSafeAreaView style={{ backgroundColor: '#f5fcff' }}>
                <View style={{ flex: 1 }}>
                    <Appbar.Header statusBarHeight={0} style={{ backgroundColor: '#f5fcff', elevation: 1 }}>
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
                                {/* <CustomText style={{ textAlign: 'left', fontSize: resFont(20), fontFamily: 'Baloo-bold', color: colors.primary }}>Hi, Welcome Back</CustomText> */}
                                <CustomText style={{ textAlign: 'left', fontSize: resFont(14), fontFamily: 'Baloo' }}>Kindly provide your email and password to access portal</CustomText>
                                {errorMsg && <CustomText style={{ textAlign: 'center', color: colors.error, marginVertical: resHeight(1) }}>{errorMsg}</CustomText>}
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
                                    disabled={isLoading}
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