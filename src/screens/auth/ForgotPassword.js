import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { Appbar, TextInput, Button, withTheme, TouchableRipple, Snackbar } from 'react-native-paper';
import OnboardCarousel from '../../components/OnboardCarousel';
import { SafeAreaView } from 'react-navigation';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { apiURL, request } from '../../utils/request';
import Loader from '../../components/Loader';
import { setToken, setUser } from '../../utils/storage';
import CustomText from '../../components/CustomText';



class ForgotPasswordScreen extends Component {
    state = {
        username: '',
        isLoading: false,
        errorMsg: null,
        visible: false,
    };

    handleLogin = () => {
        this.setState({
            errorMsg: null
        })
        const url = `${apiURL}password/reset`;
        const user = {
            username: this.state.username,
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
        }
        if (!this.state.username) {
            return alert('Enter username')
        } else {
            Keyboard.dismiss()
            this.setState({ isLoading: true })
            request(url, options).then(data => {
                this.setState({ isLoading: false });
                this.setState({visible: true}, () => {
                    this.props.navigation.navigate('Login')
                })
                setToken(data.token);
                // console.log()
                setUser(data.customer);
                // console.log(data)
            }).catch(error => {
                this.setState({ isLoading: false, errorMsg: error.message })
                // console.log(error)
            })
        }

    }


    _onDismissSnackBar = () => this.setState({ visible: false });
    render() {
        const { username, isLoading, errorMsg, visible } = this.state;
        const { colors } = this.props.theme
        return (
            <View style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <Appbar.Header style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Reset Password"
                    />
                    <Appbar.Action
                    />
                </Appbar.Header>
                <Loader isLoading={isLoading} backgroundColor="'rgba(247, 247, 247, .3)'" />
                <ScrollView  style={{flex: 1}} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} keyboardDismissMode='interactive'>
                    <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                        <View style={{ marginTop: resHeight(1) }}>
                        <CustomText style={{textAlign: 'left', fontSize: resFont(20), fontFamily: 'Baloo-bold', color: colors.primary}}>Forgot Password</CustomText>
                        <CustomText style={{textAlign: 'left', fontSize: resFont(13), fontFamily: 'Baloo'}}>Reset your password</CustomText>
                            {errorMsg && <CustomText style={{ textAlign: 'center', color: colors.error, marginVertical: resHeight(1) }}>{errorMsg}</CustomText>}
                            <TextInput
                                style={{marginTop: resHeight(1) }}
                                label='Username'
                                mode='outlined'
                                value={username}
                                autoCapitalize='none'
                                onChangeText={username => this.setState({ username })}
                            />
                            <Button
                                style={{ marginTop: resHeight(2) }}
                                labelStyle={{ textTransform: 'none', color: 'white', fontSize: 15, fontFamily: 'Baloo-med' }}
                                contentStyle={styles.loginbtn}
                                mode="contained" onPress={this.handleLogin}>
                                Reset Password
                            </Button>
                            <Button
                style={{marginTop: resHeight(3)}}
                labelStyle={{textTransform: 'capitalize', fontFamily: 'Baloo-med', color: colors.primary}}
          onPress={() => this.props.navigation.navigate('Login')}
        >
         Back to Login
        </Button>
                        </View>
                        <Snackbar
                            visible={visible}
                            onDismiss={this._onDismissSnackBar}
                            action={{
                                label: 'Undo',
                                onPress: () => {
                                    // Do something
                                },
                            }}
                        >
                            Success
                            </Snackbar>
                    </View>
                </ScrollView>
            </View>


        )
    }
}

export default withTheme(ForgotPasswordScreen);
const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 30
    },
    loginbtn: {
        height: resHeight(5),
        width: resWidth(90)
    },
});