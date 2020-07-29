import React, { Component, createRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from 'react-native';
import { withTheme, Appbar, Divider, Button } from 'react-native-paper';
import { resWidth, resHeight, resFont } from '../utils/utils';
import CustomText from './CustomText';
import { StackActions } from 'react-navigation';
const { width } = Dimensions.get('window')

const images = [
    {
        imgUrl: require('../assets/images/apply.png'),
        text: 'Stress Free Application'
    },
    {
        imgUrl: require('../assets/images/analysis.png'),
        text: 'Quick and Fair Assessment'
    },
    {
        imgUrl: require('../assets/images/disburse.png'),
        text: 'Money Disbursed under 2 hours'
    }
]
class InvestmentDetailsCard extends Component {
    _isMounted = false;
    scrollRef = createRef();
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
    }
    // setTimer = () => {
    //     // const timer = 
    //     return timer;
    // }
    componentDidMount = () => {
        this._isMounted = true;
        // setInterval(() => {
        //     if (this._isMounted) {
        //         this.setState(prev => ({ selectedIndex: prev.selectedIndex === images.length - 1 ? 0 : prev.selectedIndex + 1 }),
        //             () => {
        //                 this.scrollRef.current.scrollTo({
        //                     animated: true,
        //                     y: 0,
        //                     x: width * this.state.selectedIndex
        //                 })
        //             }
        //         )
        //     }
        // }, 3000);
    }

    _handleGotoSavings = (savingsId) => {
        const pushAction = StackActions.push({
            routeName: 'Savings',
            params: { savings_id: savingsId },
        });
        this.props.navigation.dispatch(pushAction);
    }
    componentWillUnmount = () => {
        this._isMounted = false;
    }
    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize);
        this.setState({ selectedIndex })
    }

    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦${newvalue}`
    }


    render() {
        // const {images} = this.props;
        const { savings } = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={{width: '100%', marginBottom: 10}}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: '100%'}}
                    horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {savings.map((saving, index) => (
                        <View style={styles.investmentTable} key={index}>
                            <View style={{width: '100%'}}>
                                <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo' }}>
                                        Savings Account No.
                             </CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>
                                        {saving.savings_account_number}
                                    </CustomText>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo' }}>
                                        Savings Balance
                             </CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>
                                        {this.formatAsCurrency(saving.savings_balance)}
                                    </CustomText>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between' }}>
                                    <CustomText style={{ fontFamily: 'Baloo' }}>
                                        Maturity Date
                             </CustomText>
                                    <CustomText style={{ fontFamily: 'Baloo-med', fontSize: resFont(13) }}>
                                        {saving.custom_field_1176}
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
                            style={[styles.whitedot, { backgroundColor: index === selectedIndex ? '#d57eeb' : '#666' }]}
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
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        // marginBottom: 50,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '100%',
        elevation: 2,
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