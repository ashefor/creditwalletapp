import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, ScrollView, PickerIOSComponent } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, TouchableRipple } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../utils/utils';
import { loanApiURL, requestWithToken } from '../../../utils/request';
import { getUser } from '../../../utils/storage';
import Loader from '../../../components/Loader';
import { LoanContext } from '../provider/LoanProvider';
import PickerComponent from '../../../components/PickerComponent';

const categories = [
    {
        label: 'Service',
        value: 'Service',
    },
    {
        label: 'Housing Wanted',
        value: 'Housing Wanted',
    },
    {
        label: 'Housing Offered',
        value: 'Housing Offered',
    },
    {
        label: 'Electronics & Appliances',
        value: 'Electronics & Appliances',
    },
    {
        label: 'Furniture',
        value: 'Furniture',
    },
    {
        label: 'Job Wanted',
        value: 'Job Wanted',
    },
    {
        label: 'Job Offered',
        value: 'Job Offered',
    }
];

const categoryPlaceholder = {
    label: 'Category',
    value: null,
    color: '#9EA0A4',
};

class StepThree extends Component {
constructor(props) {
    super(props)
    this._textInput = createRef()
}
    renderTouchText = props => {
        const { style, value } = props;
    
        return (
          <TouchableRipple style={{flex: 1, justifyContent: 'center'}} onPress={this.handleFocus}>
            <Text style={{paddingHorizontal: 14}}>{value}</Text>
          </TouchableRipple>
        );
      };

      handleFocus = () => {
          console.log('clicking')
          console.log(this._textInput.current)
        this._textInput.current.handleFocus();
      };
    
      handleBlur = () => {
        setTimeout(this._textInput.current._root._handleBlur, 100);
      };
    render() {
        const { colors } = this.props.theme
        return (
            <LoanContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, marginVertical: resHeight(2) }}>
            <CustomText style={styles.headerText}>
                    personal information
                     </CustomText>
                     <View style={{flex: 1}}>
                         <KeyboardAvoidingView behavior="position">
                     <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(1) }}>
                     <TextInput
                     
                        mode="outlined"
                        label='First Name'
                        style={{ backgroundColor: 'white', width: '47%' }}
                        value={loan.firstName}
                        keyboardType='default'
                        onChangeText={name => loan.setFirstName(name)}
                    />
                    <TextInput
                        mode="outlined"
                        label='Last Name'
                        style={{ backgroundColor: 'white', width: '47%' }}
                        value={loan.lastName}
                        keyboardType='default'
                        onChangeText={name => loan.setLastName(name)}
                    />
                     </View>
                     <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(1) }}>
                     <TextInput
                     ref={this._textInput}
                        render={this.renderTouchText}
                        mode="outlined"
                        label='Title'
                        style={{ backgroundColor: 'white', width: '47%' }}
                        value={loan.amount}
                        keyboardType='default'
                        onChangeText={amount => loan.setAmount(amount)}
                    />
                  <PickerComponent
                                        placeholder={categoryPlaceholder}
                                        items={categories}
                                        onValueChange={loan.setCategory}
                                        value={loan.category}
                                    />
                    <TextInput
                        mode="outlined"
                        label='Gender'
                        style={{ backgroundColor: 'white', width: '47%' }}
                        value={loan.amount}
                        keyboardType='default'
                        onChangeText={amount => loan.setAmount(amount)}
                    />
                     </View>
                     <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(1) }}>
                     <TextInput
                     
                        mode="outlined"
                        label='Title'
                        style={{ backgroundColor: 'white', width: '47%' }}
                        value={loan.amount}
                        keyboardType='numeric'
                        onChangeText={amount => loan.setAmount(amount)}
                    />
                    <TextInput
                        mode="outlined"
                        label='Gender'
                        style={{ backgroundColor: 'white', width: '47%' }}
                        value={loan.amount}
                        keyboardType='numeric'
                        onChangeText={amount => loan.setAmount(amount)}
                    />
                     </View>
                     <View style={styles.bottomcontainer}>
                        <Button mode="contained" contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                        onPress={() => this.props.navigation.navigate('New Application')}>
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
        height: resHeight(5),
    }
})