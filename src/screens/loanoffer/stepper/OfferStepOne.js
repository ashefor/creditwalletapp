


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
import { LoanOfferContext } from '../provider/LoanOfferProvider';

class OfferStepOne extends Component {
    constructor(props) {
        super(props)
    }
    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦${newvalue}`
    }

    componentDidMount = () => {
        // console.log(this.props.loan)
    }

    render() {
        const { colors } = this.props.theme
        return (
           <LoanOfferContext.Consumer>
               {loan =>  <View style={{ flex: 1, marginTop: resHeight(2)}}>
               <CustomText style={{fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center'}}>
                    We are pleased to inform you that your loan request has been approved under the following terms and conditions
                     </CustomText>
                    <View style={styles.loanofferdetails}>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Borrower</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.offerLetter.firstname} {loan.offerLetter.lastname}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Borrower Employer</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.offerLetter.place_of_work}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Amount</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.offerLetter.loan_amount)}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Duration</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.offerLetter.tenor} Month(s)</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Monthly Repayment</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.offerLetter.monthly_repayment)}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Interest rate</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>7.5% per month (i.e 0.25% per day porated</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Number of repayments</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.offerLetter.tenor}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Insurance</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.offerLetter.insurance)}</CustomText>
                        </View>
                        <View style={styles.loaninforow}>
                            <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Interest rate</CustomText>
                            </View>
                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.offerLetter.disbursementfee)}</CustomText>
                        </View>
                    </View>

                    <View>
                        <CustomText style={{ fontFamily: 'Baloo-semi-bold', textAlign: 'center' }}>
                        By Clicking Continue, I, <CustomText style={{ color: '#f56b2a'}}>
                        {loan.offerLetter.firstname} 
                            </CustomText> <CustomText style={{ color: '#f56b2a'}}>{loan.offerLetter.lastname}</CustomText> accept the Credit Offer with a full understanding of the Loans Terms and Conditions
                        </CustomText>
                    </View>
                    <View>
                        <Button
                            loading={loan.isLoading}
                            disabled={loan.isLoading}
                            contentStyle={styles.button}
                            style={{ marginVertical: resHeight(2), width: '100%',  marginHorizontal: resWidth(2) }}
                            onPress={loan.goNext}
                            labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: colors.surface }}
                            mode="contained">
                            Continue
                        </Button>
                    </View>
               
            </View>}
           </LoanOfferContext.Consumer>
        )
    }
}

export default withTheme(OfferStepOne)

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


