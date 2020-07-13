import React from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { width } from '../utils/utils';

const CustomSafeAreaView = props => {
const {children, style} = props
console.log(children)
  return (
    <SafeAreaView style={[styles.AndroidSafeArea, {...style}]} {...props} >
    {children}
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
      flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight: 0,
  }
});

export default CustomSafeAreaView