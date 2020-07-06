import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { Appbar, TextInput, Button, withTheme , TouchableRipple} from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { apiURL, request } from '../../utils/request';
import Loader from '../../components/Loader';
import { setToken, setUser } from '../../utils/storage';
import CustomText from '../../components/CustomText';



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
                setToken(data.token);
                setUser(data.customer);
                this.props.navigation.navigate('Main')
                // console.log(data)
            }).catch(error => {
                this.setState({ isLoading: false , errorMsg: error.message})
                // console.log(error)
            })
        }
       
    }
    render() {
        const {username, password, isLoading, errorMsg} = this.state;
        const {colors} = this.props.theme
        return (
            <View style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <Appbar.Header style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Login"
                    />
                    <Appbar.Action
                        />
                </Appbar.Header>
                <Loader isLoading={isLoading} backgroundColor="'rgba(247, 247, 247, .3)'"/>
                <ScrollView  style={{flex: 1}} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} keyboardDismissMode='interactive'>
                    <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                        <View style={{ marginTop: resHeight(1) }}>
                        <CustomText style={{textAlign: 'left', fontSize: resFont(20), fontFamily: 'Baloo-bold', color: colors.primary}}>Hi, Welcome Back</CustomText>
                        <CustomText style={{textAlign: 'left', fontSize: resFont(13), fontFamily: 'Baloo'}}>Kindly provide your username and password to access your account</CustomText>
                        {errorMsg && <CustomText style={{textAlign: 'center', color: colors.error, marginVertical: resHeight(1)}}>{errorMsg}</CustomText>}
                            <TextInput
                                style={{marginTop: resHeight(1) }}
                                label='Username'
                                value={username}
                                mode="outlined"
                                autoCapitalize='none'
                                returnKeyType='done'
                                onChangeText={username => this.setState({ username })}
                            />
                            <TextInput
                                secureTextEntry
                                style={{marginTop: resHeight(1) }}
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
                                mode="contained" onPress={this.handleLogin}>
                                Login
                </Button>
                <Button
                style={{marginTop: resHeight(3)}}
                labelStyle={{textTransform: 'capitalize', fontFamily: 'Baloo-med', color: colors.primary}}
          onPress={() => this.props.navigation.navigate('Forgot Password')}
        >
         Forgot Password?
        </Button>
              
                        </View>
                    </View>
                </ScrollView>
            </View>


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
        height: resHeight(5),
        width: resWidth(90)
    },
});