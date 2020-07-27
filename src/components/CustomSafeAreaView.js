import React from 'react';
import { StyleSheet, Platform, SafeAreaView, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { width, resHeight } from '../utils/utils';

const CustomSafeAreaView = props => {
    const { children, style } = props
    // console.log(children)
    return (
        <SafeAreaView style={[{flex:1, ...style }]}>
            <View style={styles.AndroidSafeArea}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
});

export default CustomSafeAreaView