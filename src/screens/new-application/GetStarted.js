import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import CustomText from '../../components/CustomText';
import { ScrollView } from 'react-native-gesture-handler';
import {
    Ionicons, Entypo, FontAwesome5,
    Foundation, AntDesign, MaterialIcons
} from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../../utils/utils';
import { Divider, List, Appbar, Button, Surface } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import { signOut } from '../../utils/storage';
import { color } from 'react-native-reanimated';

class GetStartedScreen extends Component {

    _handleSignOut = () => {

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <Appbar.Header style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('Auth')}
                    />
                </Appbar.Header>
                <View style={styles.container}>
                    <CustomText style={styles.headerText}>
                        Let's do this
                        </CustomText>
                    <View style={styles.uppercontainer}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(3) }}>
                            <Surface style={styles.surface}>
                                <CustomText>1</CustomText>
                            </Surface>
                            <Surface style={styles.surface}>
                                <CustomText>1</CustomText>
                            </Surface>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: resHeight(3) }}>
                            <Surface style={styles.surface}>
                                <CustomText>1</CustomText>
                            </Surface>
                            <Surface style={styles.surface}>
                                <CustomText>1</CustomText>
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
            </SafeAreaView>
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
        fontFamily: 'Baloo-bold',
        fontWeight: 'bold',
        fontSize: resFont(25),
        textTransform: 'uppercase'
    },
    button: {
        height: resHeight(5),
    }
})