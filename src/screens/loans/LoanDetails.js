import React, { Component, Fragment } from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { Appbar, Divider, Button, withTheme, Chip, Portal, Modal, Colors } from 'react-native-paper'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { resFont, resWidth, resHeight } from '../../utils/utils';
import CustomText from '../../components/CustomText';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { apiURL, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';
import LiquidateLoan from '../liquidate/LiquidateLoan';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import { StackActions } from 'react-navigation';

class LoanDetails extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loan_id: this.props.navigation.getParam('loan_id'),
            loan: null,
            isLoading: false,
            loanType: this.props.navigation.getParam('type'),
            visible: false,
            singleLoan: {},
            showLiquidation: false,
            hasError: null
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.getLoanDetails()
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    _showModal = (loan) => {
        this.setState({ singleLoan: loan }, () => {
            this.RBSheet.open()
        })
    };
    _hideModal = () => this.setState({ visible: false });

    getLoanDetails = () => {
        if (this._isMounted) {
            this.setState({ isLoading: true })
            const url = `${apiURL}loan/one`;
            const loan_id = {
                loan_id: this.state.loan_id
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(loan_id),
            }
            requestWithToken(url, options).then(data => {
                this.setState({ isLoading: false })
                if (data.status === 'success') {
                    this.setState({ loan: data })
                } else {
                    alert(data.message ? data.message : 'An error has occured. Try again later')
                }
            }).catch(error => {
                // console.log(error);
                this.setState({ isLoading: false })
                this.setState({ hasError: error && error.message ? error.message : 'An error has occured' })
            })
        }
    }
    // openLoan = () => (

    // )
    showLiquidationModal = () => {
        // console.log('showing', this.state.loan_id)
        this.setState({ showLiquidation: true })
    }

    closeLiquidationModal = () => {
        // console.log('close liquidation')
        this.setState({ showLiquidation: false })
    }
    formatAsCurrency = (value) => {
        const newvalue = parseFloat(value)
        return `₦${newvalue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    }

    goToLiquidateLoan = () => {
        const pushAction = StackActions.push({
            routeName: 'Liquidate Loan',
            params: { loan_id: this.state.loan_id },
          });
          this.props.navigation.dispatch(pushAction);
    }
    render() {
        const { colors } = this.props.theme;
        const { isLoading, loan, loanType, visible, singleLoan, loan_id, showLiquidation, hasError } = this.state;
        return (
            <CustomSafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff', }}>
                <Loader isLoading={isLoading} />
                <Appbar.Header statusBarHeight={0} style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        subtitleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Loans Details"
                    />
                    <Appbar.Action />
                </Appbar.Header>
                {hasError && <Fragment>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText style={{ marginVertical: 10, fontFamily: 'Baloo' }}>{hasError}</CustomText>
                        <Button icon="reload" mode="contained" style={{ backgroundColor: Colors.indigo400 }} labelStyle={{ color: 'white', textTransform: 'capitalize' }} onPress={this.getLoanDetails}>
                            reload
                        </Button>
                    </View>
                </Fragment>}
                <Fragment>
                    {loan && (
                        <Fragment>
                            <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                                <View style={{ width: '100%', marginVertical: 10, borderRadius: 10, overflow: 'hidden' }}>
                                   <ImageBackground source={require('../../assets/images/background.jpeg')} style={{width: '100%'}}>
                                 <View style={{padding: 10}}>
                                 <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Loan Id</CustomText>
                                        <View>
                                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan.loan_application_id}</CustomText>
                                        </View>
                                    </View>
                                    {/* <Divider /> */}
                                    {loanType === 'closed' && <Fragment>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Status</CustomText>

                                            <View>
                                                <Chip textStyle={{ color: 'green', fontSize: resFont(8) }} style={{ backgroundColor: 'rgba(50,205,50, .2)' }} disabled>Fully Paid</Chip>
                                            </View>
                                        </View>
                                        {/* <Divider /> */}
                                    </Fragment>}
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Loan Amount</CustomText>
                                        <View>
                                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan.loan_principal_amount)}</CustomText>
                                        </View>
                                    </View>
                                    {/* <Divider /> */}

                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Balance</CustomText>
                                        <View>
                                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan.balance_amount)}</CustomText>
                                        </View>
                                    </View>
                                    {/* <Divider /> */}
                                    {loanType === 'closed' && (
                                        <Fragment>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Total Paid</CustomText>
                                                <View>
                                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan.total_paid)}</CustomText>
                                                </View>
                                            </View>
                                            {/* <Divider /> */}
                                        </Fragment>
                                    )}

                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Duration</CustomText>
                                        <View>
                                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan.loan_duration} Months</CustomText>
                                        </View>
                                    </View>
                                    {/* <Divider /> */}
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Maturity Date</CustomText>
                                        <View>
                                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan.loan_override_maturity_date}</CustomText>
                                        </View>
                                    </View>
                                    {/* <Divider /> */}
                                 </View>
                                   </ImageBackground>
                                </View>
                                <View style={{ marginTop: resHeight(2) }}>
                                    <CustomText style={{ fontSize: resFont(17), textAlign: 'center', fontFamily: 'Baloo-med' }}>Repayments</CustomText>
                                </View>
                                <ScrollView contentContainerStyle={{ flexGrow: 1, width: resWidth(90), alignSelf: 'center' }}>
                                    {loan.repayment.map((item, index) => (
                                        <TouchableWithoutFeedback key={index} onPress={() => this._showModal(item)}>
                                            <Fragment>
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: resHeight(0.8) }}>
                                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{item.repayment_collected_date}</CustomText>
                                                    <View>
                                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(item.repayment_amount)}</CustomText>
                                                    </View>
                                                    <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.primary} />
                                                </View>
                                                <Divider />
                                            </Fragment>
                                        </TouchableWithoutFeedback>
                                    ))}
                                </ScrollView>
                            </View>
                            {loanType === 'open' && <View style={{ width: resWidth(90), alignSelf: 'center' }}>
                                <Button
                                    style={{ marginVertical: resHeight(2)}}
                                    contentStyle={{
                                        height: resHeight(6),
                                        width: resWidth(90)
                                    }}
                                    labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: colors.surface }}
                                    mode="contained" onPress={this.goToLiquidateLoan}>
                                    Liquidate/Pay off Loan
                        </Button>
                            </View>}
                        </Fragment>
                    )}

                </Fragment>
                <RBSheet
                    closeOnDragDown={true}
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={resHeight(26)}
                    openDuration={250}
                    customStyles={{
                        container: {
                            //   justifyContent: "center",
                            //   alignItems: "center"
                        }
                    }}
                >
                    <View style={{ backgroundColor: 'white' }}>
                        <View style={{ height: resHeight(25), width: resWidth(90), alignSelf: 'center' }}>
                            <CustomText style={{ textAlign: 'center', fontSize: 17, fontFamily: 'Baloo-bold' }}>Payment Details</CustomText>
                            <View style={{ paddingTop: resHeight(1.5) }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Principal Repayment</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(singleLoan.principal_repayment_amount)}</CustomText>
                                    </View>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Interest (7.5%)</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(singleLoan.interest_repayment_amount)}</CustomText>
                                    </View>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Repayment date</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{singleLoan.repayment_collected_date}</CustomText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <CustomSafeAreaView />
                    </View>

                </RBSheet>
            </CustomSafeAreaView>
        )
    }
}

export default withTheme(LoanDetails);