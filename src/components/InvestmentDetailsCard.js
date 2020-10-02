import React, { Component, createRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from 'react-native';
import { withTheme, Appbar, Divider, Button } from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../utils/utils';
import CustomText from './CustomText';
import { StackActions } from 'react-navigation';
import navigationservice from '../utils/navigationservice';
const { width } = Dimensions.get('window')
class InvestmentDetailsCard extends Component {
    _isMounted = false;
    scrollRef = createRef();
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            newSavings: [],
        }
    }
    // setTimer = () => {
    //     // const timer = 
    //     return timer;
    // }
    componentDidMount = () => {
        this._isMounted = true;
    }

    _handleGotoSavings = (savingsId) => {
        const pushAction = StackActions.push({
            routeName: 'Savings',
            params: { savings_id: savingsId },
        });
        this.props.navigation.navigate(pushAction);
    }
    componentWillUnmount = () => {
        this._isMounted = false;
    }
    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.round(contentOffset / viewSize);
        this.setState({ selectedIndex })
    }

    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦ ${newvalue}`
    }


    render() {
        // const {images} = this.props;
        const { savings } = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={{ width: '100%', marginBottom: 10, }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {savings.map((saving, index) => (
                        <View style={styles.investmentTable} key={index}>
                            <View style={{
                                width: '100%', shadowColor: "#000",
                                shadowOffset: {
                                    x: 0,
                                    y: 0,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 2, elevation: 2, backgroundColor: '#fff', borderRadius: 10, padding: 10
                            }}>
                                <View style={{ padding: 5 }}>
                                    <View style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#ccc' }}>
                                        <CustomText style={{ color: '#f56b2a', fontFamily: 'Baloo-med' }}>{index + 1}</CustomText>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>
                                        Savings Account No.
                             </CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(14) }}>
                                        {saving.savings_account_number}
                                    </CustomText>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>
                                        Savings Balance
                             </CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(14) }}>
                                        {this.formatAsCurrency(saving.savings_balance)}
                                    </CustomText>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13) }}>
                                        Maturity Date
                             </CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(14) }}>
                                    {saving.maturity_date}
                                    </CustomText>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Button
                                        labelStyle={{ textTransform: 'none', fontSize: resFont(10), color: '#f56b2a' }}
                                        mode='outlined' onPress={() => this._handleGotoSavings(saving.savings_id)}>
                                        View
                            </Button>
                                </View>
                            </View>

                        </View>
                    ))}
                </ScrollView>
                <View style={styles.pagination}>
                    {savings.map((saving, index) => (
                        <View
                            key={index}
                            style={[styles.whitedot, { backgroundColor: index === selectedIndex ? '#f56b2a' : '#666' }]}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

export default InvestmentDetailsCard;

const styles = StyleSheet.create({
    onboardImage: {
        height: '60%',
        width: '50%',
        // marginBottom: resHeight(5)
    },
    onboardText: {
        marginTop: resHeight(5)
    },
    backgroundImage: {
        height: '100%',
        width: width
    },
    investmentTable: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 2,
        width: resWidth(90),
    },
    pagination: {
        width: '100%',
        // position: 'absolute',
        bottom: 0,
        // height: resHeight(10),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whitedot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: '#666'
    }
})