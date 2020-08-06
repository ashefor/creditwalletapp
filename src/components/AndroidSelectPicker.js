import React, { useState, Fragment, useEffect } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Modal, Portal } from 'react-native-paper';
import CustomText from './CustomText';
import { resFont } from '../utils/utils';

const AndroidSelectPicker = (props) => {
    const { data, onValueChange, value } = props
    const [visible, setVisible] = useState(false);
    const [pickerValue, setPickerValue] = useState('');

    useEffect(()=> {
        if (value) {
            const selectValue = data.find(val => val.value === value).label
            setPickerValue(selectValue)
        } else {
            setPickerValue('')
        }
    }, [])
    
    const showPicker = () => {
        setVisible(true);
        Keyboard.dismiss()
    }

    const hidePicker = () => {
        setVisible(false)
    }

    const onValueSelect = (value) => {
        onValueChange(value)
        const selectValueLabel = data.find(val => val.value === value).label
            setPickerValue(selectValueLabel)
        hidePicker();
    }
    return (
        <Fragment>
            <TouchableWithoutFeedback style={{ height: '100%' }} onPress={showPicker}>
                <View style={{ backgroundColor: 'transparent', flexDirection:'row', height: 55, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, flexGrow: 1 }}>
                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), textTransform: 'capitalize', color: value ? '#000' : 'rgba(0,0,0, .54)' }}>{pickerValue}</CustomText>
                    <Entypo name="chevron-down" size={resFont(15)} color='#000' />
                </View>
            </TouchableWithoutFeedback>
            <Portal>
                <Modal visible={visible} contentContainerStyle={{ paddingVertical: 45, paddingHorizontal: 25, width: '100%' }} onDismiss={hidePicker}>
                    <View style={{ backgroundColor: '#fff', padding: 10 }}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ paddingVertical: 15, paddingHorizontal: 5 }} onPress={() => onValueSelect(item.value)}>
                                    <CustomText style={{ fontFamily: 'Baloo', color: value === item.value? '#f56b2a' : '#000' }}>{item.label}</CustomText>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Modal>
            </Portal>
        </Fragment>
    )
}

export default AndroidSelectPicker;