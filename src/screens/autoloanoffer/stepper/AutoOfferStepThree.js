import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Appbar, TextInput, Button, withTheme, ProgressBar } from 'react-native-paper';
import CustomText from '../../../components/CustomText';
import Toast from 'react-native-root-toast';
import { resWidth, resHeight, resFont, getBankCode, width } from '../../../utils/utils';
import { publicURL } from '../../../utils/request';
import { AutoLoanOfferContext } from '../provider/AutoLoanOfferProvider';
import * as DocumentPicker from 'expo-document-picker';
import { Constants } from 'react-native-unimodules';

const axios = require('axios').default;

class AutoOfferStepThree extends Component {
    static contextType = AutoLoanOfferContext;
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this.state = {
            idCardName: null,
            isUploading: false,
            uploadPercentage: 0,
            hasError: false,
            errorMsg: null,
        }
    }
    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        const url = `${publicURL}passport/upload`
        const formData = new FormData();
        formData.append('file[]', result, result.name)
        // console.log(result)
        if (result && result.type === 'success') {
            this.setState({ idCardName: null, isUploading: true })
            axios({
                method: 'POST',
                url: url,
                data: formData,
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    // console.log(progressEvent)
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
                    // console.log(data.data);
                    this.setState({uploadPercentage: 1 , idCardName: result.name }, () => {
                        setTimeout(() => {
                            this.setState({uploadPercentage: 0 })
                        }, 100);
                    })
                    this.context.setIdCard(data.data.message)
                } else {
                    this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured' })
                }
            }).catch((error) => {
                this.setState({ isUploading: false })
                this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
                console.log(error)
            })
        }

        // console.log(result);
    }

    render() {
        const { colors } = this.props.theme;
        const { idCardName, isUploading, uploadPercentage, hasError, errorMsg } = this.state
        return (
            <AutoLoanOfferContext.Consumer>
                {loan => <Fragment>
                <Toast
                        visible={hasError}
                        position={Constants.statusBarHeight}
                        opacity={1}
                        backgroundColor='red'
                        shadow={false}
                        animation={false}
                        hideOnPress={true}
                    >{errorMsg}</Toast>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                      
                        <View style={{ flex: 1, marginTop: resHeight(1) }}>
                            <KeyboardAvoidingView>
                            <CustomText style={{ fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center' }}>
                            Please upload a copy of a valid identification document (Driver’s Licence, International Passport, National ID, Voter’s or Staff ID)
                     </CustomText>
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
                                        loading={isUploading}
                                        contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.goNext}>
                                        {idCardName ? 'Continue' : 'Skip'}
                                    </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>

                </Fragment>}
            </AutoLoanOfferContext.Consumer>
        )
    }
}

export default withTheme(AutoOfferStepThree)

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