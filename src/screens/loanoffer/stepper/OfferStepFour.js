import React, { Component, Fragment, createRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Modal, KeyboardAvoidingView } from 'react-native';
import { Appbar, TextInput, Button, withTheme, ProgressBar, Snackbar } from 'react-native-paper';
import CustomText from '../../../components/CustomText';
import { resWidth, resHeight, resFont, getBankCode, width } from '../../../utils/utils';
import { publicURL } from '../../../utils/request';
import Toast from 'react-native-root-toast';
import { LoanOfferContext } from '../provider/LoanOfferProvider';
import * as DocumentPicker from 'expo-document-picker';
import { Constants } from 'react-native-unimodules';
const axios = require('axios').default;
const banksPlaceholder = {
    label: 'Salary Bank Name',
    value: null,
    color: '#9EA0A4',
};

class OfferStepFour extends Component {
    static contextType = LoanOfferContext
    constructor(props) {
        super(props)
        this._textInput = createRef()
        this.state = {
            passportName: null,
            isUploading: false,
            uploadPercentage: 0,
            hasError: false,
            errorMsg: null,
        }
    }

    _onDismissSnackBar = () => this.setState({ hasError: false });

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        const url = `${publicURL}passport/upload`
        const formData = new FormData();
        formData.append('file[]', result, result.name)
        // alert(result.uri)
        if(result && result.type === 'success') {
            this.setState({passportName: null, isUploading: true})
            axios({
                method: 'POST',
                url: url,
                data: formData, 
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = (Math.floor((loaded * 100) / total) / 100);
                    if (percent < 100) {
                        this.setState({ uploadPercentage: percent })
                    }
                }
            }).then((data) => {
               this.setState({ isAccepting: false, isUploading : false })
               if (data.data.status === 'success') {
                   this.setState({uploadPercentage: 1 , passportName: result.name}, () => {
                    setTimeout(() => {
                        this.setState({uploadPercentage: 0 })
                    }, 100);
                })
                   this.context.setPassport(data.data.message)
               } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured' })
            }
           }).catch((error) => {
            this.setState({isUploading: false})
            this.setState({ hasError: true, errorMsg: error.message ? error.message: 'Error connecting to server. Please try again' })
           })
        }
    }

    render() {
        const { colors } = this.props.theme;
        const {passportName, isUploading, uploadPercentage, hasError, errorMsg} = this.state
        return (
            <LoanOfferContext.Consumer>
                {loan => <Fragment>
                    <View style={{ flex: 1, marginVertical: resHeight(2) }}>
                      
                        <View style={{ flex: 1, marginTop: resHeight(1) }}>
                            <KeyboardAvoidingView>
                            <CustomText style={{fontFamily: 'Baloo-med', color: '#f56b2a', fontSize: resFont(13), textAlign: 'center'}}>
                        Please select a copy of your passport photograph and upload
                     </CustomText>
                                <View style={{ marginVertical: resHeight(2) }}>
                                <Button mode='outlined' 
                                icon='upload'
                                style={{width: resWidth(50), alignSelf: 'center'}}
                                     labelStyle={{ textTransform: 'none', fontSize: resFont(13), fontFamily: 'Baloo-med' }}
                                        onPress={this.pickDocument}>
                                        {isUploading ? 'Uploading' : 'Select File'}
                        </Button>
                        {uploadPercentage > 0 && <ProgressBar style={{marginTop: resHeight(2)}} progress={uploadPercentage} color={'#f56b2a'} />}
                        {passportName && <CustomText style={{fontFamily: 'Baloo', fontSize: resFont(12), textAlign: 'center', marginVertical: resHeight(1)}}>
                            {passportName}
                        </CustomText>}
                                </View>
                                <CustomText style={{fontFamily: 'Baloo', fontSize: resFont(12), textAlign: 'center', marginVertical: resHeight(2)}}>
                                You can skip this step and send your identification document via WhatsApp to 07085698828 or email to support@creditwallet.ng
                     </CustomText>
                                <View style={styles.bottomcontainer}>
                                    <Button mode="contained" 
                                    disabled={isUploading}
                                    loading={isUploading}
                                    contentStyle={styles.button} labelStyle={{ textTransform: 'none', fontSize: resFont(14), fontFamily: 'Baloo-med', color: 'white' }}
                                        onPress={loan.goNext}>
                                         {passportName ? 'Continue' : 'Skip'}
                        </Button>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>
                    <Snackbar
                            visible={hasError}
                            onDismiss={this._onDismissSnackBar}
                            style={{backgroundColor: 'maroon', color: '#fff'}}
                        >
                            {errorMsg}
                            </Snackbar>
                </Fragment>}
            </LoanOfferContext.Consumer>
        )
    }
}

export default withTheme(OfferStepFour)

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