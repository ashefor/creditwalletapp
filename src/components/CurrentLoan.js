import React from 'react';
import { TouchableWithoutFeedback, View, Text, } from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomText from './CustomText';
import { resFont } from '../utils/utils';

const CurrentLoan = props => {
    const { colors } = useTheme();
    const { navigation, loan } = props;
    function formatAsCurrency(value) {
        const newvalue = parseFloat(value)
        return `₦${newvalue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    }

    function redirectToRepayments() {
        navigation.navigate('Loan Details', {loan_id: loan.loan_id, type: 'open'})
    }
    return (
        <View style={{ width: '100%', backgroundColor: '#f5fcff', paddingHorizontal: 10, marginVertical: 10 }}>
            <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <MaterialCommunityIcons name="information-variant" size={24} color="black" />
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo' }}>Loan Id</CustomText>
                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan_application_id}</CustomText>
                </View>
            </View>
            <Divider />
            <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                {/* <MaterialIcons name="attach-money" size={24} color="black" /> */}
                <CustomText style={{fontSize: resFont(20), fontFamily: 'Baloo-semi-bold'}}>₦</CustomText>
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo' }}>Loan Amount</CustomText>
                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{formatAsCurrency(loan.loan_principal_amount)}</CustomText>
                </View>
            </View>
            <Divider />
            <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <MaterialIcons name="date-range" size={24} color="black" />
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo' }}>Loan Duration</CustomText>
                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan_duration} Months</CustomText>
                </View>
            </View>
            <Divider />
            <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <MaterialCommunityIcons name="percent" size={24} color="black" />
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo' }}>Interest Rate</CustomText>
                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>0.25% per day</CustomText>
                </View>
            </View>
            <Divider />
            <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <MaterialCommunityIcons name="bank-transfer-out" size={24} color="black" />
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo' }}>Monthly Repayment</CustomText>
                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{formatAsCurrency(loan.custom_field_1294)}</CustomText>
                </View>
            </View>
            <Divider />
            <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <MaterialCommunityIcons name="calendar" size={24} color="black" />
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomText style={{ fontSize: resFont(14), fontFamily: 'Baloo' }}>Loan Release Date</CustomText>
                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>{loan.loan_interest_start_date}</CustomText>
                </View>
            </View>
            <Button
                // contentStyle={{backgroundColor: colors.accent}}
                labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', fontSize: resFont(14), color: colors.surface }}
                mode="contained" onPress={redirectToRepayments}>
                View Repayments
                </Button>
        </View>
    )
}

export default CurrentLoan;