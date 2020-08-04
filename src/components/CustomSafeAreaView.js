import React, { Fragment } from 'react';
import { StyleSheet, Platform, SafeAreaView, View } from 'react-native';
import Constants from 'expo-constants';
import { width, resHeight } from '../utils/utils';
import { StatusBar } from 'expo-status-bar';

const CustomSafeAreaView = props => {
    const { children, style } = props
    // console.log(children)
    return (
        <Fragment>
            <StatusBar style='dark'/>
            <SafeAreaView style={[{flex:1, ...style }]}>
            <View style={styles.AndroidSafeArea}>
                {children}
            </View>
        </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
});

export default CustomSafeAreaView