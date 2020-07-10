import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Appbar, TextInput, Button, withTheme, ProgressBar } from 'react-native-paper';
import { Slider, Image } from 'react-native'
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode, width } from '../../../utils/utils';
import { loanApiURL, requestWithToken, request } from '../../../utils/request';
import { getUser } from '../../../utils/storage';
import Loader from '../../../components/Loader';
import { salaryBanks } from '../../../utils/salaryBanks';
import { LoanOfferContext } from '../provider/LoanOfferProvider';
import * as DocumentPicker from 'expo-document-picker';
import PickerComponent from '../../../components/PickerComponent';

const axios = require('axios').default;
const banksPlaceholder = {
    label: 'Salary Bank Name',
    value: null,
    color: '#9EA0A4',
};

class OfferStepThree extends Component {
    static contextType = LoanOfferContext;
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this.state = {
            idCardName: null,
            isUploading: false,
            uploadPercentage: 0,
        }
    }
    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        const url = `${loanApiURL}passport/upload`
        const formData = new FormData();
        formData.append('file[]', result, result.name)
        console.log(result)
        if (result && result.type === 'success') {
            this.setState({ idCardName: null, isUploading: true })
            axios({
                method: 'POST',
                url: url,
                data: formData,
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    console.log(progressEvent)
                    let percent = (Math.floor((loaded * 100) / total) / 100);
                    // console.log(percent)
                    if (percent < 100) {
                        this.setState({ uploadPercentage: percent })
                    }
                    // console.log(this.state.uploadPercentage)
                }
            }).then((data) => {
                this.setState({ isAccepting: false, isUploading: false })
                if (data.data.status === 'success') {
                    console.log(data.data);
                    this.setState({uploadPercentage: 1 , idCardName: result.name }, () => {
                        setTimeout(() => {
                            this.setState({uploadPercentage: 0 })
                        }, 100);
                    })
                    this.context.setIdCard(data.data.message)
                } else {
                    alert(data.data.message)
                }
            }).catch((error) => {
                this.setState({ isUploading: false })
                console.log(error)
            })
        }

        // console.log(result);
    }

    renderBankSelect = props => {
        const { style, value, selectBank } = props;
        return (
            <PickerComponent
                handleFocus={this.handleFocus}
                handleBlur={this.handleBlur}
                placeholder={banksPlaceholder}
                items={salaryBanks}
                onValueChange={bankcode => selectBank(bankcode)}
                value={value}
            />
        );
    };

    handleFocus = () => {
        this._textInput.current.handleFocus();
    };

    handleBlur = () => {
        setTimeout(() => {
            this._textInput.current.handleBlur()
        }, 100)
    };

    render() {
        const { colors } = this.props.theme;
        const { idCardName, isUploading, uploadPercentage } = this.state
        return (
            <LoanOfferContext.Consumer>
                {loan => <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                        <CustomText style={{ fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center' }}>
                            Please upload a copy of a valid identification document (Driver’s Licence, International Passport, National ID, Voter’s or Staff ID)
                     </CustomText>
                        <View style={{ flex: 1, marginTop: resHeight(1) }}>
                            <KeyboardAvoidingView behavior="position">
                                <View style={{ marginVertical: resHeight(2) }}>
                                    <Button mode='outlined'
                                        icon='upload'
                                        disabled={isUploading}
                                        style={{ width: resWidth(50), alignSelf: 'center' }}
                                        labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med' }}
                                        onPress={this.pickDocument}>
                                        {isUploading ? 'Uploading' : 'Select File'}
                                    </Button>
                                    {uploadPercentage > 0 && <ProgressBar style={{marginTop: resHeight(2)}} progress={uploadPercentage} color={'#f56b2a'} />}
                                    {idCardName && <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(10), textAlign: 'center', marginVertical: resHeight(1) }}>
                                        {idCardName}
                                    </CustomText>}
                                </View>
                                <CustomText style={{ fontFamily: 'Baloo', fontSize: resFont(10), textAlign: 'center', marginVertical: resHeight(2) }}>
                                    You can skip this step and send your identification document via WhatsApp to 07085698828 or email to support@creditwallet.ng
                     </CustomText>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained"
                                        disabled={isUploading}
                                        contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.goNext}>
                                        {idCardName ? 'Continue' : 'Skip'}
                                    </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                </TouchableWithoutFeedback>}
            </LoanOfferContext.Consumer>
        )
    }
}

export default withTheme(OfferStepThree)

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