import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, HelperText } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../../utils/utils';
import { publicURL, requestWithToken } from '../../../../utils/request';
import { getCustomer } from '../../../../utils/storage';
import Loader from '../../../../components/Loader';
import { InvestmentContext } from '../provider/NewInvestmentProvider';
import * as DocumentPicker from 'expo-document-picker';
import PickerComponent from '../../../../components/PickerComponent';
import { salaryBanks } from '../../../../utils/salaryBanks';
import AndroidSelectPicker from '../../../../components/AndroidSelectPicker';

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
        label: 'Miss',
        value: 'Miss',
    },
    {
        label: 'Alhaji',
        value: 'Alhaji',
    },
    {
        label: 'Alhaja',
        value: 'Alhaja',
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

const genders = [
    {
        label: 'Male',
        value: 'male',
    },
    {
        label: 'Female',
        value: 'female',
    },
];

const banksPlaceholder = {
    label: 'Bank Name',
    value: null,
    color: '#9EA0A4',
};

const titlePlaceholder = {
    label: 'Title',
    value: null,
    color: '#9EA0A4',
};

const genderPlaceholder = {
    label: 'Gender',
    value: null,
    color: '#9EA0A4',
};
class StepThree extends Component {
    static contextType = InvestmentContext;
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this._selectGenderPicker = createRef()
        this._customeInput = createRef()
        this._customInput = createRef()
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
        this._customInput.current.handleBlur()
        this._textInput.current.handleFocus();
    };

    handleBlur = () => {
        setTimeout(() => {
            this._textInput.current.handleBlur()
        }, 100)
    };

    renderTitleSelect = props => {
        const { style, value, selectTile } = props;
        const valueChange = (title) => {
            selectTile(title)
            this.handleBlur();
        }
        return (
            <PickerComponent
                handleFocus={this.handleFocus}
                handleBlur={this.handleBlur}
                placeholder={titlePlaceholder}
                items={titles}
                onValueChange={title => valueChange(title)}
                value={value}
            />
        );
    };

    renderAndroidTitleSelectPicker = props => {
        const { style, value, selectTile } = props;
        const valueChange = (title) => {
            selectTile(title)
            this.handleBlur();
        }
        return (
           <AndroidSelectPicker value={value} onValueChange={selectTile} data={titles}/>
        );
    };
    renderGenderSelect = props => {
        const { style, value, selectGender } = props;
        return (
            <PickerComponent
                handleFocus={this.handleGenderPickerFocus}
                handleBlur={this.handleGenderPickerBlur}
                placeholder={genderPlaceholder}
                items={genders}
                onValueChange={gender => selectGender(gender)}
                value={value}
            />
        );
    };


    renderAndroidGenderSelectPicker = props => {
        const { style, value, selectGender } = props;
        return (
            <AndroidSelectPicker data={genders}
            onValueChange={selectGender}
            value={value} />
        );
    };

    handleDatePickerFocus = (loan) => {
        // console.log('open')
        this._customeInput.current.handleBlur();
        loan.setShowDatePicker();
        this._datePicker.current.handleFocus()
        // this.setState({showDatePicker: true}, () => )
    };
    handleFocus = () => {
        this._customeInput.current.handleBlur();
        this._textInput.current.handleFocus();
    };
    handleGenderPickerFocus = () => {
        this._customeInput.current.handleBlur();
        this._selectGenderPicker.current.handleFocus();
    };

    handleBlur = () => {
        setTimeout(() => {
            this._textInput.current.handleBlur()
        }, 100)
    };

    handleGenderPickerBlur = () => {
        // console.log('blur')
        setTimeout(() => {
            this._selectGenderPicker.current.handleBlur()
        }, 100)
    };


    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(String(email).toLowerCase());
        }
    }

    render() {
        return (
            <InvestmentContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        <View style={{ flex: 1 }}>
                            <KeyboardAvoidingView>
                            <CustomText style={{fontFamily: 'Baloo-bold', fontSize: resFont(13),
        textTransform: 'capitalize'}}>
                            Kindly provide the details below to complete investment process
                     </CustomText>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                   {Platform.OS === 'ios' &&  <TextInput
                                        ref={this._textInput}
                                        render={this.renderTitleSelect}
                                        mode="outlined"
                                        label='Title'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13) }}
                                        value={loan.title}
                                        keyboardType='default'
                                        selectTile={loan.setTitle}
                                    />}

                                    {Platform.OS === 'android' &&  <TextInput
                                        ref={this._textInput}
                                        render={this.renderAndroidTitleSelectPicker}
                                        mode="outlined"
                                        label='Title'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13) }}
                                        value={loan.title}
                                        keyboardType='default'
                                        selectTile={loan.setTitle}
                                    />}
                                   {Platform.OS === 'ios' &&  <TextInput
                                        ref={this._selectGenderPicker}
                                        render={this.renderGenderSelect}
                                        mode="outlined"
                                        label='Gender'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13)}}
                                        value={loan.gender}
                                        keyboardType='default'
                                        selectGender={loan.setGender}
                                    />}
                                    {Platform.OS === 'android' &&  <TextInput
                                        ref={this._selectGenderPicker}
                                        render={this.renderAndroidGenderSelectPicker}
                                        mode="outlined"
                                        label='Gender'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13)}}
                                        value={loan.gender}
                                        keyboardType='default'
                                        selectGender={loan.setGender}
                                    />}
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                    <TextInput
                                        returnKeyType='done'
                                        mode="outlined"
                                        label='First Name'
                                        ref={this._customeInput}
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.firstname}
                                        keyboardType='default'
                                        onChangeText={name => loan.setFirstName(name)}
                                    />
                                </View>
                                <View style={{marginVertical: resHeight(.5) }}>
                                    <TextInput
                                        mode="outlined"
                                        label='Last Name'
                                        returnKeyType='done'
                                        ref={this._customeInput}
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.lastname}
                                        keyboardType='default'
                                        onChangeText={name => loan.setLastName(name)}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                    <TextInput
                                        ref={this._customInput}
                                        mode="outlined"
                                        label='Email'
                                        returnKeyType='done'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.email}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        onChangeText={email => loan.setEmail(email)}
                                    />
                                    {this.validateEmail(loan.email) && <HelperText type='error' visible={true}>
                                        Please valid email only
                                   </HelperText>}
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                    <TextInput
                                        ref={this._customInput}
                                        mode="outlined"
                                        label='Phone Number'
                                        returnKeyType='done'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.telephone}
                                        autoCapitalize='none'
                                        keyboardType='phone-pad'
                                        onChangeText={phonenumber => loan.setPhone(phonenumber)}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                <TextInput
                                        ref={this._textInput}
                                        render={this.renderBankSelect}
                                        mode="outlined"
                                        label='Bank Name'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.salary_bank_name}
                                        keyboardType='default'
                                        selectBank={loan.setBankCode}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                    <TextInput
                                    ref={this._customInput}
                                        mode="outlined"
                                        label='Bank Account'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.salary_bank_account}
                                        keyboardType='number-pad'
                                        returnKeyType='done'
                                        onChangeText={account => loan.setBankAccount(account)}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                    <TextInput
                                        returnKeyType='done'
                                        mode="outlined"
                                        label='Tax Id (Optional)'
                                        ref={this._customeInput}
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.tax_id}
                                        keyboardType='default'
                                        onChangeText={(code => loan.setTaxId(code))}
                                    />
                                </View>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained" 
                                    disabled={!loan.gender || !loan.title || !loan.lastname || !loan.firstname}
                                    contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.verifyAccount}>
                                        Continue
                        </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                </TouchableWithoutFeedback>}
            </InvestmentContext.Consumer>
        )
    }
}

export default withTheme(StepThree)

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
    button: {
        height: resHeight(6),
    },
    bottomcontainer: {
        marginVertical: resHeight(1)
    }
})