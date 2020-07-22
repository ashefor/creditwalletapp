import React, { Component, createRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from 'react-native';
import { resWidth, resHeight } from '../utils/utils';
import CustomText from './CustomText';
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
class OnboardCarousel extends Component {
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
        setInterval(() => {
            if (this._isMounted) {
                this.setState(prev => ({ selectedIndex: prev.selectedIndex === images.length - 1 ? 0 : prev.selectedIndex + 1 }),
                    () => {
                        this.scrollRef.current.scrollTo({
                            animated: true,
                            y: 0,
                            x: width * this.state.selectedIndex
                        })
                    }
                )
            }
        }, 3000);
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
    render() {
        // const {images} = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {images.map((image, index) => (
                        <View
                            key={index} style={styles.backgroundImage}>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={(image.imgUrl)}
                                    style={styles.onboardImage}
                                />
                                <View style={styles.onboardText}>
                                    <CustomText style={{ fontSize: 15, fontFamily: 'Baloo' }}>{image.text}</CustomText>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.pagination}>
                    {images.map((image, index) => (
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

export default OnboardCarousel;

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