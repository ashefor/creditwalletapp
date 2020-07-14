import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import CustomText from '../../components/CustomText';
import { ScrollView } from 'react-native-gesture-handler';
import {
    MaterialCommunityIcons, MaterialIcons
} from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../../utils/utils';
import { Divider, List, Appbar, Button, Surface } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import { signOut } from '../../utils/storage';
import { color } from 'react-native-reanimated';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';

class GetStartedScreen extends Component {

    _handleSignOut = () => {

    }
    render() {
        return (
            <CustomSafeAreaView style={{flex:1,backgroundColor: '#f5fcff' }}>
                <Appbar.Header statusBarHeight={0} style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('Auth')}
                    />
                </Appbar.Header>
                <View style={styles.container}>
                    <CustomText style={{fontFamily: 'Baloo-bold', fontSize: resFont(20), textTransform: 'uppercase'}}>
                        Let's do this
                        </CustomText>
                    <View style={styles.uppercontainer}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(3) }}>
                            <Surface style={styles.surface}>
                            <MaterialIcons name="no-sim" size={30} color="#f56b2a" />
                                <CustomText style={{fontFamily: 'Baloo-med', textAlign: 'center', fontSize: resFont(15), marginTop: 20}}>No Collaterals</CustomText>
                            </Surface>
                            <Surface style={styles.surface}>
                            <MaterialCommunityIcons name="clock-fast" size={30} color="#f56b2a" />
                                <CustomText style={{fontFamily: 'Baloo-med', textAlign: 'center', fontSize: resFont(15), marginTop: 20 }}>Quick Loans</CustomText>
                            </Surface>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(3) }}>
                            <Surface style={styles.surface}>
                            <MaterialCommunityIcons name="percent" size={30} color="#f56b2a" />
                                <CustomText style={{fontFamily: 'Baloo-med', textAlign: 'center', fontSize: resFont(15),  marginTop: 20}}>Low Interate Rate</CustomText>
                            </Surface>
                            <Surface style={styles.surface}>
                            <MaterialCommunityIcons name="cellphone-lock" size={30} color="#f56b2a" />
                                <CustomText style={{fontFamily: 'Baloo-med', textAlign: 'center', fontSize: resFont(15),  marginTop: 20}}>Secure lending platform</CustomText>
                            </Surface>
                        </View>
                    </View>
                    <View style={styles.bottomcontainer}>
                        <Button mode="contained" contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                        onPress={() => this.props.navigation.navigate('New Application')}>
                            Let's Start
                        </Button>
                    </View>
                </View>
            </CustomSafeAreaView>
        )
    }
}

export default GetStartedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: resWidth(90),
        alignSelf: 'center'
    },
    uppercontainer: {
        flex: 5,
        justifyContent: 'center'
    },
    bottomcontainer: {
        // flex: 1,
        // alignSelf: 'flex-end'
        marginVertical: resHeight(5)
    },
    surface: {
        padding: 8,
        height: resHeight(23),
        width: '45%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        elevation: 4,
        backgroundColor: 'white'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: resFont(25),
        textTransform: 'uppercase'
    },
    button: {
        height: resHeight(6),
    }
})