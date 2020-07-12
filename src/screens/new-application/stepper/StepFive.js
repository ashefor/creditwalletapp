import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, ScrollView, PickerIOSComponent } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, TouchableRipple, Colors } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../utils/utils';
import { loanApiURL, requestWithToken } from '../../../utils/request';
import { getUser } from '../../../utils/storage';
import Loader from '../../../components/Loader';
import { LoanContext } from '../provider/NewLoanProvider';
import PickerComponent from '../../../components/PickerComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import { states } from '../../../utils/states';
import { salaryBanks } from '../../../utils/salaryBanks';
import { Constants } from 'react-native-unimodules';

const titles = [
    {
        label: 'Mr',
        value: 'Mr',
    },
    {
        label: 'Mrs',
        value: 'Mrs',
    },
    {
        label: 'Alhaji',
        value: 'Alhaji',
    },
    {
        label: 'Chief',
        value: 'Chief',
    },
    {
        label: 'Dr',
        value: 'Dr',
    },
];

const banksPlaceholder = {
    label: 'Salary Bank Name',
    value: null,
    color: '#9EA0A4',
};

class StepFive extends Component {
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this.state = {
        }
    }
    renderBankSelect = props => {
        const { style, value, selectBank } = props;
        return (
            <PickerComponent
                handleFocus={this.handleFocus}
                handleBlur={this.handleBlur}
                placeholder={banksPlaceholder}
                items={salaryBanks}
                onValueChange={bankcode => selectBank(bankcode)}
                value={value}
            />
        );
    };

    handleFocus = () => {
        this._textInput.current.handleFocus();
    };

    handleBlur = () => {
        setTimeout(() => {
            this._textInput.current.handleBlur()
        }, 100)
    };


    render() {
        const { colors } = this.props.theme
        return (
            <LoanContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        <CustomText style={{fontFamily: 'Baloo-bold', fontSize: resFont(20),
        textTransform: 'uppercase'}}>
                            employment information
                     </CustomText>
                        <View style={{ flex: 1 }}>
                            <KeyboardAvoidingView behavior='padding'>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput

                                        mode="outlined"
                                        label='Place of Work'
                                        returnKeyType='done'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.place_of_work}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        onChangeText={work => loan.setPlaceOfWork(work)}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput

                                        mode="outlined"
                                        label='IPPIS Number'
                                        returnKeyType='done'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.ippisnumber}
                                        autoCapitalize='none'
                                        keyboardType='number-pad'
                                        onChangeText={ippisnumber => loan.setIppisNumber(ippisnumber)}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
                                <TextInput
                                        ref={this._textInput}
                                        render={this.renderBankSelect}
                                        mode="outlined"
                                        label='Salary Bank Name'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.salary_bank_name}
                                        keyboardType='default'
                                        selectBank={loan.setBankCode}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput
                                        mode="outlined"
                                        label='Salary Bank Account'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.salary_bank_account}
                                        keyboardType='number-pad'
                                        returnKeyType='done'
                                        onChangeText={account => loan.setBankAccount(account)}
                                    />
                                </View>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained" 
                                    disabled={!loan.salary_bank_account || !loan.salary_bank_name || !loan.place_of_work || loan.isValidating}
                                    loading={loan.isValidating}
                                    contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.verifyAccount}>
                                        {loan.isValidating ? 'Applying' : 'Complete'}
                        </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                </TouchableWithoutFeedback>}
            </LoanContext.Consumer>
        )
    }
}

export default withTheme(StepFive)

const styles = StyleSheet.create({
    loaninforow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: resHeight(.5)
    },
    loanofferdetails: {
        borderTopWidth: .3,
        borderColor: '#f56b2a',
        borderBottomWidth: .3,
        marginVertical: resHeight(2)
    },
    headerText: {
        fontFamily: 'Baloo-bold',
        fontWeight: 'bold',
        fontSize: resFont(17),
        // color: '#f56b2a',
        textTransform: 'uppercase'
    },
    bottomcontainer: {
        // flex: 1,
        // alignSelf: 'flex-end'
        marginVertical: resHeight(5)
    },
    button: {
        height: resHeight(6),
    },
    datePickerBtn: {
        height: resHeight(6),
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10
    }
})