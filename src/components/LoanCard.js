import React from 'react';
import { TouchableWithoutFeedback, View, Text, } from 'react-native';
import { Button, Badge, Chip, useTheme } from 'react-native-paper'
import CustomText from './CustomText';
import { resFont } from '../utils/utils';

const LoanCard = props => {
    const { colors } = useTheme();
    const { loan, navigation } = props;
    // console.log(loan)

    function formatAsCurrency(value) {
        const newvalue = parseFloat(value)
        return `₦${newvalue.toLocaleString()}`
    }
    function redirectToRepayments() {
        navigation.navigate('Loan Details', { loan_id: loan.loan_id, type: 'closed' })
    }
    return (
        <View style={{ width: '100%', backgroundColor: 'white', borderWidth: .4, borderColor: 'rgba(0,0,0,0.4)', borderRadius: 10, padding: 10, marginVertical: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <CustomText style={{ fontSize: resFont(18), fontWeight: 'bold', fontFamily: 'Baloo-med' }}>{formatAsCurrency(loan.loan_principal_amount)}</CustomText>
                <View>
                    <Chip textStyle={{ color: 'green', fontSize: resFont(8) }} style={{ backgroundColor: 'rgba(50,205,50, .2)' }} disabled>Fully Paid</Chip>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(12) }}>{loan.loan_released_date}</CustomText>
                <Button
                    // contentStyle={{backgroundColor: colors.accent}}
                    labelStyle={{ textTransform: 'none', fontSize: resFont(10), color: colors.surface }}
                    mode="contained" onPress={redirectToRepayments}>
                    Details
                </Button>
            </View>
        </View>
    )
}

export default LoanCard;