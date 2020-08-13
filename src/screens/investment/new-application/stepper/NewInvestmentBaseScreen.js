import React, { Component, Fragment } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform, Image, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import {
    Feather
} from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../../../../utils/utils';
import { Divider, List, Appbar, ProgressBar, Colors, Surface, Snackbar } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import Toast from 'react-native-root-toast';
import CustomText from '../../../../components/CustomText';
import { InvestmentContext } from '../provider/NewInvestmentProvider';
import Loader from '../../../../components/Loader';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import CustomHeader from '../../../../components/CustomHeader';

class NewInvestmentBaseScreen extends Component {
    static contextType = InvestmentContext;

    componentWillUnmount = () => {
        this.context.resetState()
    }

    render() {
        return (
            <InvestmentContext.Consumer>
                {investment => <CustomSafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                    <Fragment>
                        {investment.applicationSuccess ?
                            <Fragment>
                                {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    <Appbar.BackAction onPress={investment.cancel}/>
                                    <Appbar.Action />
                                </Appbar.Header> */}
                                <CustomHeader leftIcon='close' onLeftPress={investment.cancel} />
                                <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                                    <Surface style={styles.surface}>
                                        <View style={{ marginBottom: resHeight(1) }}>
                                            <Image
                                                style={{ width: resWidth(50), resizeMode: 'contain', height: resHeight(20), alignSelf: 'center' }}
                                                source={require('../../../../assets/images/mail.png')}
                                            />
                                            {/* <Feather style={{ width: 50, height: 50, alignSelf: 'center' }} name="check-circle" size={resFont(40)} color="#f56b2a" /> */}
                                        </View>
                                        <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Application submitted successfully. Please check your mail for more information</CustomText>
                                    </Surface>
                                </View>
                            </Fragment> :

                            <Fragment>
                                {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    {investment.currentPage > 1 && <Appbar.BackAction onPress={investment.goBack}
                                    />}
                                    <Appbar.Action icon="close" onPress={investment.cancel} />
                                </Appbar.Header> */}
                                <CustomHeader leftIcon={investment.currentPage > 1 ? 'arrow-left' : 'close' } onLeftPress={investment.currentPage > 1 ? investment.goBack : investment.cancel}   onRightPress={investment.currentPage > 1 ? investment.cancel : null} rightIcon={investment.currentPage > 1 ? 'close' : undefined } />
                                <Loader isLoading={investment.isLoading} />
                                <View style={styles.container}>
                                    <CustomText style={styles.headerText}>
                                        Step {investment.currentPage}/4
                     </CustomText>
                                    <ProgressBar progress={1/4 * investment.currentPage} color={'#f56b2a'} />
                                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardDismissMode='interactive' keyboardShouldPersistTaps='always'>
                                        {investment.currentPage === 1 && <StepOne/>}
                                        {investment.currentPage === 2 && <StepTwo />}
                                        {investment.currentPage === 3 && <StepThree />}
                                        {investment.currentPage === 4 && <StepFour/>}
                                        {/* {investment.currentPage === 4 && <StepFour />}
                                        {investment.currentPage === 5 && <StepFive />} */}
                                    </ScrollView>
                                </View>
                            </Fragment>}
                    </Fragment>
                    <Snackbar
                            visible={investment.hasError}
                            onDismiss={investment._onDismissSnackBar}
                            style={{backgroundColor: '#B5446E', color: '#fff'}}
                            action={{
                                label: 'Okay',
                                onPress: () => {
                                    investment._onDismissSnackBar
                                },
                              }}
                        >
                            {investment.errorMsg}
                            </Snackbar>
                </CustomSafeAreaView>}
            </InvestmentContext.Consumer>
        )
    }
}

export default NewInvestmentBaseScreen

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