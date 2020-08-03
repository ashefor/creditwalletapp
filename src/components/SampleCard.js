import React, { Component, createRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Dimensions, Modal, FlatList } from 'react-native';
import { Button, Appbar } from 'react-native-paper'
import { resWidth, resHeight, resFont } from '../utils/utils';
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from './CustomText';
import { FlatListRender } from './FlatListRender';
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
class SampleCard extends Component {
    _isMounted = false;
    scrollRef = createRef();
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            showDetails: false,
            detailsType: 1
        }
    }

    showDetailsPage = (type) => {
        this.setState({ detailsType: type, showDetails: true })
    }

    closeDetailsPage = () => {
        this.setState({ showDetails: false })
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦ ${newvalue}`
    }
    componentWillUnmount = () => {
        this._isMounted = false;
    }

    getTotalAmount = (data) => {
        return this.formatAsCurrency(data.reduce((acc, { transaction_amount }) => acc + parseFloat(transaction_amount), 0))
    }
    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.round(contentOffset / viewSize);
        this.setState({ selectedIndex })
    }
    render() {
        const { investmentDetails } = this.props;
        const { selectedIndex, showDetails, detailsType } = this.state;
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    <LinearGradient colors={['rgba(245, 107, 42, .8)', 'rgba(245, 107, 42, 1)']} style={styles.linearGradient}>
                        <View style={{ flex: 1, margin: 10 }}>
                            <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: 'white', textTransform: 'uppercase' }}>
                                Total investment
                             </CustomText>
                            <CustomText style={{ fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(21) }}>
                                {this.formatAsCurrency(investmentDetails.total_investment)}
                            </CustomText>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Button
                                style={{ borderColor: '#fff', backgroundColor: 'white' }}
                                labelStyle={{ textTransform: 'none', fontSize: resFont(10), color: '#f56b2a' }}
                                mode='contained'
                                onPress={() => this.showDetailsPage(1)}
                            >
                                View
                            </Button>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['rgba(245, 107, 42, .8)', 'rgba(245, 107, 42, 1)']} style={styles.linearGradient}>
                        <View style={{ flex: 1, margin: 10 }}>
                            <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: 'white', textTransform: 'uppercase' }}>
                                Total Interest Earned
                             </CustomText>
                            <CustomText style={{ fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(21) }}>
                                {this.formatAsCurrency(investmentDetails.total_interest_earned)}
                            </CustomText>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Button
                                style={{ borderColor: '#fff', backgroundColor: 'white' }}
                                labelStyle={{ textTransform: 'none', fontSize: resFont(10), color: '#f56b2a' }}
                                mode='contained'
                                onPress={() => this.showDetailsPage(2)}
                            >
                                View
                            </Button>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['rgba(245, 107, 42, .8)', 'rgba(245, 107, 42, 1)']} style={styles.linearGradient}>
                        <View style={{ flex: 1, margin: 10 }}>
                            <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(13), color: 'white', textTransform: 'uppercase' }}>
                                Total Interest Receivable
                             </CustomText>
                            <CustomText style={{ fontFamily: 'Baloo-bold', color: 'white', fontSize: resFont(21) }}>
                                {this.formatAsCurrency(investmentDetails.total_interest_recievable)}
                            </CustomText>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Button
                                style={{ borderColor: '#fff', backgroundColor: 'white' }}
                                labelStyle={{ textTransform: 'none', fontSize: resFont(10), color: '#f56b2a' }}
                                mode='contained'
                                onPress={() => this.showDetailsPage(3)}
                            >
                                View
                            </Button>
                        </View>
                    </LinearGradient>
                </ScrollView>
                <View style={styles.pagination}>
                    {Array.from('123').map((number, index) => (
                        <View
                            key={index}
                            style={[styles.whitedot, { backgroundColor: index === selectedIndex ? '#f56b2a' : '#666' }]}
                        />
                    ))}
                </View>

                <Modal presentationStyle='pageSheet' visible={showDetails}>
                    <Appbar.Action icon='close' onPress={this.closeDetailsPage} />
                    <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center', paddingBottom: 50 }}>

                        <CustomText style={{ fontFamily: 'Baloo-med', color: '#f56b2a', textAlign: 'center', fontSize: resFont(15), marginBottom: 10 }}>{detailsType === 2 ? 'Total Interest Earned Details' : detailsType === 3 ? 'Total Interest Receivable Details' : 'Total Investment Details'}</CustomText>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={detailsType === 2 ? investmentDetails.all_last_interest : detailsType === 3 ? investmentDetails.all_next_interest : investmentDetails.all_deposit}
                            renderItem={({ item }) => <FlatListRender savings={item} />}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                            <CustomText style={{ fontFamily: 'Baloo' }}>
                                Total
                            </CustomText>
                            <CustomText style={{ fontFamily: 'Baloo-med', color: 'green' }}>
                                {this.getTotalAmount(detailsType === 2 ? investmentDetails.all_last_interest : detailsType === 3 ? investmentDetails.all_next_interest : investmentDetails.all_deposit)}
                            </CustomText>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default SampleCard;

const styles = StyleSheet.create({
    onboardImage: {
        height: '60%',
        width: '50%',
        // marginBottom: resHeight(5)
    },
    linearGradient: {
        padding: 15,
        height: resHeight(20),
        width: resWidth(90),
        borderRadius: 15,
        marginVertical: 5
    },
    onboardText: {
        marginTop: resHeight(5)
    },
    backgroundImage: {
        height: '100%',
        width: width
    },
    pagination: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: resHeight(10),
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