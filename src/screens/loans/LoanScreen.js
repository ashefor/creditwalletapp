import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native'
import { Appbar, FAB, Button, Colors } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-navigation';
import LoanCard from '../../components/LoanCard';
import { resWidth, resFont } from '../../utils/utils';
import CurrentLoan from '../../components/CurrentLoan';
import { apiURL, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';
import CustomText from '../../components/CustomText';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import { Constants } from 'react-native-unimodules';
import CustomHeader from '../../components/CustomHeader';

const initialLayout = { width: Dimensions.get('window').width };

class LoanScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            routes: [
                { key: 'first', title: 'Open' },
                { key: 'second', title: 'Closed' },
            ],
            index: 0,
            isLoading: false,
            openLoans: [],
            closedLoans: [],
            refreshing: false,
            hasError: null
        }
    }
    componentDidMount = () => {
        this._isMounted = true;
        this.loadLoans(true);
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }
    changeIndex = index => {
        this.setState({ index })
    }
    _onrefresh = () => {
        this.setState({ refreshing: true })
        this.loadLoans(false).then(() => {
            this.setState({ refreshing: false })
        })
    }
    loadLoans = (value) => {
        if (this._isMounted) {
            this.setState({ isLoading: value })
            const url = `${apiURL}account/dashboard`;
            const options = {
                method: 'GET',
            }
            return new Promise((resolve, reject) => {
                requestWithToken(url, options).then(data => {
                    this.setState({ isLoading: false })
                    if (data.status === 'success') {
                        this.setState({ openLoans: data.open_loans })
                        this.setState({ closedLoans: data.fully_paid })
                    } else {
                        alert(data.message ? data.message : 'An error has occured. Try again later')
                    }
                    resolve()
                }).catch(error => {
                    this.setState({ isLoading: false })
                    this.setState({ hasError: error && error.message ? error.message : 'An error has occured' })
                    // reject()
                })
            })
        }
    }
    renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#f56b2a' }}
            style={{ backgroundColor: 'f5fcff' }}
            labelStyle={{ color: 'black', fontFamily: 'Baloo-extra-bold', fontSize: resFont(15), textTransform: 'capitalize' }}
        />
    );

    render() {
        const { index, routes, openLoans, closedLoans, isLoading, refreshing, hasError } = this.state
        const renderScene = ({ route }) => {
            switch (route.key) {
                case 'first':
                    return <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this._onrefresh}
                            />
                        } style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, width: resWidth(90), alignSelf: 'center', paddingBottom: 20 }}>
                        {openLoans.map((loan, index) => (
                            <CurrentLoan key={index} {...this.props} loan={loan} />
                        ))}
                    </ScrollView>
                case 'second':
                    return <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this._onrefresh}
                            />
                        }

                        style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, width: resWidth(90), alignSelf: 'center', paddingBottom: 20 }}>
                        {closedLoans.map((loan, index) => (
                            <LoanCard key={index} {...this.props} loan={loan} />
                        ))}
                    </ScrollView>
                default:
                    break;
            }
        }

        return (
            <CustomSafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <Loader isLoading={isLoading} />
                {hasError && <Fragment>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText style={{ marginVertical: 10, fontFamily: 'Baloo' }}>{hasError}</CustomText>
                        <Button icon="reload" mode="contained" style={{ backgroundColor: Colors.indigo400 }} labelStyle={{ color: 'white', textTransform: 'capitalize' }} onPress={this.loadLoans}>
                            reload
                        </Button>
                    </View>
                </Fragment>}
                {!hasError && <Fragment>
                    {/* <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                        <Appbar.Action />
                        <Appbar.Content
                            titleStyle={{ textAlign: 'center', fontSize: resFont(13), fontFamily: 'Baloo-med' }}
                            title="Loans"
                        />
                        <Appbar.Action />
                    </Appbar.Header> */}
                    <CustomHeader title='Loans' />
                    <TabView
                        renderTabBar={this.renderTabBar}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={(index) => this.changeIndex(index)}
                        initialLayout={initialLayout}
                    />
                </Fragment>}
            </CustomSafeAreaView>
        )
    }
}

export default LoanScreen;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: 'white'
    },
    fab: {
        position: 'absolute',
        margin: resFont(15),
        backgroundColor: '#f56b2a',
        right: 0,
        bottom: 0,
    },
});