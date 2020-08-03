import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, Divider } from 'react-native-paper';
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../utils/utils';
import { AutoLoanOfferContext } from '../provider/AutoLoanOfferProvider';


class AutoOfferStepFive extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦ ${newvalue}`
    }

    render() {
        const { colors } = this.props.theme
        return (
            <AutoLoanOfferContext.Consumer>
                {loan => <Fragment>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        
                        <View style={{ flex: 1, marginTop: resHeight(1) }}>
                            <KeyboardAvoidingView>
                            <CustomText style={{ fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center' }}>
                        Kindly confirm the acceptance of your loan details below
                     </CustomText>
                            <View style={styles.loanofferdetails}>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start',  width: '50%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Borrower</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15),  width: '50%', textAlign: 'right', fontFamily: 'Baloo' }}>{loan.offerLetter.loan.firstname} {loan.offerLetter.loan.lastname}</CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '50%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Borrower Employer</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), width: '50%', fontFamily: 'Baloo', textAlign: 'right' }}>{loan.offerLetter.loan.place_of_work} </CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '50%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Amount</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' , width: '50%', textAlign: 'right', }}>{this.formatAsCurrency(loan.loan_amount)}</CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '50%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Duration</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo', width: '50%', textAlign: 'right', }}>{loan.duration} months</CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '50%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Monthly Repayment</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo', width: '50%', textAlign: 'right', }}>{this.formatAsCurrency(loan.monthlyrepayment)}</CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '50%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Interest rate</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo', width: '50%', textAlign: 'right', }}>7.5% per month (i.e 0.25% per day porated</CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med',textAlign: 'right', }}>Number of repayments</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{loan.duration}</CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%', textAlign: 'left' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Insurance</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo', textAlign: 'right', }}>{this.formatAsCurrency(loan.insurance)}</CustomText>
                            </View>
                            <Divider style={{backgroundColor: colors.primary}}/>
                            <View style={styles.loaninforow}>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Disbursement Fees</CustomText>
                                </View>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo', width: '30%', textAlign: 'right', }}>{this.formatAsCurrency(loan.disbursementfees)}</CustomText>
                            </View>
                        </View>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained"
                                        disabled={loan.isAccepting}
                                        loading={loan.isAccepting}
                                        contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.complete}>
                                        Complete
                        </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                </Fragment>}
            </AutoLoanOfferContext.Consumer>
        )
    }
}

export default withTheme(AutoOfferStepFive)

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