import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, StyleSheet, RefreshControl } from 'react-native';

import { Appbar, List, Text, Button, Divider, TouchableRipple, Surface, Title, Paragraph, ToggleButton, withTheme } from 'react-native-paper';
import CustomText from '../../components/CustomText';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { apiURL, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';


class LiquidateLoan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentType: 'transfer',
            loan_id: this.props.navigation.getParam('loan_id'),
            loan: null,
            isLoading: false,
            refreshing: false,
            hasError: null
            // returnRoute: this.props.navigation.getParam('screen'),
        }
    }
    setPaymentType = (type) => {
        // console.log(type)
        if (type === 1) {
            this.setState({ paymentType: 'transfer' })
        } else {
            this.setState({ paymentType: 'deposit' })
        }
    }
    componentDidMount = () => {
        this.loadLoanDetails(true)
    }

    _onrefresh = () => {
        this.setState({ refreshing: true })
        this.loadLoanDetails(false).then(() => {
            this.setState({ refreshing: false })
        })
    }
    loadLoanDetails = (value) => {
        const url = `${apiURL}loan/liquidate`;
        const loan_id = {
            loan_id: this.state.loan_id
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(loan_id),
        }
        this.setState({ isLoading: value })
        return new Promise((resolve, reject) => {
            requestWithToken(url, options).then(data => {
                this.setState({ isLoading: false })
                if (data.status === 'success') {
                    // console.log(data)
                    this.setState({ loan: data })
                } else {
                    alert(data.message ? data.message : 'An error has occured. Try again later')
                }
                resolve()
            }).catch(error => {
                // console.log(error);
                this.setState({ isLoading: false })
                this.setState({ hasError: 'An error has occured' })
                reject()
            })
        })
    }

    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦${newvalue}`
    }
    render() {
        const { paymentType, isLoading, loan, refreshing, hasError } = this.state;
        const { closeModal, loan_id } = this.props
        const { colors } = this.props.theme
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Loader isLoading={isLoading} />
                {hasError && <Fragment>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText style={{ marginVertical: 10, fontFamily: 'Baloo' }}>An error has occured</CustomText>
                        <Button icon="reload" mode="contained" labelStyle={{ color: 'white', textTransform: 'capitalize' }} onPress={this.loadLoanDetails}>
                            reload
                        </Button>
                    </View>
                </Fragment>}
                {loan && <Fragment>
                    <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
                        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                        <Appbar.Content
                            titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                            subtitleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                            title={`Liquidate_${loan.transaction_reference}`}
                        />
                        <Appbar.Action />
                    </Appbar.Header>
                    <ScrollView
                        refreshControl={
                            <RefreshControl onRefresh={this._onrefresh} refreshing={refreshing} />
                        }
                        showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ paddingTop: resHeight(2), width: resWidth(90), alignSelf: 'center' }}>
                            <CustomText style={{ textAlign: 'center', fontFamily: 'Baloo-med', color: colors.primary }}>
                                Loan Liquidation Details as at today {new Date(Date.now()).toDateString()}
                    </CustomText>
                            <View style={{ marginVertical: resHeight(1) }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                        <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Amount</CustomText>

                                    </View>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan_amount)}</CustomText>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                        <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Total Interest Due</CustomText>
                                        <CustomText style={{ color: "gray", fontSize: resFont(12), fontFamily: 'Baloo' }}>Interest Due as at {new Date(Date.now()).toDateString()}</CustomText>
                                    </View>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.total_interest_due)}</CustomText>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                        <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Admin Fees</CustomText>
                                        <CustomText style={{ color: "gray", fontSize: resFont(12), fontFamily: 'Baloo' }}>Insurance + Disbursement Fees</CustomText>
                                    </View>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.admin_fees)}</CustomText>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                        <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Total Paid</CustomText>
                                        <CustomText style={{ color: "gray", fontSize: resFont(12), fontFamily: 'Baloo' }}>Total Paid as at May 17, 2020</CustomText>
                                    </View>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.totalpaid)}</CustomText>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                        <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Balance</CustomText>
                                        <CustomText style={{ color: "gray", fontSize: resFont(12), fontFamily: 'Baloo' }}>(LOAN AMOUNT + TOTAL INTEREST DUE + ADMIN FEES) - TOTAL PAID</CustomText>
                                    </View>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan_balance)}</CustomText>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                        <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Liquidation Charges</CustomText>
                                        <CustomText style={{ color: "gray", fontSize: resFont(12), fontFamily: 'Baloo' }}>5% of loan balance</CustomText>
                                    </View>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.liquidation_charges)}</CustomText>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                        <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Liquidation Amount</CustomText>
                                        <CustomText style={{ color: "gray", fontSize: resFont(12), fontFamily: 'Baloo' }}>Amount to pay to clear off this loan</CustomText>
                                    </View>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.liquidation_amount)}</CustomText>
                                </View>
                            </View>
                            <Paragraph style={{ fontFamily: 'Baloo-bold', fontSize: resFont(12) }}>
                                Please note that the amount stated above is the liquidation payment due as at today {new Date(Date.now()).toDateString()} and subject to change if payment is not made within 24 hours.
                    </Paragraph>

                            <Paragraph style={{ marginTop: resHeight(2), fontFamily: 'Baloo-bold', fontSize: resFont(12) }}>Please include the unique code 'LCW1002297-02' in the Payment narration /description.
                    </Paragraph>
                        </View>
                    </ScrollView>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Button onPress={() => this.RBSheet.open()}>Show Account Details</Button>
                        <RBSheet
                            closeOnDragDown={true}
                            ref={ref => {
                                this.RBSheet = ref;
                            }}
                            height={300}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    //   justifyContent: "center",
                                    //   alignItems: "center"
                                }
                            }}
                        >
                            <View style={{ width: resWidth(90), alignSelf: 'center', justifyContent: 'center' }}>
                                <View style={{ display: 'flex', marginTop: resHeight(1), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Surface style={styles.surface}>
                                        <TouchableRipple
                                            style={[styles.paymentCard,
                                            { backgroundColor: this.state.paymentType === 'transfer' ? colors.primary : colors.surface }]}
                                            onPress={() => this.setPaymentType(1)}
                                        >
                                            <Text style={{ fontSize: resFont(14), fontFamily: 'Baloo-med', textAlign: 'center', color: paymentType === 'transfer' ? 'white' : colors.text }}>Bank Transfer</Text>
                                        </TouchableRipple>
                                    </Surface>

                                    <Surface style={styles.surface}>
                                        <TouchableRipple
                                            style={[styles.paymentCard, { backgroundColor: paymentType === 'deposit' ? colors.primary : colors.surface }]}
                                            onPress={() => this.setPaymentType(2)}
                                        >
                                            <Text style={{ fontSize: resFont(14), fontFamily: 'Baloo-med', textAlign: 'center', color: paymentType === 'deposit' ? 'white' : colors.text }}>Cash Deposit</Text>
                                        </TouchableRipple>
                                    </Surface>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Account Name</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{paymentType === 'deposit' ? 'Princeps Credit Systems' : 'Credit Wallet-Atiku Attahiru'}</CustomText>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Account No.</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{paymentType === 'deposit' ? '0102877545' : '9915335025'}</CustomText>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(.5) }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Bank</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{paymentType === 'deposit' ? 'Union Bank Of Nigeria Plc.' : 'Providus Bank'}</CustomText>
                                    </View>
                                </View>

                            </View>

                        </RBSheet>
                    </View>
                </Fragment>}
            </SafeAreaView>
        )
    }
}

export default withTheme(LiquidateLoan);

const styles = StyleSheet.create({
    surface: {
        height: resHeight(10),
        width: resWidth(30),
        //   backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        borderRadius: 10,
        //   marginHorizontal: resWidth(10)
    },
    paymentCard: {
        width: resWidth(30),
        borderRadius: 10,
        // backgroundColor: 'black', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});