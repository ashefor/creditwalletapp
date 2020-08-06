


import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../utils/utils';
import { publicURL, requestWithToken } from '../../../utils/request';
import { getCustomer } from '../../../utils/storage';
import Loader from '../../../components/Loader';
import { AutoLoanOfferContext } from '../provider/AutoLoanOfferProvider';
import LiquidateLoan from '../../liquidate/LiquidateLoan';

class AutoOfferStepOne extends Component {
    constructor(props) {
        super(props)
    }
    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦ ${newvalue}`
    }


    render() {
        const { colors } = this.props.theme
        return (
            <AutoLoanOfferContext.Consumer>
                {loan => <View style={{ flex: 1, marginTop: resHeight(2) }}>
                    <CustomText style={{ fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center' }}>
                        We are pleased to inform you that your loan request has been approved under the following terms and conditions
                     </CustomText>
                    <View style={{marginTop: resHeight(1)}}>
                        <View>
                            <CustomText style={{
                                fontSize: resFont(22),
                                textAlign: 'center', color: colors.primary, fontFamily: 'Baloo-med'
                            }}>
                                {this.formatAsCurrency(loan.loan_amount)}
                            </CustomText>
                            <CustomText style={{
                                fontSize: resFont(11),
                                textAlign: 'center', fontFamily: 'Baloo-med'
                            }}>
                                Pre-approved Loan Amount
                                </CustomText>
                            <Slider
                                style={{ width: '100%', marginVertical: resHeight(1), height: 40 }}
                                minimumValue={1}
                                maximumValue={loan.offerLetter.loanamount}
                                onValueChange={(amount) => loan.setAmount(amount)}
                                onSlidingComplete={(amount) => loan.setAmount(amount)}
                                value={loan.loan_amount}
                                step={1}
                                minimumTrackTintColor="#f56b2a"
                                maximumTrackTintColor="#f7971e"
                            />
                        </View>

                        {!loan.offerLetter.verification && <View>
                            <CustomText style={{
                                fontSize: resFont(22),
                                textAlign: 'center', color: colors.primary, fontFamily: 'Baloo-med'
                            }}>
                                {loan.duration} months
                            </CustomText>
                            <CustomText style={{
                                fontSize: resFont(11),
                                textAlign: 'center', fontFamily: 'Baloo-med'
                            }}>
                                Pre-approved Loan Duration
                                </CustomText>
                            <Slider
                                style={{ width: '100%', marginVertical: resHeight(1), height: 40 }}
                                minimumValue={2}
                                maximumValue={6}
                                onValueChange={(duration) => loan.setDuration(duration)}
                                onSlidingComplete={(duration) => loan.setDuration(duration)}
                                value={loan.duration}
                                step={1}
                                minimumTrackTintColor="#f56b2a"
                                maximumTrackTintColor="#f7971e"
                            />
                        </View>}

                        {loan.offerLetter.verification && <View>
                            <CustomText style={{
                                fontSize: resFont(22),
                                textAlign: 'center', color: colors.primary, fontFamily: 'Baloo-med'
                            }}>
                                {loan.duration} months
                            </CustomText>
                            <CustomText style={{
                                fontSize: resFont(11),
                                textAlign: 'center', fontFamily: 'Baloo-med'
                            }}>
                                Pre-approved Loan Duration
                                </CustomText>
                            <Slider
                                style={{ width: '100%', marginVertical: resHeight(1), height: 40 }}
                                minimumValue={2}
                                maximumValue={loan.offerLetter.duration}
                                onValueChange={(duration) => loan.setDuration(duration)}
                                onSlidingComplete={loan.calcRepayment}
                                value={loan.duration}
                                step={1}
                                minimumTrackTintColor="#f56b2a"
                                maximumTrackTintColor="#f7971e"
                            />
                        </View>}
                        <View style={styles.loanofferdetails}>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Monthly Repayment</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.monthlyrepayment)}</CustomText>
                            </View>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Interest rate</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>7.5% per month (i.e 0.25% per day porated</CustomText>
                            </View>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Repayment plan</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Monthly</CustomText>
                            </View>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Number of repayments</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.duration}</CustomText>
                            </View>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Insurance</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.insurance)}</CustomText>
                            </View>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Disbursement Fees</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.disbursementfees)}</CustomText>
                            </View>
                        </View>

                    </View>

                    <View>
                        <CustomText style={{ fontFamily: 'Baloo-semi-bold', textAlign: 'center' }}>
                            By Clicking Continue, I, <CustomText style={{color: '#f56b2a'}}>{loan.offerLetter.loan.firstname}</CustomText> <CustomText style={{color: '#f56b2a'}}>{loan.offerLetter.loan.lastname}</CustomText> accept the Credit Offer with a full understanding of the Loans Terms and Conditions
                        </CustomText>
                    </View>
                    <View>
                        <Button
                            loading={loan.isLoading}
                            disabled={loan.isLoading}
                            contentStyle={styles.button}
                            style={{ marginVertical: resHeight(2), width: '100%', marginHorizontal: resWidth(2) }}
                            onPress={loan.goNext}
                            labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: colors.surface }}
                            mode="contained">
                            Continue
                        </Button>
                    </View>

                </View>}
            </AutoLoanOfferContext.Consumer>
        )
    }
}

export default withTheme(AutoOfferStepOne)

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


