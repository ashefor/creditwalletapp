import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import CustomText from '../../components/CustomText';
import { withTheme, Appbar, Divider, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import { investmentURL, requestWithToken, request, axiosToken, investorequestWithToken } from '../../utils/request';
import { getCustomerToken } from '../../utils/storage';
import Loader from '../../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from 'react-navigation';
import InvestmentDetailsCard from '../../components/InvestmentDetailsCard';
const axios = require('axios').default;

class InvestorDashboard extends Component {
    state = {
        dashboard: null,
        allSavings: null,
        isLoading: false,
        errorMsg: null,
        snackBarVisible: false
    };
    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦${newvalue}`
    }

    _handleGotoSavings = (savingsId) => {
        console.log(savingsId)
        const pushAction = StackActions.push({
            routeName: 'Savings',
            params: { savings_id: savingsId },
        });
        this.props.navigation.dispatch(pushAction);
    }

    async componentDidMount() {
        const token = await getCustomerToken()
        // axios.get(`${investmentURL}/dashboard`).then(data=> console.log(data.data))
        const options = {
            method: 'GET',
        }
        this.loadDashboard()
    }

    loadDashboard = (val) => {
        console.log('welp')
        this.setState({ isLoading: val })
        const url = `${investmentURL}dashboard`;
        const options = {
            method: 'GET',
        }
        this.setState({ isLoading: true })
        return new Promise((resolve, reject) => {
            investorequestWithToken(url, options).then(data => {
                this.setState({ isLoading: false, dashboard: data, allSavings: data.total_savings })
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
        const { dashboard, isLoading, allSavings } = this.state
        return (
            <CustomSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Loader isLoading={isLoading} />
                <View style={{ flex: 1 }}>
                    <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: 'transparent', elevation: 0 }}>
                        <Appbar.Action icon='menu'
                            onPress={() => this.props.navigation.openDrawer()}
                        />

                        <Appbar.Action
                        />
                    </Appbar.Header>
                    {dashboard && <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingVertical: 15, width: resWidth(90), alignSelf: 'center' }}>
                        <LinearGradient colors={['#d57eeb', '#fccb90']} style={styles.linearGradient}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <CustomText style={{ fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(21) }}>
                                    {this.formatAsCurrency(dashboard.total_investment)}
                                </CustomText>
                                <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: 'white', textTransform: 'uppercase' }}>
                                    Total investment
                            </CustomText>
                            </View>
                        </LinearGradient>
                        <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.linearGradient}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <CustomText style={{ fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(21) }}>
                                    {this.formatAsCurrency(dashboard.total_interest_earned)}
                                </CustomText>
                                <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: 'white', textTransform: 'uppercase' }}>
                                    Total Interest Earned
                            </CustomText>
                            </View>
                        </LinearGradient>
                        <LinearGradient colors={['#b1f4cf', '#9890e3']} style={styles.linearGradient}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <CustomText style={{ fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(21) }}>
                                    {this.formatAsCurrency(dashboard.total_interest_recievable)}
                                </CustomText>
                                <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: 'white', textTransform: 'uppercase' }}>
                                    Total Interest Receivable
                            </CustomText>
                            </View>
                        </LinearGradient>
                        <View style={{ marginTop: 20, marginBottom: 10 }}>
                            <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(17) }}>
                                Your Investment Details
                        </CustomText>
                            <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: '#ccc' }}>
                                Your deposit investment
                        </CustomText>
                        </View>
                       <View style={{width: '100%'}}>
                           <InvestmentDetailsCard savings={allSavings}/>
                       </View>
                    </ScrollView>}

                </View>
            </CustomSafeAreaView>
        )
    }
}

export default withTheme(InvestorDashboard);

const styles = StyleSheet.create({
    linearGradient: {
        padding: 15,
        height: resHeight(15),
        width: '100%',
        borderRadius: 15,
        marginVertical: 5
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