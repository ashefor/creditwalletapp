import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
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
                console.log(data)
            }).catch(error => {
                this.setState({ isLoading: false , errorMsg: error.message})
                console.log(error)
            })
        }
       
    }
    render() {
        const {username, password, isLoading, errorMsg} = this.state;
        const {colors} = this.props.theme
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
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
                <TouchableWithoutFeedback style={{ backgroundColor: 'red' }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                        <View style={{ marginTop: resHeight(3) }}>
                        {errorMsg && <CustomText style={{textAlign: 'center', color: colors.error}}>{errorMsg}</CustomText>}
                            <TextInput
                                style={{ backgroundColor: 'transparent' }}
                                label='Username'
                                value={username}
                                autoCapitalize='none'
                                onChangeText={username => this.setState({ username })}
                            />
                            <TextInput
                                secureTextEntry
                                style={{ backgroundColor: 'transparent' }}
                                label='Password'
                                value={password}
                                onChangeText={password => this.setState({ password })}
                            />
                            <Button
                                style={{ marginTop: resHeight(2) }}
                                labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med' }}
                                contentStyle={styles.loginbtn}
                                mode="contained" onPress={this.handleLogin}>
                                Login
                </Button>
                <Button
                style={{marginTop: resHeight(3)}}
                labelStyle={{textTransform: 'capitalize', color: colors.primary}}
          onPress={() => this.props.navigation.navigate('Forgot Password')}
        >
         Forgot Password?
        </Button>
              
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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