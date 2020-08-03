import React from 'react';
import { View } from 'react-native';
import CustomText from './CustomText';
import { Divider } from 'react-native-paper';


const formatAsCurrency = (value) => {
    const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `₦ ${newvalue}`
}
export const FlatListRender = ({ savings }) => (
    <View style={{ padding: 10, borderWidth: 1, borderRightColor: '#ccc', borderTopColor: '#ccc', borderBottomColor: '#ccc', borderLeftWidth: 3, borderLeftColor: savings.transaction === 1 ? 'green' : savings.transaction === 9 ? 'green' : savings.transaction === 14 ? 'red' : '' , borderRadius: 5, marginVertical: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <CustomText style={{ fontFamily: 'Baloo' }}>
                {savings.date || savings.transaction_date}
            </CustomText>
            <CustomText style={{ textAlign: 'right', marginVertical: 5, fontFamily: 'Baloo-med' }}>
{savings.transaction === 1 ? '' : savings.transaction === 9 ? '': savings.transaction === 14 ? '-' : ''}{formatAsCurrency(savings.balance || savings.transaction_amount)}
        </CustomText>
        </View>
        <Divider />
        <CustomText style={{ fontFamily: 'Baloo', padding: 5}}>
            {savings.description || savings.transaction_description}
        </CustomText>
    </View>
)