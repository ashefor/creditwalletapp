import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Appbar, TextInput, Button, withTheme , TouchableRipple, Snackbar} from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import { apiURL, request, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';
import { setToken, setUser } from '../../utils/storage';
import CustomText from '../../components/CustomText';



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
                console.log(data)
            }).catch(error => {
                this.setState({ isLoading: false , errorMsg: error.message})
                console.log(error)
            })
        }
       
    }
    render() {
        const {visible, oldPassword, newPassword, isLoading, errorMsg} = this.state;
        const {colors} = this.props.theme
        return (
            <View style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <Appbar.Header style={{ backgroundColor: '#f5fcff', elevation: 1 }}>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Change Password"
                    />
                    <Appbar.Action
                        />
                </Appbar.Header>
                <Loader isLoading={isLoading}/>
                <TouchableWithoutFeedback style={{ backgroundColor: 'red' }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                        <View style={{ marginTop: resHeight(3) }}>
                        {errorMsg && <CustomText style={{textAlign: 'center', color: colors.error}}>{errorMsg}</CustomText>}
                        <TextInput
                                secureTextEntry
                                style={{ backgroundColor: 'transparent' }}
                                label='Old Password'
                                value={oldPassword}
                                onChangeText={oldPassword => this.setState({ oldPassword })}
                            />
                            <TextInput
                                secureTextEntry
                                style={{ backgroundColor: 'transparent' }}
                                label='New Password'
                                value={newPassword}
                                onChangeText={newPassword => this.setState({ newPassword })}
                            />
                            <Button
                                style={{ marginTop: resHeight(2) }}
                                labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med' }}
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
                        >
                            Changed successfully
                            </Snackbar>
                    </View>
                </TouchableWithoutFeedback>
            </View>


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
        height: resHeight(5),
        width: resWidth(90)
    },
});