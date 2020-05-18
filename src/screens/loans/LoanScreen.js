import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
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
            closedLoans: []
        }
    }
componentDidMount =() => {
    this.loadLoans();
}
    changeIndex = index => {
        this.setState({ index })
    }

    loadLoans = () => {
        this.setState({ isLoading: true })
        const url = `${apiURL}account/dashboard`;
        const options = {
            method: 'GET',
        }
        requestWithToken(url, options).then(data => {
            console.log(data)
            this.setState({ openLoans: data.open_loans })
            this.setState({ closedLoans: data.fully_paid })
            this.setState({ isLoading: false })
        }).catch(error => {
            this.setState({ isLoading: false })
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
        const { index, routes, openLoans, closedLoans, isLoading } = this.state
        const renderScene = SceneMap({
            first: () => (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, width: resWidth(90), alignSelf: 'center' }}>
                        {openLoans.map((loan, index) => (
                            <CurrentLoan key={index} {...this.props} loan={loan}/>
                        ))}
                    </ScrollView>
                </View>
            ),
            second: () => (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, width: resWidth(90), alignSelf: 'center' }}>
                        {closedLoans.map((loan,index) => (
                            <LoanCard key={index} {...this.props} loan={loan}/>
                        ))}
                    </ScrollView>
                </View>
            ),
        });

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Loader isLoading={isLoading}/>
                <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
                    {/* <Appbar.BackAction onPress={()=>this.props.navigation.navigate('Home')}/> */}
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        subtitleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
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
                  <FAB
                        style={styles.fab}
                        // small
                        color="white"
                        icon="plus"
                        onPress={() => console.log('Pressed')}
                    />
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