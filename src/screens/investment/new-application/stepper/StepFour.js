import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, ScrollView, PickerIOSComponent } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, TouchableRipple, Colors, HelperText } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../../utils/utils';
import { publicURL, requestWithToken } from '../../../../utils/request';
import { getUser } from '../../../../utils/storage';
import Loader from '../../../../components/Loader';
import { InvestmentContext } from '../provider/NewInvestmentProvider';
import PickerComponent from '../../../../components/PickerComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import { states } from '../../../../utils/states';

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

const statesPlaceholder = {
    label: 'State',
    value: null,
    color: '#9EA0A4',
};

class StepFour extends Component {
    static contextType = InvestmentContext
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this._customInput = createRef()
        this.state = {
        }
        // console.log(this.validateEmail())
    }
    renderStateSelect = props => {
        const { style, value, selectState } = props;
        const valueChange = (selectedState) => {
            selectState(selectedState)
            this.handleBlur();
        }
        return (
            <PickerComponent
                handleFocus={this.handleFocus}
                handleBlur={this.handleBlur}
                placeholder={statesPlaceholder}
                items={states}
                onValueChange={selectedState => valueChange(selectedState)}
                value={value}
            />
        );
    };

    handleFocus = () => {
        this._customInput.current.handleBlur();
        this._textInput.current.handleFocus();
    };

    handleBlur = () => {
        setTimeout(() => {
            this._textInput.current.handleBlur()
        }, 100)
    };

    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(String(email).toLowerCase());
        }
    }

    render() {
        const { colors } = this.props.theme
        return (
            <InvestmentContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        <View style={{ flex: 1 }}>
                            <KeyboardAvoidingView>
                                <CustomText style={{
                                    fontFamily: 'Baloo-bold', fontSize: resFont(20),
                                    textTransform: 'uppercase'
                                }}>
                                    contact information
                     </CustomText>
                                <View style={{ marginVertical: resHeight(1) }}>
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
                                        Invalid
                                   </HelperText>}
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
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
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput
                                        ref={this._customInput}
                                        mode="outlined"
                                        label='House Address'
                                        multiline={true}
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.address}
                                        keyboardType='default'
                                        onChangeText={address => loan.setAddress(address)}
                                    />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(1) }}>
                                    <TextInput
                                        ref={this._textInput}
                                        render={this.renderStateSelect}
                                        mode="outlined"
                                        label='State'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13) }}
                                        value={loan.selectedState}
                                        keyboardType='default'
                                        selectState={loan.setSelectedState}
                                    />
                                    <TextInput
                                        ref={this._customInput}
                                        mode="outlined"
                                        label='City'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13) }}
                                        value={loan.city}
                                        keyboardType='default'
                                        onChangeText={city => loan.setCity(city)}
                                    />
                                </View>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained"
                                        disabled={!loan.email || !loan.address || !loan.telephone || !loan.city || !loan.selectedState}
                                        contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.goNext}>
                                        Next
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

export default withTheme(StepFour)

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