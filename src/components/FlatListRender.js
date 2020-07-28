import React from 'react';
import { View } from 'react-native';
import CustomText from './CustomText';
import { Divider } from 'react-native-paper';


const formatAsCurrency = (value) => {
    const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `₦${newvalue}`
}
export const FlatListRender = ({ savings }) => (
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginVertical: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <CustomText style={{ fontFamily: 'Baloo', color:  savings.transaction === 1 ? 'green' : savings.transaction === 9 ? 'green' : 'red'}}>
                {savings.transaction === 1 ? 'Cr' : savings.transaction === 9 ? 'Cr' : 'Dr'}
            </CustomText>
            <CustomText style={{ fontFamily: 'Baloo' }}>
                {savings.date}
            </CustomText>
        </View>
        <Divider />
        <CustomText style={{ marginVertical: 5, fontFamily: 'Baloo', padding: 10 }}>
            {savings.description}
        </CustomText>
        <Divider />
        <CustomText style={{ textAlign: 'right', marginVertical: 5, fontFamily: 'Baloo-med' }}>
            {formatAsCurrency(savings.balance)}
        </CustomText>
    </View>
)