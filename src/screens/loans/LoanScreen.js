import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { Appbar, FAB } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-navigation';
import LoanCard from '../../components/LoanCard';
import { resWidth, resFont } from '../../utils/utils';
import CurrentLoan from '../../components/CurrentLoan';
import { apiURL, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';

const initialLayout = { width: Dimensions.get('window').width };

class LoanScreen extends Component {
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
            refreshing: false
        }
    }
    componentDidMount = () => {
        this.loadLoans(true);
    }
    changeIndex = index => {
        this.setState({ index })
    }
    _onrefresh = () => {
        this.setState({ refreshing: true })
        this.loadLoans(false).then(() => {
            this.setState({ refreshing: false })
        })
        // this.wait(2000).then(() => this.setState({refreshing: false}))
    }
    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    loadLoans = (value) => {
        this.setState({ isLoading: value })
        const url = `${apiURL}account/dashboard`;
        const options = {
            method: 'GET',
        }
        return new Promise((resolve, reject) => {
            requestWithToken(url, options).then(data => {
                console.log(data)
                this.setState({ openLoans: data.open_loans })
                this.setState({ closedLoans: data.fully_paid })
                this.setState({ isLoading: false })
                resolve()
            }).catch(error => {
                this.setState({ isLoading: false })
                reject()
            })
        })
    }
    renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#f56b2a' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black', fontFamily: 'Baloo-extra-bold', fontSize: resFont(15), textTransform: 'capitalize' }}
        />
    );

    render() {
        const { index, routes, openLoans, closedLoans, isLoading, refreshing } = this.state
        const renderScene = ({ route }) => {
            switch (route.key) {
                case 'first':
                    return <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this._onrefresh}
                            />
                        } style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, width: resWidth(90), alignSelf: 'center' }}>
                        {openLoans.map((loan, index) => (
                            <CurrentLoan key={index} {...this.props} loan={loan} />
                        ))}
                    </ScrollView>
                case 'second':
                    return <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this._onrefresh}
                            />
                        }

                        style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, width: resWidth(90), alignSelf: 'center' }}>
                        {closedLoans.map((loan, index) => (
                            <LoanCard key={index} {...this.props} loan={loan} />
                        ))}
                    </ScrollView>
                default:
                    break;
            }
        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Loader isLoading={isLoading} />
                <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
                    
                <Appbar.Action />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Loans"
                    />
                    <Appbar.Action />
                </Appbar.Header>
                <TabView
                    renderTabBar={this.renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={(index) => this.changeIndex(index)}
                    initialLayout={initialLayout}
                />
                {/* <FAB
                        style={styles.fab}
                        // small
                        color="white"
                        icon="plus"
                        onPress={() => console.log('Pressed')}
                    /> */}
            </SafeAreaView>
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