import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native'
import { Appbar, TextInput, Button, withTheme , TouchableRipple, Snackbar} from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { apiURL, request, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';
import { setCustomerToken, setCustomer } from '../../utils/storage';
import CustomText from '../../components/CustomText';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import { Constants } from 'react-native-unimodules';



class ChangePasswordScreen extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        isLoading: false,
        errorMsg: null,
        visible: false,
    };

    _onDismissSnackBar = () => this.setState({ visible: false });
    handleChangePassword = () => {
        this.setState({
            errorMsg: null
        })
        const url = `${apiURL}password/change`;
        const data = {
            oldpassword: this.state.oldPassword,
            newpassword: this.state.newPassword
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        }
        if (!this.state.oldPassword) {
            return alert('Enter password')
        } else if (!this.state.newPassword) {
            return alert('Enter new password')
        } else {
            Keyboard.dismiss()
            this.setState({ isLoading: true })
            requestWithToken(url, options).then(data => {
                this.setState({ isLoading: false }, () => {
                    this.setState({visible: true})
                    this.props.navigation.goBack();
                });
            }).catch(error => {
                this.setState({ isLoading: false , errorMsg: error.message})
            })
        }
       
    }
    render() {
        const {visible, oldPassword, newPassword, isLoading, errorMsg} = this.state;
        const {colors} = this.props.theme
        return (
            <CustomSafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                  
                    <Appbar.Action icon='close' onPress={() => this.props.navigation.goBack()}
                        />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Change Password"
                    />
                      <Appbar.Action
                        
                    />
                    {/* <Appbar.Action icon='close'
                        /> */}
                </Appbar.Header>
                <Loader isLoading={isLoading}/>
                <TouchableWithoutFeedback style={{ backgroundColor: 'red' }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                        <View style={{ marginTop: resHeight(1) }}>
                        <CustomText style={{textAlign: 'left', fontSize: resFont(20), fontFamily: 'Baloo-bold', color: colors.primary}}>Change your password</CustomText>
                        <CustomText style={{textAlign: 'left', fontSize: resFont(13), fontFamily: 'Baloo'}}>Change your Account Password</CustomText>
                        {/* {errorMsg && <CustomText style={{textAlign: 'center', color: colors.error, marginVertical: resHeight(1)}}>{errorMsg}</CustomText>} */}
                        <TextInput
                                secureTextEntry
                                style={{marginTop: resHeight(1), backgroundColor: 'white' }}
                                mode='outlined'
                                label='Old Password'
                                value={oldPassword}
                                returnKeyType='done'
                                onChangeText={oldPassword => this.setState({ oldPassword })}
                            />
                            <TextInput
                                secureTextEntry
                                style={{marginTop: resHeight(1), backgroundColor: 'white', height: resHeight(7) }}
                                mode='outlined'
                                label='New Password'
                                value={newPassword}
                                returnKeyType='done'
                                onChangeText={newPassword => this.setState({ newPassword })}
                            />
                            <Button
                                style={{ marginTop: resHeight(2) }}
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
                            style={{backgroundColor: errorMsg ? 'maroon' : '#297045', color: '#fff'}}
                        >
                            {errorMsg ? errorMsg : 'Password Changed successfully'}
                            </Snackbar>
                    </View>
                </TouchableWithoutFeedback>
            </CustomSafeAreaView>


        )
    }
}

export default withTheme(ChangePasswordScreen);
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