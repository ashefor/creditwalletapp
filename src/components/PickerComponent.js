import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../utils/utils';
import RNPickerSelect from 'react-native-picker-select';

const PickerComponent = (props) => {
    const { items, onValueChange, value, placeholder, iconName } = props
    return (
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={placeholder}
                items={items}
                onValueChange={onValueChange}
                style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                        top: '25%',
                        bottom: '25%',
                        right: '5%',
                    },
                }}
                value={value}
                useNativeAndroidPickerStyle={false}
                placeholderTextColor='#000'
                Icon={() => {
                    return <Entypo name={iconName ? iconName : 'chevron-down'} size={resFont(25)} color='#000' />;
                }}
            />
        </View>
    )
}

export default PickerComponent;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: resFont(16),
        fontFamily: 'Baloo',
        backgroundColor: '#fff',
        height: resHeight(7),
        marginBottom: resHeight(.5),
        paddingHorizontal: resWidth(5),
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderRadius: resFont(5),
        width: '100%',
        color: '#000',
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1
    },
    inputAndroid: {
        fontSize: resFont(16),
        fontFamily: 'Baloo',
        height: resHeight(7),
        marginBottom: resHeight(.5),
        paddingHorizontal: resWidth(5),
        shadowColor: "#000000",
        backgroundColor: 'transparent',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // elevation: 1,
        borderRadius: 5,
        width: '100%',
        color: '#000',
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1
    },
    inputAndroidContainer: {

    },
    headlessAndroidContainer: {
        backgroundColor: '#fff',
        elevation: 2,
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1,
        height: resHeight(7),
        borderRadius: 5,
        marginBottom: resHeight(1.25)
    }
});

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // elevation: 1,
        borderRadius: 5,
        width: '50%',
    }
})