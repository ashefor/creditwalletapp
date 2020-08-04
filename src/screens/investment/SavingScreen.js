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
        return `₦ ${newvalue}`
    }

    async componentDidMount() {
        this.loadDashboard()
    }

    loadDashboard = (val) => {
        this.setState({ isLoading: val })
        const url = `${investmentURL}${this.state.savings_id}/single_savings`;
        const options = {
            method: 'GET',
        }
        this.setState({ isLoading: true })
        return new Promise((resolve, reject) => {
            investorequestWithToken(url, options).then(data => {
                console.log(data)
                this.setState({ isLoading: false, savings: data })
                // resolve(data)
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
                        <Appbar.Content
                            titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                            title="Investment Details"
                        />

                        <Appbar.Action
                        />
                    </Appbar.Header>
                    {savings && <View style={{ flex: 1 }}>
                        <View style={{ marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 2, backgroundColor: 'gray', paddingVertical: 10 }}>
                            <View style={styles.investmentTable}>
                                <View style={{ width: '100%' }}>
                                    <CustomText style={{ fontFamily: 'Baloo', color: 'white' }}>
                                        Savings Account No:
                             </CustomText>
                                    <CustomText style={{ textTransform: 'uppercase', fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(13) }}>
                                        {savings.savings.savings_account_number}
                                    </CustomText>
                                    <Divider style={{ backgroundColor: 'white' }} />
                                    <CustomText style={{ fontFamily: 'Baloo', color: 'white' }}>
                                        Savings Balance:
                             </CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(20) }}>
                                        {this.formatAsCurrency(savings.savings.savings_balance)}
                                    </CustomText>
                                    <Divider style={{ backgroundColor: 'white' }} />
                                    <View>
                                        <CustomText style={{ fontFamily: 'Baloo', color: 'white' }}>
                                            To mature on {new Date(savings.savings.custom_field_1176).toDateString()}
                                        </CustomText>
                                    </View>
                                </View>

                            </View>

                        </View>
                        <View style={{ flex: 1, paddingBottom: 15, width: resWidth(90), alignSelf: 'center', marginTop: 15 }}>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={savings.saving_transactions}
                                renderItem={({ item }) => <FlatListRender savings={item} />}
                            />

                            
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
        backgroundColor: 'transparent',
        // padding: 10,
        width: resWidth(90),
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: resFont(14),
        // fontFamily: 'Baloo',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});