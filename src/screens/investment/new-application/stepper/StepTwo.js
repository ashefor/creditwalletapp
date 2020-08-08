


import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, Colors } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../../utils/utils';
import { publicURL, requestWithToken } from '../../../../utils/request';
import { getCustomer } from '../../../../utils/storage';
import Loader from '../../../../components/Loader';
import { InvestmentContext } from '../provider/NewInvestmentProvider';

class StepTwo extends Component {

    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦ ${newvalue}`
    }

    render() {
        const { colors } = this.props.theme
        return (
            <InvestmentContext.Consumer>
                {loan => <View style={{ flex: 1, marginTop: resHeight(2) }}>
                    <CustomText style={{
                        fontFamily: 'Baloo-semi-bold', fontSize: resFont(13),
                        textTransform: 'capitalize'
                    }}>
                        Kindly see investment terms and details below
                     </CustomText>
                    <View style={[styles.investDetails, styles.mainInfo]}>
                        <ImageBackground source={require('../../../../assets/images/background.jpeg')} style={{ width: '100%', overflow: 'hidden' }}>
                            <View style={styles.card}>
                            <CustomText style={{ fontFamily: 'Baloo-bold', color: colors.primary, fontSize: resFont(17) }}>Investment Details</CustomText>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med' }}>Amount</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo' }}>{this.formatAsCurrency(loan.unFormat(loan.amount))}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med' }}>Interest Rate</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo' }}>{loan.investmentDetails.interest_per_annum}% per annum ({loan.interest_per_month}% per month)</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med' }}>Investment Start date</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo' }}>{loan.investmentDetails.start_date}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med' }}>Investment End date</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo' }}>{loan.investmentDetails.end_date}</CustomText>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={[styles.investDetails, styles.mainInfo]}>
                        <ImageBackground source={require('../../../../assets/images/background.jpeg')} style={{ width: '100%', overflow: 'hidden' }}>
                            <View style={styles.card}>
                            <CustomText style={{ fontFamily: 'Baloo-bold', color: colors.primary, fontSize: resFont(17) }}>First</CustomText>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Month Interest</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>{this.formatAsCurrency(loan.investmentDetails.first_month_interest)}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Month Witholding Tax</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>{this.formatAsCurrency(loan.investmentDetails.first_month_withholding_tax)}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Month Net Interest</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-semi-bold', fontSize: resFont(13),  color: colors.primary }}>{this.formatAsCurrency(loan.investmentDetails.net_first_month_interest)}</CustomText>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={[styles.investDetails, styles.mainInfo]}>
                        <ImageBackground source={require('../../../../assets/images/background.jpeg')} style={{ width: '100%', overflow: 'hidden' }}>
                            <View style={styles.card}>
                            <CustomText style={{ fontFamily: 'Baloo-bold', color: colors.primary, fontSize: resFont(17) }}>Subsequent</CustomText>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Monthly Interest</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>{this.formatAsCurrency(loan.investmentDetails.subsequent_month_interest)}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Monthly Witholding Tax</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>{this.formatAsCurrency(loan.investmentDetails.subsequent_month_interest_withholding_tax)}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Net Interest</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-semi-bold', fontSize: resFont(13), color: colors.primary }}>{this.formatAsCurrency(loan.investmentDetails.net_subsequent_month_interest)}</CustomText>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={[styles.investDetails, styles.mainInfo]}>
                        <ImageBackground source={require('../../../../assets/images/background.jpeg')} style={{ width: '100%', overflow: 'hidden' }}>
                            <View style={styles.card}>
                                <CustomText style={{ fontFamily: 'Baloo-bold', color: colors.primary, fontSize: resFont(17) }}>Total</CustomText>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Interest</CustomText>
                                      <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>{this.formatAsCurrency(loan.investmentDetails.total_interest)}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Witholding Tax</CustomText>
                                      <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>{this.formatAsCurrency(loan.investmentDetails.total_withholding_tax)}</CustomText>
                                </View>
                                <View style={{ display: 'flex', marginVertical: resHeight(.2), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>Net Interest</CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-semi-bold', color: colors.primary , fontSize: resFont(13)}}>{this.formatAsCurrency(loan.investmentDetails.net_total_interest)}</CustomText>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View >
                        <Button
                            loading={loan.isLoading}
                            disabled={loan.isLoading}
                            contentStyle={styles.button}
                            style={{ marginVertical: resHeight(2) }}
                            onPress={loan.goNext}
                            labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: colors.surface, fontSize: resFont(14) }}
                            mode="contained">
                            Proceed
                        </Button>
                    </View>

                </View>}
            </InvestmentContext.Consumer>
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
        marginVertical: resHeight(2)
    },
    investDetails: {
        borderRadius: 10,
        borderWidth: .15,
        borderColor: '#f56b2a',
        overflow: 'hidden',
        marginVertical: resHeight(.2)
        // paddingHorizontal: 20
    },
    card: {
        paddingHorizontal: 15,
        paddingVertical: 7
    },
    mainInfo: {
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10,
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


