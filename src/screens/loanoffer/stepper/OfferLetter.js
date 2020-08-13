import React, { Component, Fragment } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Platform, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import {
    Feather
} from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { resWidth, resFont, resHeight } from '../../../utils/utils';
import { Divider, List, Appbar, ProgressBar, Colors, Surface, Snackbar } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import { signOut } from '../../../utils/storage';
import { color } from 'react-native-reanimated';
import CustomText from '../../../components/CustomText';
import { LoanOfferContext } from '../provider/LoanOfferProvider';
import Loader from '../../../components/Loader';
import OfferStepOne from './OfferStepOne';
import OfferStepTwo from './OfferStepTwo';
import OfferStepThree from './OfferStepThree';
import OfferStepFour from './OfferStepFour';
import OfferStepFive from './OfferStepFive';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';
import CustomHeader from '../../../components/CustomHeader';

class OfferLetter extends Component {
    _isMounted = false;
    static contextType = LoanOfferContext;
    constructor(props) {
        super(props);
        this.state = {
            loan_id: this.props.navigation.getParam('loanid'),
            visible: false,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.context.fetchLoanOffer(this.state.loan_id)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.context.resetState()
    }
    _handleCancel = () => {
        this.props.navigation.navigate('Auth')
    }
    render() {
        return (
            <LoanOfferContext.Consumer>
                {loan => <CustomSafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                    <Loader isLoading={loan.isFetchingOffer || loan.isAccepting} />
                    {loan.hasFinishedFetching && loan.offerLetter && <Fragment>
                        {loan.applicationSuccess ?
                            <Fragment>
                                {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                <Appbar.Action icon="close" onPress={loan.cancel} />
                                    <Appbar.Action />
                                </Appbar.Header> */}
                                <CustomHeader leftIcon='close' onLeftPress={loan.cancel}/>
                                <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                                    <Surface style={styles.surface}>
                                        <View style={{ marginBottom: resHeight(1) }}>
                                        <Image
                                                style={{ width: resWidth(50), resizeMode: 'contain', height:resHeight(20), alignSelf: 'center' }}
                                                source={require('../../../assets/images/mail.png')}
                                            />
                                        </View>
                                        <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Application submitted successfully. Kindly await a response from our team!</CustomText>
                                    </Surface>
                                </View>
                            </Fragment> :

                            <Fragment>
                                {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    {loan.currentPage > 1 && <Appbar.BackAction onPress={loan.goBack}
                                    />}
                                    <Appbar.Action icon="close" onPress={loan.cancel} />
                                </Appbar.Header> */}

                                <CustomHeader leftIcon={loan.currentPage > 1 ? 'arrow-left' : 'close' } onLeftPress={loan.currentPage > 1 ? loan.goBack : loan.cancel}   onRightPress={loan.currentPage > 1 ? loan.cancel : null} rightIcon={loan.currentPage > 1 ? 'close' : undefined } />
                                <View style={styles.container}>
                                    <CustomText style={styles.headerText}>
                                        Step {loan.currentPage}/5
                     </CustomText>
                                    <ProgressBar progress={0.2 * loan.currentPage} color={'#f56b2a'} />
                                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardDismissMode='interactive' keyboardShouldPersistTaps='always'>
                                        {loan.currentPage === 1 && <OfferStepOne />}
                                        {loan.currentPage === 2 && <OfferStepTwo />}
                                        {loan.currentPage === 3 && <OfferStepThree />}
                                        {loan.currentPage === 4 && <OfferStepFour />}
                                        {loan.currentPage === 5 && <OfferStepFive />}
                                    </ScrollView>
                                </View>
                            </Fragment>}
                    </Fragment>}
                    {loan.hasFinishedFetching && !loan.offerLetter && 
                     <Fragment>
                     {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                         
                         <Appbar.Action icon="close" onPress={loan.cancel}/>
                     </Appbar.Header> */}
                     <CustomHeader leftIcon='close' onLeftPress={loan.cancel}/>
                     <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                         <Surface style={styles.noLoan}>
                         <Feather name="info" size={50} color="skyblue" />
                             <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan has expired or has already been processed.</CustomText>
                         </Surface>
                     </View>
                 </Fragment>
                    }
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
            </LoanOfferContext.Consumer>
        )
    }
}

export default OfferLetter

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
    noLoan: {
        padding: 10,
        height: resHeight(20),
        width: '85%',
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