import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme } from 'react-native-paper';
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode } from '../../../utils/utils';
import { LoanOfferContext } from '../provider/LoanOfferProvider';

const banksPlaceholder = {
    label: 'Salary Bank Name',
    value: null,
    color: '#9EA0A4',
};

class OfferStepFive extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { colors } = this.props.theme
        return (
            <LoanOfferContext.Consumer>
                {loan => <Fragment>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                       
                        <View style={{ flex: 1, marginTop: resHeight(1) }}>
                            <KeyboardAvoidingView>
                            <CustomText style={{ fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center' }}>
                        Please use the code that was sent to your email or phone number to authorize the transaction
                     </CustomText>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput
                                        mode="outlined"
                                        label='Email'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.offerLetter.email}
                                        disabled={true}
                                    />
                                </View>
                                <View style={{ marginVertical: resHeight(1) }}>
                                    <TextInput
                                        mode="outlined"
                                        label='Code'
                                        style={{ backgroundColor: 'white', fontSize: resFont(13) }}
                                        value={loan.code}
                                        keyboardType='number-pad'
                                        returnKeyType='done'
                                        onChangeText={code => loan.setCode(code)}
                                    />
                                </View>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained"
                                        disabled={!loan.code || loan.isAccepting}
                                        loading={loan.isAccepting}
                                        contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.complete}>
                                        Complete
                        </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                </Fragment>}
            </LoanOfferContext.Consumer>
        )
    }
}

export default withTheme(OfferStepFive)

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
    bottomcontainer: {
        marginVertical: resHeight(5)
    },
    button: {
        height: resHeight(6),
    }
})