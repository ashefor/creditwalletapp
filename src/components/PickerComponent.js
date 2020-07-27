import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../utils/utils';
import RNPickerSelect from 'react-native-picker-select';

const PickerComponent = (props) => {
    const { items, onValueChange, value, placeholder, iconName, handleFocus, handleBlur } = props
    return (
        <View style={styles.container}>
            <RNPickerSelect
            onOpen={handleFocus}
            onClose={handleBlur}
                placeholder={placeholder}
                items={items}
                onValueChange={onValueChange}
                style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                        top: '30%',
                        bottom: '30%',
                        right: '5%',
                    },
                }}
                value={value}
                useNativeAndroidPickerStyle={false}
                placeholderTextColor='#000'
                Icon={() => {
                    return <Entypo name={iconName ? iconName : 'chevron-down'} size={resFont(15)} color='#000' />;
                }}
            />
        </View>
    )
}

export default PickerComponent;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        paddingHorizontal: 14,
        fontSize: resFont(13)
        // fontSize: resFont(16),
        // fontFamily: 'Baloo',
        // backgroundColor: '#fff',
        // height: resHeight(7),
        // marginBottom: resHeight(.5),
        // paddingHorizontal: resWidth(5),
        // // shadowColor: "#000000",
        // // shadowOffset: {
        // //     width: 0,
        // //     height: 5,
        // // },
        // // shadowOpacity: 0.1,
        // // shadowRadius: 2,
        // // borderRadius: resFont(5),
        // width: '100%',
        // color: '#000',
        // borderColor: 'rgba(0,0,0,.05)',
        // borderWidth: 1
    },
    placeholder: {
        color: 'rgba(0,0,0, .54)',
      },
      chevronContainer: {
          display: 'none'
      },
      done: {
        textAlign: 'right',
        color: '#000',
        width: resWidth(95),
      },
    inputAndroid: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        paddingHorizontal: 14,
        fontSize: resFont(13)
    },
    inputAndroidContainer: {

    },
    headlessAndroidContainer: {
        // backgroundColor: '#fff',
        // elevation: 2,
        // borderColor: 'rgba(0,0,0,.05)',
        // borderWidth: 1,
        // height: resHeight(7),
        // borderRadius: 5,
        // marginBottom: resHeight(1.25)
    }
});

const styles = StyleSheet.create({
    container: {
        // shadowColor: "#000000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 1,
        // borderRadius: 5,
        // width: '50%',
        overflow: 'hidden',
        height: 50,
        // flexGrow: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
        // justifyContent: 'center',
        marginHorizontal: 2,
        // minHeight: 64,
        borderRadius: 5,
        paddingBottom: 0,
        marginTop: 3,
        // flex: 1,
        // width: '100%',
        justifyContent: "center",
        // borderWidth: .5
    }
})