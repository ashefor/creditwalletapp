import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { DrawerItems, DrawerNavigatorItems } from 'react-navigation-drawer';
import { resHeight, resFont, resWidth } from '../utils/utils';
import CustomText from './CustomText';
import { MaterialIcons } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { signOut } from '../utils/storage';

const { width, height } = Dimensions.get('window')
export default DrawerComponent = props => (
    <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/images/logo.png')} />
            <View style={styles.divider} />
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
                <DrawerItems {...props} />
            </ScrollView>
            <TouchableOpacity onPress={signOut}>
           <View style={{paddingHorizontal: 10}}>
           <View style={{marginBottom: 40, flexDirection: 'row', padding: 25}}>
            <MaterialIcons name="power-settings-new" size={24} color="red" style={{
            width: resWidth(10)}} />
            <CustomText style={{fontSize: resFont(16),
            marginLeft: 0,
            fontFamily: 'Baloo-med'}}>Log out</CustomText>
            </View>
           </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        paddingTop: resHeight(10),
        // width: resWidth(45), 
        // backgroundColor: 'red',
        // alignItems: 'center'
        alignSelf: 'flex-start'
    },
    image: {
        width: resWidth(40),
        resizeMode: 'contain', 
        height: resHeight(10), 
        alignSelf: 'center' 
    },
    divider: {
        height: .5,
        backgroundColor: '#f56b2a',
        marginVertical: resHeight(4)
    }
})