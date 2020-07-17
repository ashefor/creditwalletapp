import React, { Component, Fragment } from 'react';
import { View, Image,  StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import {
    Feather
} from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { resWidth, resFont, resHeight } from '../../../utils/utils';
import {  Appbar, ProgressBar, Surface } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import CustomText from '../../../components/CustomText';
import { AutoLoanOfferContext } from '../provider/AutoLoanOfferProvider';
import Loader from '../../../components/Loader';
import AutoOfferStepOne from './AutoOfferStepOne';
import AutoOfferStepTwo from './AutoOfferStepTwo';
import AutoOfferStepThree from './AutoOfferStepThree';
import AutoOfferStepFour from './AutoOfferStepFour';
import AutoOfferStepFive from './AutoOfferStepFive';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';

class AutoOfferLetter extends Component {
    _isMounted = false;
   static contextType = AutoLoanOfferContext
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
    }
    _handleCancel = () => {
        this.props.navigation.navigate('Auth')
    }
    render() {
        return (
            <AutoLoanOfferContext.Consumer>
                
                {loan => <CustomSafeAreaView style={{flex: 1, backgroundColor: '#f5fcff' }}>
                <Toast
                        visible={loan.hasError}
                        position={Constants.statusBarHeight}
                        opacity={0.7}
                        backgroundColor='red'
                        shadow={false}
                        animation={false}
                        hideOnPress={true}
                    >{loan.errorMsg}</Toast>
                    <Loader isLoading={loan.isFetchingOffer || loan.isAccepting} />
                    <Loader isLoading={loan.loadingRepayment} backgroundColor="'rgba(247, 247, 247, .3)'">
                        <CustomText style={{textAlign: 'center', fontSize: resFont(15), color: 'white', marginVertical: resHeight(2)}}>Loading</CustomText>
                        </Loader>
                    {loan.hasFinishedFetching && loan.offerLetter && <Fragment>
                        {loan.applicationSuccess ?
                            <Fragment>
                                <Appbar.Header statusBarHeight={0} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    <Appbar.BackAction onPress={loan.cancel}/>
                                    <Appbar.Action />
                                </Appbar.Header>
                                <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                                    <Surface style={styles.surface}>
                                        <View style={{ marginBottom: resHeight(1) }}>
                                        <Feather style={{ width: 50, height: 50, alignSelf: 'center' }} name="check-circle" size={resFont(40)} color="#f56b2a" />
                                        </View>
                                        <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan Application submitted successfully. Kindly await a response from our team!</CustomText>
                                    </Surface>
                                </View>
                            </Fragment> :

                            <Fragment>
                                <Appbar.Header statusBarHeight={0} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    {loan.currentPage > 1 && <Appbar.BackAction onPress={loan.goBack}
                                    />}
                                    <Appbar.Action icon="close" onPress={loan.cancel} />
                                </Appbar.Header>
                                <View style={styles.container}>
                                    <CustomText style={styles.headerText}>
                                        Step {loan.currentPage}/5
                     </CustomText>
                                    <ProgressBar progress={0.2 * loan.currentPage} color={'#f56b2a'} />
                                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardDismissMode='interactive' keyboardShouldPersistTaps='always'>
                                        {loan.currentPage === 1 && <AutoOfferStepOne />}
                                        {loan.currentPage === 2 && <AutoOfferStepTwo />}
                                        {loan.currentPage === 3 && <AutoOfferStepThree />}
                                        {loan.currentPage === 4 && <AutoOfferStepFour />}
                                        {loan.currentPage === 5 && <AutoOfferStepFive />}
                                    </ScrollView>
                                </View>
                            </Fragment>}
                    </Fragment>}
                    {loan.hasFinishedFetching && !loan.offerLetter && 
                     <Fragment>
                     <Appbar.Header statusBarHeight={0} style={{ backgroundColor: '#f5fcff', elevation: 0, display: 'flex', justifyContent: 'space-between' }}>
                         
                         <Appbar.Action icon="close" onPress={loan.cancel}/>
                     </Appbar.Header>
                     <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                         <Surface style={styles.noLoan}>
                         <Feather name="info" size={50} color="skyblue" />
                             <CustomText style={{ textAlign: 'center', fontSize: resFont(14), fontFamily: 'Baloo-med' }}>Loan has expired or has already been processed.</CustomText>
                         </Surface>
                     </View>
                 </Fragment>
                    }
                </CustomSafeAreaView>}
            </AutoLoanOfferContext.Consumer>
        )
    }
}

export default AutoOfferLetter

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
        fontWeight: 'bold',
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