import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button, withTheme } from 'react-native-paper';
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont } from '../../../utils/utils';
import { salaryBanks } from '../../../utils/salaryBanks';
import { LoanOfferContext } from '../provider/LoanOfferProvider';
import * as DocumentPicker from 'expo-document-picker';
import PickerComponent from '../../../components/PickerComponent';

const banksPlaceholder = {
    label: 'Salary Bank Name',
    value: null,
    color: '#9EA0A4',
};

class OfferStepTwo extends Component {
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this.state = {
        }
    }
    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});

        alert(result.uri)

        // console.log(result);
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
            <LoanOfferContext.Consumer>
                {loan => <Fragment>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        <View style={{ flex: 1, marginTop: resHeight(1) }}>
                            <KeyboardAvoidingView> 
                            <CustomText style={{ fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center' }}>
                            To proceed please provide details of your preferred account to receive your funds
                     </CustomText>
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
                                        disabled={!loan.salary_bank_account || !loan.salary_bank_name || loan.isValidating}
                                        loading={loan.isValidating}
                                        contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.verifyAccount}>
                                        Start Application
                        </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                </Fragment>}
            </LoanOfferContext.Consumer>
        )
    }
}

export default withTheme(OfferStepTwo)

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
        marginVertical: resHeight(5)
    },
    button: {
        height: resHeight(6),
    }
})