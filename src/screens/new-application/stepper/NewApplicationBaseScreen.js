import React, { Component, Fragment } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform, Image, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import {
    Feather
} from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../../../utils/utils';
import { Divider, List, Appbar, ProgressBar, Colors, Surface , Snackbar} from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import { signOut } from '../../../utils/storage';
import { color } from 'react-native-reanimated';
import Toast from 'react-native-root-toast';
import CustomText from '../../../components/CustomText';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { NewLoanProvider, LoanContext } from '../provider/NewLoanProvider';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import Loader from '../../../components/Loader';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';
import CustomHeader from '../../../components/CustomHeader';

class NewApplicationBaseScreen extends Component {
    static contextType = LoanContext;
    componentWillUnmount = () => {
        this.context.resetState()
    }
    render() {
        return (
            <LoanContext.Consumer>
                {loan => <CustomSafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                
                    <Fragment>
                        {loan.applicationSuccess ?
                            <Fragment>
                                {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                <Appbar.Action icon="close" onPress={loan.cancel} />
                                    <Appbar.Action />
                                </Appbar.Header> */}
                                <CustomHeader leftIcon='close' onLeftPress={loan.cancel} />
                                {loan.falseautomate && <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                                    <Surface style={styles.surface}>
                                        <View style={{ marginBottom: resHeight(1) }}>
                                            <Image
                                                style={{ width: resWidth(50), resizeMode: 'contain', height:resHeight(20), alignSelf: 'center' }}
                                                source={require('../../../assets/images/mail.png')}
                                            />
                                            {/* <Feather style={{ width: 50, height: 50, alignSelf: 'center' }} name="check-circle" size={resFont(40)} color="#f56b2a" /> */}
                                        </View>
                                        <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Application submitted successfully. Kindly await a response from our team!</CustomText>
                                    </Surface>
                                </View>}
                                {loan.automate && <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                                   {loan.processing &&  <Surface style={styles.surface}>
                                        <View style={{ marginBottom: resHeight(5) }}>
                                        <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Processing... please wait</CustomText>
                                        </View>
                                       
                                    </Surface>}
                                    {!loan.processing &&  <Surface style={styles.surface}>
                                        <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>An error has occured</CustomText>
                                    </Surface>}
                                </View>}
                            </Fragment> :

                            <Fragment>
                                {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    {loan.currentPage > 1 && <Appbar.BackAction onPress={loan.goBack}
                                    />}
                                    <Appbar.Action icon="close" onPress={loan.cancel} />
                                </Appbar.Header> */}
                                <CustomHeader leftIcon={loan.currentPage > 1 ? 'arrow-left' : 'close' } onLeftPress={loan.currentPage > 1 ? loan.goBack : loan.cancel}   onRightPress={loan.currentPage > 1 ? loan.cancel : null} rightIcon={loan.currentPage > 1 ? 'close' : undefined } />
                                <Loader isLoading={loan.isLoading} />
                                <View style={styles.container}>
                                    <CustomText style={styles.headerText}>
                                        Step {loan.currentPage}/5
                     </CustomText>
                                    <ProgressBar progress={0.2 * loan.currentPage} color={'#f56b2a'} />
                                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardDismissMode='interactive' keyboardShouldPersistTaps='always'>
                                        {loan.currentPage === 1 && <StepOne />}
                                        {loan.currentPage === 2 && <StepTwo />}
                                        {loan.currentPage === 3 && <StepThree />}
                                        {loan.currentPage === 4 && <StepFour />}
                                        {loan.currentPage === 5 && <StepFive />}
                                    </ScrollView>
                                </View>
                            </Fragment>}
                    </Fragment>
                    <Snackbar
                            visible={loan.hasError}
                            onDismiss={loan._onDismissSnackBar}
                            style={{backgroundColor: '#B5446E', color: '#fff'}}
                            action={{
                                label: 'Okay',
                                onPress: () => {
                                    loan._onDismissSnackBar
                                },
                              }}
                        >
                            {loan.errorMsg}
                            </Snackbar>
                </CustomSafeAreaView>}
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
        fontSize: resFont(15),
        color: '#f56b2a',
        textTransform: 'uppercase'
    },
    button: {
        height: resHeight(5),
    },
    surface: {
        padding: 10,
        height: resHeight(50),
        // width: '45%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        elevation: 4,
        backgroundColor: 'white'
    },
})