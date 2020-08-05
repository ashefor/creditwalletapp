import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, ScrollView, PickerIOSComponent, Platform } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, TouchableRipple, Colors, HelperText } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../../utils/utils';
import { publicURL, requestWithToken } from '../../../../utils/request';
import { getCustomer } from '../../../../utils/storage';
import Loader from '../../../../components/Loader';
import { InvestmentContext } from '../provider/NewInvestmentProvider';
import PickerComponent from '../../../../components/PickerComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import AndroidSelectPicker from '../../../../components/AndroidSelectPicker';


const durations = [
    {
        label: '6 Months',
        value: '6',
    },
    {
        label: '12 Months',
        value: '12',
    },
];


const durationPlaceholder = {
    label: 'Duration',
    value: null,
    color: '#9EA0A4',
};
class StepOne extends Component {
    static contextType = InvestmentContext;
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this._selectDurationPicker = createRef()
        this._customeInput = createRef()
        this._datePicker = createRef()
        this.state = {
            showDatePicker: false,
        }
    }


    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦ ${newvalue}`
    }

    hasErrors(amount) {
        if (amount) {
            return this.context.unFormat(amount) < 1000000
        }
    }

    invalidAmount(amount) {
        if (amount) {
            return isNaN(this.context.unFormat(amount))
        }
    }
    renderDurationSelect = props => {
        const { style, value, selectDuration } = props;
        return (
            <PickerComponent
                handleFocus={this.handleDurationPickerFocus}
                handleBlur={this.handleDurationPickerBlur}
                placeholder={durationPlaceholder}
                items={durations}
                onValueChange={duration => selectDuration(duration)}
                value={value}
            />
        );
    };

    renderAndroidDurationSelectPicker = props => {
        const { style, value, selectDuration } = props;
        return (
           <AndroidSelectPicker data={durations} onValueChange={selectDuration} value={value} />
        );
    };

    renderDatePicker = props => {
        const { style, value, loan } = props;
        return (
            <TouchableRipple style={{flex: 1, justifyContent: 'center'}} onPress={() => this.handleDatePickerFocus(loan)}>
            <Text style={{paddingHorizontal: 14}}>{value}</Text>
          </TouchableRipple>
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
    handleDurationPickerFocus = () => {
        this._customeInput.current.handleBlur();
        this._selectDurationPicker.current.handleFocus();
    };

    handleBlur = () => {
        setTimeout(() => {
            this._textInput.current.handleBlur()
        }, 100)
    };

    handleDurationPickerBlur = () => {
        // console.log('blur')
        setTimeout(() => {
            this._selectDurationPicker.current.handleBlur()
        }, 100)
    };

    handleDatePickerBlur = () => {
        setTimeout(() => {
            this._datePicker && this._datePicker.current.handleBlur()
        }, 100)
    };

    _handleHideDatePicker = (loan) => {
        this.setState({showDatePicker: false}, this.handleDatePickerBlur())
    }

    render() {
        const { colors } = this.props.theme
        const {showDatePicker} = this.state

        const handleCloseModal = (loan) => {
            loan.confirmDatePicker()
            loan.closeDatePicker()
            this.handleDatePickerBlur()
        }

        const closeDatePicker =(loan) => {
            loan.closeDatePicker()
            this.handleDatePickerBlur()
        }
        
        const selectDate = (event, date, loan) => {
            // console.log(event,date, loan)
            loan.dateOnChange(event, date)
            this.handleDatePickerBlur();
        }
        return (
            <InvestmentContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        <View style={{ flex: 1 }}>
                            <KeyboardAvoidingView>
                            <CustomText style={{
                                fontFamily: 'Baloo-bold', fontSize: resFont(20),
                                textTransform: 'capitalize'
                            }}>
                                Create Portfolio
                     </CustomText>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                <TextInput
                                    mode="outlined"
                                    label='Amount'
                                    style={{ backgroundColor: 'white', height: resHeight(7) }}
                                    value={loan.amount}
                                    keyboardType='number-pad'
                                    returnKeyType='done'
                                    onChangeText={amount => loan.setAmount(amount)}
                                />
                                {this.hasErrors(loan.amount) && <HelperText type='error' >
                                    Amount should be greater than {this.formatAsCurrency(1000000)}
                                </HelperText>}
                                {this.invalidAmount(loan.amount) && <HelperText type='error' >
                                    Invalid Amount. Please check
                                                    </HelperText>}
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                 {Platform.OS === 'ios' &&  <TextInput
                                        ref={this._selectDurationPicker}
                                        render={this.renderDurationSelect}
                                        mode="outlined"
                                        label='Duration'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13)}}
                                        value={loan.duration}
                                        keyboardType='default'
                                        selectDuration={loan.setDuration}
                                    />}
                                    {Platform.OS === 'android' &&  <TextInput
                                        ref={this._selectDurationPicker}
                                        render={this.renderAndroidDurationSelectPicker}
                                        mode="outlined"
                                        label='Duration'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13)}}
                                        value={loan.duration}
                                        keyboardType='default'
                                        selectDuration={loan.setDuration}
                                    />}
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                    <TextInput
                                        returnKeyType='done'
                                        mode="outlined"
                                        label='Referral Code'
                                        ref={this._customeInput}
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.referralcode}
                                        keyboardType='default'
                                        onChangeText={(code => loan.setReferral(code))}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(.5) }}>
                                    <TextInput
                                        ref={this._datePicker}
                                        render={this.renderDatePicker}
                                        mode="outlined"
                                        label='Start Date'
                                        loan={loan}
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.start_date && new Date(loan.start_date).toISOString().slice(0, 10)}
                                    />

                                   {Platform.OS === 'ios' &&  <Modal visible={loan.showDatePicker} transparent={true} onRequestClose={() => closeDatePicker(loan)} >
                                   <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                                 <View style={{width: resWidth(95), marginBottom: 20}}>
                                 <View style={{backgroundColor: 'white', borderRadius: 10}}>
                                     <View style={{paddingVertical: 10}}>
                                         <CustomText style={{textAlign: 'center'}}>
                                             Pick a date
                                         </CustomText>
                                     </View>
                                     <View style={{height: .5, backgroundColor: 'rgba(0,0,0, .2)'}}/>
                                  <DateTimePicker 
                                    mode={'date'}  
                                    testID="dateTimePicker"
                                     is24Hour={true} 
                                     display='calendar'
                                      value={loan.date}
                                      onChange={loan.setDate}
                                      />
                                      <View style={{height: .5, backgroundColor: 'rgba(0,0,0, .2)'}}/>
                                       <Button mode="contained" style={{backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden'}} contentStyle={styles.datePickerBtn} labelStyle={{ textTransform: 'none', fontSize: 17, fontFamily: 'Baloo-med', color: '#f56b2a' }}
                                        onPress={() => handleCloseModal(loan)}>
                                        Confirm
                        </Button>
                                  </View>
                                  <View style={{marginVertical: 10}}>
                                  <Button mode="contained" style={{backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden'}} contentStyle={styles.datePickerBtn} labelStyle={{ textTransform: 'none', fontSize: 17, fontFamily: 'Baloo-med', color: '#f56b2a' }}
                                        onPress={() => closeDatePicker(loan)}>
                                        Cancel
                        </Button>
                                  </View>
                                 </View>
                                   </View>
                                    </Modal>}
                                    {Platform.OS === 'android' && loan.showDatePicker && <DateTimePicker 
                                    mode={'date'}  
                                    testID="dateTimePicker"
                                     is24Hour={true} 
                                     display='calendar'
                                      value={loan.start_date ? loan.start_date : loan.date}
                                      onChange={(event, date) => selectDate(event, date, loan)}
                                      />}
                                </View>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained" 
                                    disabled={!loan.start_date || !loan.duration || !loan.amount || this.hasErrors(loan.amount) || this.invalidAmount(loan.amount) }
                                    contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.proceed}>
                                        Create Portfolio
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

export default withTheme(StepOne)

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