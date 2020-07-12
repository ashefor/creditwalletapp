import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme } from 'react-native-paper';
import { Slider } from 'react-native'
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../utils/utils';
import { loanApiURL, requestWithToken } from '../../../utils/request';
import { getUser } from '../../../utils/storage';
import Loader from '../../../components/Loader';
import { LoanContext } from '../provider/NewLoanProvider';
import * as DocumentPicker from 'expo-document-picker';
const myContext = React.createContext(LoanContext)
class StepOne extends Component {
    render() {
        return (
            <LoanContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginVertical: resHeight(2) }}>
                            <CustomText style={{
                                fontFamily: 'Baloo-bold', fontSize: resFont(20),
                                textTransform: 'uppercase'
                            }}>
                                How much would you like?
                     </CustomText>
                            <View style={{ marginVertical: resHeight(1) }}>
                                <TextInput
                                    mode="outlined"
                                    label='Amount'
                                    style={{ backgroundColor: 'white' }}
                                    value={loan.amount}
                                    keyboardType='number-pad'
                                    returnKeyType='done'
                                    onChangeText={amount => loan.setAmount(amount)}
                                />
                            </View>
                        </View>
                        <View style={{ marginVertical: resHeight(3) }}>
                            <CustomText style={{ fontFamily: 'Baloo-semi-bold' }}>
                                For how long?
                     </CustomText>
                            <View style={{ marginVertical: resHeight(1) }}>
                                <CustomText style={{
                                    fontSize: resFont(15),
                                    textAlign: 'center', fontFamily: 'Baloo-med'
                                }}>
                                    {loan.duration} months
                                </CustomText>
                                <Slider
                                    style={{ width: '100%', marginVertical: resHeight(3), height: 40 }}
                                    minimumValue={2}
                                    maximumValue={24}
                                    onValueChange={(duration) => loan.setDuration(duration)}
                                    onSlidingComplete={(duration) => loan.setDuration(duration)}
                                    value={loan.duration}
                                    step={1}
                                    minimumTrackTintColor="#f56b2a"
                                    maximumTrackTintColor="#f7971e"
                                />
                            </View>
                            <Button
                                loading={loan.isApplying}
                                disabled={loan.isApplying || !loan.amount}
                                onPress={loan.loanApply}
                                contentStyle={styles.button}
                                style={{ marginVertical: resHeight(2) }}
                                labelStyle={{ textTransform: 'none', fontFamily: 'Baloo-med', color: 'white' }}
                                mode="contained">
                                Apply for loan
                 </Button>
                        </View>
                    </View>

                </TouchableWithoutFeedback>}
            </LoanContext.Consumer>
        )
    }
}

export default StepOne

const styles = StyleSheet.create({
    loaninforow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: resHeight(.5)
    },
    loanofferdetails: {
        borderTopWidth: .3,
        borderColor: '#f56b2a',
        borderBottomWidth: .3,
        marginVertical: resHeight(2)
    },
    headerText: {
        fontFamily: 'Baloo-bold',
        fontWeight: 'bold',
        fontSize: resFont(17),
        // color: '#f56b2a',
        textTransform: 'uppercase'
    },
    button: {
        height: resHeight(6),
    }
})