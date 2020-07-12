import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, ScrollView, PickerIOSComponent, Platform } from 'react-native'
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
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this._selectGenderPicker = createRef()
        this._datePicker = createRef()
        this.state = {
            showDatePicker: false,
        }
    }
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

    renderDatePicker = props => {
        const { style, value, loan } = props;
        return (
            <TouchableRipple style={{flex: 1, justifyContent: 'center'}} onPress={() => this.handleDatePickerFocus(loan)}>
            <Text style={{paddingHorizontal: 14}}>{value}</Text>
          </TouchableRipple>
        );
    };

    handleDatePickerFocus = (loan) => {
        console.log('open')
        loan.setShowDatePicker();
        Platform.OS === 'ios' && this._datePicker.current.handleFocus()
        // this.setState({showDatePicker: true}, () => )
    };
    handleFocus = () => {
        Platform.OS === 'ios' && this._textInput.current.handleFocus();
    };
    handleGenderPickerFocus = () => {
        Platform.OS === 'ios' && this._selectGenderPicker.current.handleFocus();
    };

    handleBlur = () => {
        setTimeout(() => {
            this._textInput.current.handleBlur()
        }, 100)
    };

    handleGenderPickerBlur = () => {
        console.log('blur')
        setTimeout(() => {
            this._selectGenderPicker.current.handleBlur()
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

        const closeAndroidDatePicker = loan => {
        //    console.log(loan.dateOnChange)
           loan.dateOnChange()
            loan.closeDatePicker()
            // this.setState({showDatePicker: false}, )
        }
        
        const dater = (event, date, loan) => {
            // console.log(event,date, loan)
            loan.dateOnChange(event, date)
            this.handleDatePickerBlur();
        }
        return (
            <LoanContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        <View style={{ flex: 1 }}>
                            <KeyboardAvoidingView>
                            <CustomText style={{fontFamily: 'Baloo-bold', fontSize: resFont(20),
        textTransform: 'uppercase'}}>
                            personal information
                     </CustomText>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(1) }}>
                                    <TextInput
                                        ref={this._textInput}
                                        render={this.renderTitleSelect}
                                        mode="outlined"
                                        label='Title'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13) }}
                                        value={loan.title}
                                        keyboardType='default'
                                        selectTile={loan.setTitle}
                                    />
                                    <TextInput
                                        ref={this._selectGenderPicker}
                                        render={this.renderGenderSelect}
                                        mode="outlined"
                                        label='Gender'
                                        style={{ backgroundColor: 'white', width: '47%', fontSize: resFont(13) }}
                                        value={loan.gender}
                                        keyboardType='default'
                                        selectGender={loan.setGender}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput
                                        returnKeyType='done'
                                        mode="outlined"
                                        label='First Name'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.firstname}
                                        keyboardType='default'
                                        onChangeText={name => loan.setFirstName(name)}
                                    />
                                </View>
                                <View style={{marginVertical: resHeight(1) }}>
                                    <TextInput
                                        mode="outlined"
                                        label='Last Name'
                                        returnKeyType='done'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.lastname}
                                        keyboardType='default'
                                        onChangeText={name => loan.setLastName(name)}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput
                                        ref={this._datePicker}
                                        render={this.renderDatePicker}
                                        mode="outlined"
                                        label='Date of birth'
                                        loan={loan}
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.dob && new Date(loan.dob).toLocaleDateString()}
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
                                    maximumDate={new Date(2002, 11, 31)}
                                    minimumDate={new Date(1937, 0, 1)}
                                    testID="dateTimePicker"
                                     is24Hour={true} 
                                     display='calendar'
                                      value={loan.dob ? loan.dob : loan.date}
                                      onChange={(event, dat) => dater(event, dat, loan)}
                                      />}
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput
                                        returnKeyType='done'
                                        mode="outlined"
                                        label='Referral Code'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.referralcode}
                                        keyboardType='default'
                                        onChangeText={(code => loan.setReferral(code))}
                                    />
                                </View>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained" 
                                    disabled={!loan.dob || !loan.gender || !loan.title || !loan.lastname || !loan.firstname}
                                    contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.goNext}>
                                        Next
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