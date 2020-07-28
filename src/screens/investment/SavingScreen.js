import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, StatusBar, FlatList } from 'react-native';
import CustomText from '../../components/CustomText';
import { withTheme, Appbar, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import { investmentURL, requestWithToken, request, axiosToken, investorequestWithToken } from '../../utils/request';
import { getCustomerToken } from '../../utils/storage';
import Loader from '../../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatListRender } from '../../components/FlatListRender';
const axios = require('axios').default;

class SavingScreen extends Component {
    state = {
        savings_id: this.props.navigation.getParam('savings_id'),
        savings: null,
        isLoading: false,
        errorMsg: null,
        snackBarVisible: false
    };
    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦${newvalue}`
    }

    async componentDidMount() {
        this.loadDashboard()
    }

    loadDashboard = (val) => {
        console.log('welp')
        this.setState({ isLoading: val })
        const url = `${investmentURL}${this.state.savings_id}/single_savings`;
        const options = {
            method: 'GET',
        }
        this.setState({ isLoading: true })
        return new Promise((resolve, reject) => {
            investorequestWithToken(url, options).then(data => {
                console.log(data)
                this.setState({ isLoading: false, savings: data})
                resolve(data)
            }).catch(error => {
                console.log(error);
                this.setState({ isLoading: false })
                this.setState({ hasError: error && error.message ? error.message : 'An error has occured' })
                reject(error)
            })
        })
    }
    render() {
        const { savings, isLoading, allSavings } = this.state
        return (
            <CustomSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Loader isLoading={isLoading} />
                <View style={{ flex: 1 }}>
                    <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: 'transparent', elevation: 0 }}>
                        <Appbar.BackAction icon='menu'
                            onPress={() => this.props.navigation.goBack()}
                        />

                        <Appbar.Action
                        />
                    </Appbar.Header>
                    {savings && <View style={{ flex: 1, paddingVertical: 15, width: resWidth(90), alignSelf: 'center' }}>
                        
                    <View style={styles.investmentTable}>
                            {/* <View style={{ marginBottom: 20 }}>
                                <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(17) }}>
                                    Your Investment Details
                        </CustomText>
                                <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: '#ccc' }}>
                                    Your deposit investment
                        </CustomText>
                            </View> */}

                            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 15 }} horizontal>
                                {savings.savings && (
                                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 5 }}>
                                        <View style={{ borderRightWidth: 1, borderRightColor: '#f0f0f0' }}>
                                            <CustomText style={{ fontFamily: 'Baloo-med', backgroundColor: '#f0f0f0', padding: 10, textAlign: 'center' }}>
                                                .
                                            </CustomText>
                                            <View style={{ padding: 5 }}>
                                                <TouchableOpacity onPress={()=> this._handleGotoSavings(saving.savings_id)} style={{ borderColor: '#f56b2a', padding: 5 }}>
                                                    <CustomText style={{ fontFamily: 'Baloo', color: '#f56b2a', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                        View
                                                    </CustomText>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ borderRightWidth: 1, borderRightColor: '#f0f0f0' }}>
                                            <CustomText style={{ fontFamily: 'Baloo-med', backgroundColor: '#f0f0f0', padding: 10 }}>
                                                Savings Account No.
                                            </CustomText>
                                            <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), padding: 10 }}>
                                                {savings.savings.savings_account_number}
                                            </CustomText>
                                        </View>
                                        <View style={{ borderRightWidth: 1, borderRightColor: '#f0f0f0' }}>
                                            <CustomText style={{ fontFamily: 'Baloo-med', backgroundColor: '#f0f0f0', padding: 10 }}>
                                                Savings savings_balance
                                            </CustomText>
                                            <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), padding: 10 }}>
                                                {this.formatAsCurrency(savings.savings.savings_balance)}
                                            </CustomText>
                                        </View>
                                        <View style={{ borderRightWidth: 1, borderRightColor: '#f0f0f0' }}>
                                            <CustomText style={{ fontFamily: 'Baloo-med', backgroundColor: '#f0f0f0', padding: 10 }}>
                                                Maturity Date
                                            </CustomText>
                                            <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), padding: 10 }}>
                                                {savings.savings.custom_field_1176}
                                            </CustomText>
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    
                   <View style={{flex: 1, marginTop: 15}}>
                   <FlatList
                   keyExtractor={(item, index) => index.toString()}
                   data={savings.saving_transactions}
                   renderItem={({item}) => <FlatListRender savings={item} />}
                   >
                        
                        </FlatList>
                   </View>
                    </View>}

                </View>
            </CustomSafeAreaView>
        )
    }
}

export default withTheme(SavingScreen);

const styles = StyleSheet.create({
    linearGradient: {
        padding: 15,
        height: resHeight(15),
        width: '100%',
        borderRadius: 15,
        marginVertical: 10
    },
    investmentTable: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    buttonText: {
        fontSize: resFont(14),
        // fontFamily: 'Baloo',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});