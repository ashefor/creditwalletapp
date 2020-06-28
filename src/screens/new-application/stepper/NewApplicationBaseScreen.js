import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import {
    Ionicons, Entypo, FontAwesome5,
    Foundation, AntDesign, MaterialIcons
} from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../../../utils/utils';
import { Divider, List, Appbar, ProgressBar, Colors } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import { signOut } from '../../../utils/storage';
import { color } from 'react-native-reanimated';
import CustomText from '../../../components/CustomText';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { LoanProvider, LoanContext } from '../provider/LoanProvider';
import StepThree from './StepThree';

class NewApplicationBaseScreen extends Component {
    render() {
        return (
            <LoanContext.Consumer>
                {loan =>  <SafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
             <Appbar.Header style={{ backgroundColor: '#f5fcff', elevation: 0 , display: 'flex', justifyContent: 'space-between'}}>
                 <Appbar.BackAction onPress={loan.goBack}
                 />
                 <Appbar.Action icon="close" onPress={() => this.props.navigation.navigate('Auth')}/>
             </Appbar.Header>
             <View style={styles.container}>
                 <CustomText style={styles.headerText}>
                Step {loan.currentPage}/5
                     </CustomText>
                     <ProgressBar progress={0.2 * loan.currentPage} color={'#f56b2a'} />
                     <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                         {loan.currentPage === 1 && <StepOne/>}
                         {loan.currentPage === 2 && <StepTwo />}
                         {loan.currentPage === 3 && <StepThree />}
                     </ScrollView>
             </View>
         </SafeAreaView>}
            </LoanContext.Consumer>
        )
    }
}

export default NewApplicationBaseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: resWidth(90),
        alignSelf: 'center'
    },
    uppercontainer: {
        flex: 5,
        justifyContent: 'center'
    },
    bottomcontainer: {
        // flex: 1,
        // alignSelf: 'flex-end'
        marginVertical: resHeight(5)
    },
    surface: {
        padding: 8,
        height: resHeight(23),
        width: '45%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        elevation: 4,
        backgroundColor: 'white'
    },
    headerText: {
        fontFamily: 'Baloo-bold',
        fontWeight: 'bold',
        fontSize: resFont(15),
        color: '#f56b2a',
        textTransform: 'uppercase'
    },
    button: {
        height: resHeight(5),
    }
})