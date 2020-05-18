import React, { Component, Fragment } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar, Divider, Button, withTheme, Chip, Portal, Modal } from 'react-native-paper'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { resFont, resWidth, resHeight } from '../../utils/utils';
import CustomText from '../../components/CustomText';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { apiURL, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';
import LiquidateLoan from '../liquidate/LiquidateLoan';

class LoanDetails extends Component {
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
        }
    }

    componentDidMount = () => { 
        this.getLoanDetails()
    }

    _showModal = (loan) => {
        this.setState({ singleLoan: loan }, () => {
            this.RBSheet.open()
        })
    };
    _hideModal = () => this.setState({ visible: false });
    getLoanDetails = () => {
        this.setState({ isLoading: true })
        console.log('new loan o')
        console.log(this.state.loan_id, this.state.loanType);
        apiURL
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
            }
        }).catch(error => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }
    // openLoan = () => (

    // )
    showLiquidationModal = () => {
        console.log('showing', this.state.loan_id)
        this.setState({showLiquidation: true})
    }

    closeLiquidationModal = () => {
        console.log('close liquidation')
        this.setState({showLiquidation: false})
    }
    formatAsCurrency = (value) => {
        const newvalue = parseFloat(value)
        return `₦${newvalue.toLocaleString()}`
    }
    render() {
        const { colors } = this.props.theme;
        const { isLoading, loan, loanType, visible, singleLoan, loan_id, showLiquidation } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
                <Loader isLoading={isLoading} />
                <Portal>
                    <Modal contentContainerStyle={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]} visible={visible}>
                        <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%' }}>
                            <View style={{ height: resHeight(25), width: resWidth(90), alignSelf: 'center' }}>
                                <View style={{ marginVertical: resHeight(1), display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <CustomText style={{ fontSize: 17, fontFamily: 'Baloo-bold' }}>Payment Details</CustomText>
                                    {/* <TouchableWithoutFeedback onPress={this._hideModal}>
                                    <CustomText style={{color: colors.primary, fontFamily: 'Baloo-med'}}>Close</CustomText>
                                </TouchableWithoutFeedback> */}
                                    <Button labelStyle={{ textTransform: 'capitalize' }} onPress={this._hideModal}>close</Button>
                                </View>
                                <View>
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
                            <SafeAreaView />
                        </View>
                    </Modal>
                    {/* <Modal contentContainerStyle={[StyleSheet.absoluteFill, { backgroundColor: '#f7f7f7' }]} visible={showLiquidation}>
                            <LiquidateLoan loan_id={loan_id} closeModal={this.closeLiquidationModal}/>
                        </Modal> */}
                </Portal>
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
                        <SafeAreaView />
                    </View>

                </RBSheet>
                <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        subtitleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Loans Details"
                    />
                    <Appbar.Action />
                </Appbar.Header>
                <Fragment>
                    {loan && (
                        <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                            <View style={{ width: '100%', backgroundColor: 'white', marginVertical: 10 }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Loan Id</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan.loan_application_id}</CustomText>
                                    </View>
                                </View>
                                <Divider />
                                {loanType === 'closed' && <Fragment>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Status</CustomText>

                                        <View>
                                            <Chip textStyle={{ color: 'green', fontSize: resFont(8) }} style={{ backgroundColor: 'rgba(50,205,50, .2)' }} disabled>Fully Paid</Chip>
                                        </View>
                                    </View>
                                    <Divider />
                                </Fragment>}
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Loan Amount</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan.loan_principal_amount)}</CustomText>
                                    </View>
                                </View>
                                <Divider />

                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Balance</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan.balance_amount)}</CustomText>
                                    </View>
                                </View>
                                <Divider />
                                {loanType === 'closed' && (
                                    <Fragment>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                            <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Total Paid</CustomText>
                                            <View>
                                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{this.formatAsCurrency(loan.loan.total_paid)}</CustomText>
                                            </View>
                                        </View>
                                        <Divider />
                                    </Fragment>
                                )}

                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Duration</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan.loan_duration} Months</CustomText>
                                    </View>
                                </View>
                                <Divider />
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Maturity Date</CustomText>
                                    <View>
                                        <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan.loan_override_maturity_date}</CustomText>
                                    </View>
                                </View>
                                <Divider />
                            </View>
                            <View style={{ marginTop: resHeight(2) }}>
                                <CustomText style={{ fontSize: resFont(17), textAlign: 'center', fontFamily: 'Baloo-med' }}>Repayments</CustomText>
                            </View>
                            <ScrollView contentContainerStyle={{ flexGrow: 1, width: resWidth(80), alignSelf: 'center' }}>
                                {loan.repayment.map((item, index) => (
                                    <TouchableWithoutFeedback key={index}>
                                        <Fragment>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{this.formatAsCurrency(item.repayment_amount)}</CustomText>
                                                <View>
                                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>{item.repayment_collected_date}</CustomText>
                                                </View>
                                                {/* <MaterialIcons name="keyboard-arrow-right" size={24} color="green" /> */}
                                            </View>
                                            <Divider />
                                        </Fragment>
                                    </TouchableWithoutFeedback>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                    {loanType === 'open' && <View style={{ width: resWidth(90), alignSelf: 'center' }}>
                        <Button
                            style={{ marginVertical: resHeight(2) }}
                            labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: colors.surface }}
                            mode="contained" onPress={() => this.props.navigation.navigate('Liquidate Loan' ,  {loan_id: loan_id})}>
                            Liquidate/Pay off Loan
                        </Button>
                    </View>}
                </Fragment>
            </SafeAreaView>
        )
    }
}

export default withTheme(LoanDetails);