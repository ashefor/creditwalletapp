


import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../utils/utils';
import { loanApiURL, requestWithToken } from '../../../utils/request';
import { getUser } from '../../../utils/storage';
import Loader from '../../../components/Loader';
import { LoanContext } from '../provider/NewLoanProvider';

class StepTwo extends Component {

    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦${newvalue}`
    }

    render() {
        const { colors } = this.props.theme
        return (
           <LoanContext.Consumer>
               {loan =>  <View style={{ flex: 1, marginTop: resHeight(2)}}>
                   <CustomText style={{fontFamily: 'Baloo-bold', fontSize: resFont(20),
        textTransform: 'uppercase'}}>
                    Loan breakdown
                     </CustomText>
                    <View style={styles.loanofferdetails}>
                    
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Amount</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.amount)}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Duration</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.duration} month(s)</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Monthly Repayment</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.loanOffer.monthlyrepayment)}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Start Date</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.loanOffer.startdate}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan End Date</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.loanOffer.expectedenddate}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Interest per day</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>0.25%</CustomText>
                        </View>
                    </View>

                    <View>
                        <CustomText style={{ fontFamily: 'Baloo-semi-bold', textAlign: 'justify' }}>
                            By clicking Start Application, I consent to Credit Wallet obtaining information from relevant third parties as may be necessary, on my employment details, salary payment, loans and other related data, to make a decision on my loan application. I also consent to the loan amounts being deducted from my salary at source before credit to my account and any outstanding loans being recovered automatically from any other accounts linked to me in the case of default
                        </CustomText>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            disabled={loan.isLoading}
                            contentStyle={styles.button}
                            onPress={loan.goBack}
                            style={{ backgroundColor: loan.isLoading ? 'rgba(0,0,0,0.12)' : '#9b9b9b', marginVertical: resHeight(2), width: '45%', marginHorizontal: resWidth(2) }}
                            labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: colors.surface }}
                            mode="contained">
                            Back
                        </Button>
                        <Button
                            loading={loan.isLoading}
                            disabled={loan.isLoading}
contentStyle={styles.button}
                            style={{ marginVertical: resHeight(2), width: '45%', marginHorizontal: resWidth(2) }}
                            onPress={loan.goNext}
                            labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: colors.surface }}
                            mode="contained">
                            Proceed
                        </Button>
                    </View>
               
            </View>}
           </LoanContext.Consumer>
        )
    }
}

export default withTheme(StepTwo)

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
    }
})


