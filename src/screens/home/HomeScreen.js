import React, { Component, createRef, Fragment } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Platform, Linking, RefreshControl, Modal } from 'react-native'
import { Appbar, Button, Title, Subheading, FAB, Portal, TextInput, Dialog, Paragraph, Surface, withTheme, Snackbar } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { resWidth, resHeight, resFont } from '../../utils/utils';
import CustomText from '../../components/CustomText';
import { getUser } from '../../utils/storage';
import { apiURL, requestWithToken } from '../../utils/request';
import Loader from '../../components/Loader';
import LiquidateLoan from '../liquidate/LiquidateLoan';
import { Constants } from 'react-native-unimodules';
import NewLoanScreen from './NewLoanScreen';

const { width } = Dimensions.get('window')
class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.carouselRef = createRef(null)
        this.textInputRef = createRef(null)
        this.state = {
            selectedIndex: 0,
            open: false,
            email: '',
            isLoading: false,
            isSending: false,
            dashboard: null,
            visible: false,
            letterType: '',
            dialog: false,
            isOpenLoans: false,
            isErrorLoans: false,
            showLiquidation: false,
            errorMsg: null,
            snackBarVisible: false,
            refreshing: false,
            showNewLoanModal: false,
            hasError: null
        }
    }
    componentDidMount = () => {
        this.getLoggedInUser();
        this.loadDashboard(true)
    }
    getLoggedInUser = async () => {
        const user = await getUser();
        this.setState({
            username: JSON.parse(user).borrower_firstname
        })
        // // // console.log(JSON.parse(user).username)
    }

    _onrefresh = () => {
        this.setState({ refreshing: true })
        this.loadDashboard(false).then(() => {
            this.setState({ refreshing: false })
        })
    }
    loadDashboard = (val) => {
        this.setState({ isLoading: val })
        const url = `${apiURL}account/dashboard`;
        const options = {
            method: 'GET',
        }
        return new Promise((resolve, reject) => {
            requestWithToken(url, options).then(data => {
                // // console.log(data)
                
                this.setState({ isLoading: false })
                if( data.status === 'success') {
                    this.setState({ dashboard: data })
                }
                else {
                    alert(data.message ? data.message : 'An error has occured. Try again later')
                }
                resolve()
            }).catch(error => {
                // // console.log(error);
                this.setState({ isLoading: false })
                this.setState({ hasError: 'An error has occured' })
                reject()
            })
        })
    }

    makeCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${+2347085698828}`;
        } else {
            phoneNumber = `telprompt:${+2347085698828}`;
        }

        Linking.openURL(phoneNumber);
    };

    handleSendEmail = () => {
        this.setState({
            errorMsg: null
        })
        const url = `${apiURL}request/${this.state.letterType}`;
        const user = {
            email: this.state.email,
            loanid: this.state.dashboard.open_loans[0].loan_id
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
        }
        Keyboard.dismiss()
        this.setState({ isSending: true })
        requestWithToken(url, options).then(data => {
            this.setState({ isSending: false }, () => {
                this._hideModal()
                this.setState({ snackBarVisible: true })
            });
            // // console.log(data)
        }).catch(error => {
            this.setState({ isSending: false, errorMsg: error.message })
            // // console.log(error)
        })

    }
    setSelectedIndex = event => {
        // // // console.log(event.nativeEvent)
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        // // console.log(event.nativeEvent.contentOffset.x)
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.round(contentOffset / resWidth(75));
        // // console.log(selectedIndex)
        this.setState({ selectedIndex },
            () => {
                this.carouselRef.current.scrollTo({
                    animated: true,
                    y: 0,
                    x: resWidth(70) * this.state.selectedIndex
                })
            })
    }
    formatAsCurrency = (value) => {
        const newvalue = Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return `₦${newvalue}`
    }
    _showModal = (mode) => {
        if (mode === 2) {
            if (this.state.dashboard.open_loans_count !== 0) {
                this.setState({ dialog: true })
            } else {
                this.setState({ letterType: 'non-indebtedness' }, () => {
                    this.setState({ visible: true })
                })
            }
        } else {
            this.setState({ letterType: 'indebtedness' }, () => {
                this.setState({ visible: true })
            })
        }
    };
    _hideModal = () => this.setState({ visible: false }, () => {
        this.setState({ email: '' })
    });

    _liquidateLoan = () => {
        if (this.state.dashboard.open_loans_count === 0) {
            this.setState({ isOpenLoans: true })
        } else if (this.state.dashboard.open_loans_count > 1) {
            this.setState({ isErrorLoans: true })
        } else {
            this.props.navigation.navigate('Loan Liquidate', { loan_id: this.state.dashboard.open_loans[0].loan_id })
        }
    }

    showLiquidationModal = () => {
        // // console.log('showing', this.state.dashboard.open_loans[0].loan_id)
        this.setState({ showLiquidation: true })
    }

    closeLiquidationModal = () => {
        this.setState({ showLiquidation: false })
    }
    _hideDialog = () => this.setState({ dialog: false });
    _hideDialogOne = () => this.setState({ isOpenLoans: false });
    _hideDialogTwo = () => this.setState({ isErrorLoans: false });
    _onDismissSnackBar = () => this.setState({ snackBarVisible: false });

    _showNewLoanModal = () => {
        this.setState({ showNewLoanModal: true })
    }

    _hideNewLoanModal = () => {
        this.setState({ showNewLoanModal: false })
    }
    render() {
        const { username, isOpenLoans, isErrorLoans, isLoading, dashboard, visible, email, showNewLoanModal, hasError, isSending, letterType, dialog, errorMsg, snackBarVisible } = this.state;
        const { colors } = this.props.theme
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                <Loader isLoading={isLoading} />
                {hasError && <Fragment>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CustomText style={{marginVertical: 10, fontFamily: 'Baloo'}}>An error has occured</CustomText>
                        <Button icon="reload" mode="contained" labelStyle={{ color: 'white', textTransform: 'capitalize' }} onPress={this.loadDashboard}>
                            reload
  </Button>
                    </View>
                </Fragment>}
                {dashboard &&
                    <Fragment>
                        <Portal>
                            <Dialog
                                visible={isOpenLoans}
                                onDismiss={this._hideDialogOne}>
                                <Dialog.Title style={{ textAlign: 'center' }}>Alert</Dialog.Title>
                                <Dialog.Content style={{ alignItems: 'center', justifyContent: 'center', texAlign: 'center' }}>
                                    <Paragraph style={{ fontSize: 16, textAlign: 'center' }}>You have no open loans</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button onPress={this._hideDialogOne}>Okay</Button>
                                </Dialog.Actions>
                            </Dialog>
                            <Dialog
                                visible={isErrorLoans}
                                onDismiss={this._hideDialogTwo}>
                                <Dialog.Title style={{ textAlign: 'center' }}>Alert</Dialog.Title>
                                <Dialog.Content style={{ alignItems: 'center', justifyContent: 'center', texAlign: 'center' }}>
                                    <Paragraph style={{ fontSize: 16, textAlign: 'center' }}>There is an error with your account. Please contact admin</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button onPress={this._hideDialogTwo}>Okay</Button>
                                </Dialog.Actions>
                            </Dialog>
                            <Dialog
                                visible={dialog}
                                onDismiss={this._hideDialog}>
                                <Dialog.Title style={{ textAlign: 'center' }}>Alert</Dialog.Title>
                                <Dialog.Content style={{ alignItems: 'center', justifyContent: 'center', texAlign: 'center' }}>
                                    <Paragraph style={{ fontSize: 16, textAlign: 'center' }}>You currently have an open loan of <CustomText style={{ fontFamily: 'Baloo-semi-bold' }}>
                                        {this.formatAsCurrency(dashboard.loan_balance)}
                                    </CustomText> so you can not get letter of Non-Indebtness at this point. Kindly pay off your loan</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button onPress={this._hideDialog}>Okay</Button>
                                </Dialog.Actions>
                            </Dialog>
                            <Modal
                                animationType='slide'
                                contentContainerStyle={[StyleSheet.absoluteFill, { backgroundColor: '#f7f7f7' }]} visible={visible} onDismiss={this._hideModal}>
                                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ backgroundColor: '#f5fcff' }}>
                                    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5fcff' }}>
                                        <Appbar.Header style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                                            <Appbar.Action icon="close" onPress={this._hideModal} />
                                        </Appbar.Header>
                                        <View style={{ alignSelf: 'center', width: resWidth(90) }}>
                                            <Title style={{ fontSize: 25, fontFamily: 'Baloo-extra-bold' }}>Letter of {letterType}</Title>
                                            <CustomText>Get your letter of {letterType} and send to any preferred email address</CustomText>
                                            <View style={{ marginTop: resHeight(2) }}>
                                                {errorMsg && <CustomText style={{ textAlign: 'center', color: colors.error }}>{errorMsg}</CustomText>}
                                                <TextInput
                                                    autoCapitalize={'none'}
                                                    label='Email'
                                                    value={email}
                                                    mode={'outlined'}
                                                    ref={this.textInputRef}
                                                    onChangeText={email => this.setState({ email })}
                                                />
                                                <Button
                                                    disabled={isSending}
                                                    style={{ marginTop: resHeight(2) }}
                                                    labelStyle={{ textTransform: 'none', fontSize: 15, fontFamily: 'Baloo-med', color: 'white' }}
                                                    contentStyle={styles.loginbtn}
                                                    mode="contained"
                                                    onPress={this.handleSendEmail}>
                                                    {isSending ? 'Sending' : 'Get my letter'}
                                                </Button>
                                            </View>
                                            <SafeAreaView />
                                        </View>
                                    </SafeAreaView>
                                </TouchableWithoutFeedback>
                            </Modal>
                        </Portal>
                        <View style={{ flex: 1, width: resWidth(90), alignSelf: 'center' }}>
                            <SafeAreaView />
                            <View style={styles.header}>
                                <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo-med' }}>
                                    Welcome, {username}
                                </CustomText>
                                {/* <TouchableOpacity onPress={this.makeCall} activeOpacity={0.7} >
                                <AntDesign name="customerservice" size={24} color="black" />
                            </TouchableOpacity> */}
                            </View>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this._onrefresh}
                                    />
                                }
                                showsVerticalScrollIndicator={false}
                                style={{ backgroundColor: '#f5fcff' }} contentContainerStyle={{ flexGrow: 1 }}>

                                {/* <View style={{ flex: 1, marginVertical: 10 }}>
                                <ScrollView
                                    snapToAlignment={'center'}
                                    snapToInterval={1}
                                    scrollEnabled
                                    decelerationRate={'fast'}
                                    contentInsetAsdjustmentBehavior={'automatic'}
                                    ref={this.carouselRef}
                                    // style={{ backgroundColor: 'green' }}
                                    contentContainerStyle={{ height: '100%', justifyContent: 'space-between' }}
                                    onScrollEndDrag={this.setSelectedIndex}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    pagingEnabled>
                                    <Surface style={{ width: resWidth(75), borderRadius: 10 }}>
                                        <View style={{ padding: resFont(25), backgroundColor: '#15bcbf', borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: '100%', overflow: 'hidden' }}>
                                            <MaterialCommunityIcons color={'white'} name='google-analytics' size={40} />
                                            <CustomText style={{ fontSize: 30, color: 'white', fontFamily: 'Baloo-bold' }}>{this.formatAsCurrency(dashboard.loan_balance)}</CustomText>
                                            <CustomText style={{ fontSize: 15, color: 'white', fontFamily: 'Baloo-med', textAlign: 'center' }}>Current Loan Balance</CustomText>
                                        </View>
                                    </Surface>
                                    <Surface style={{ width: resWidth(75), marginLeft: 10, borderRadius: 10 }}>
                                        <View style={{ padding: resFont(25), backgroundColor: '#e0b94c', borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: '100%', overflow: 'hidden' }}>
                                            <MaterialCommunityIcons color={'white'} name='credit-card-plus-outline' size={40} />
                                            <CustomText style={{ fontSize: 30, color: 'white', fontFamily: 'Baloo-bold' }}>{this.formatAsCurrency(dashboard.top_up_amount)}</CustomText>
                                            <CustomText style={{ fontSize: 15, color: 'white', fontFamily: 'Baloo-med', textAlign: 'center' }}>Amount Available for Loan Top Up</CustomText>
                                        </View>
                                    </Surface>
                                    <Surface style={{ width: resWidth(75), backgroundColor: '#9b9b9b', borderRadius: 10, marginLeft: 10 }}>
                                        <View style={{ padding: resFont(25), backgroundColor: '#9b9b9b', borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: '100%', overflow: 'hidden' }}>
                                            <MaterialCommunityIcons color={'white'} name='format-list-numbered' size={40} />
                                            <CustomText style={{ fontSize: 30, color: 'white', fontFamily: 'Baloo-bold' }}>{dashboard.total_transactions}</CustomText>
                                            <CustomText style={{ fontSize: 15, color: 'white', fontFamily: 'Baloo-med', textAlign: 'center' }}>Total Number of Transactions</CustomText>
                                        </View>
                                    </Surface>
                                </ScrollView>
                            </View> */}

                                {/* <View style={{ flex: 3 }}>
                                <View style={styles.surface}>
                                    <MaterialCommunityIcons color={'#f56b2a'} name='bank-plus' size={40} />
                                    <Title style={{ fontFamily: 'Baloo-extra-bold' }}>Loan Liquidation</Title>
                                    <Subheading style={{ fontFamily: 'Baloo' }}>Get your liquidation calculation or loan payoff balance online</Subheading>
                                    <Button
                                        style={{ marginTop: resHeight(2), alignSelf: 'center', width: resWidth(50) }}
                                        labelStyle={{ textTransform: 'none', fontSize: 15, color: 'white', fontFamily: 'Baloo-med' }}
                                        mode="contained" onPress={this._liquidateLoan}>
                                        Proceed
                                </Button>
                                </View>
                                <View style={styles.surface}>
                                    <MaterialCommunityIcons color={'#f56b2a'} name='file-document' size={40} />
                                    <Title style={{ fontFamily: 'Baloo-extra-bold' }}>Indebtedness Letter</Title>
                                    <Subheading style={{ fontFamily: 'Baloo' }}>Get your letter of Indebtedness and send to any preferred email address</Subheading>
                                    <Button
                                        style={{ marginTop: resHeight(2), alignSelf: 'center', width: resWidth(50) }}
                                        labelStyle={{ textTransform: 'none', fontSize: 15, color: 'white', fontFamily: 'Baloo-med' }}
                                        mode="contained" onPress={() => this._showModal(1)}>
                                        Proceed
                                </Button>
                                </View>
                                <View style={styles.surface}>
                                    <MaterialCommunityIcons color={'#f56b2a'} name='file-document' size={40} />
                                    <Title style={{ fontFamily: 'Baloo-extra-bold' }}>Non-Indebtedness Letter</Title>
                                    <Subheading style={{ fontFamily: 'Baloo' }}>Get your letter of Non-Indebtedness and send to any preferred email address</Subheading>
                                    <Button
                                        style={{ marginTop: resHeight(2), alignSelf: 'center', width: resWidth(50) }}
                                        labelStyle={{ textTransform: 'none', fontSize: 15, color: 'white', fontFamily: 'Baloo-med' }}
                                        mode="contained" onPress={() => this._showModal(2)}>
                                        Proceed
                                </Button>
                                </View>
                            </View> */}

                                {/* <NewLoanScreen visible={showNewLoanModal} hideNewLoanModal={this._hideNewLoanModal} /> */}
                                <View style={{ marginTop: resHeight(1) }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>Current Loan Balance</CustomText>
                                    <CustomText style={{ fontSize: resFont(30), fontFamily: 'Baloo-bold' }}>{this.formatAsCurrency(dashboard.loan_balance)}</CustomText>
                                </View>
                                <View style={{ marginVertical: resHeight(3) }}>
                                    <CustomText style={{ fontSize: resFont(15), fontFamily: 'Baloo' }}>What would you like to do?</CustomText>
                                    <View style={styles.cardContainer}>
                                        <TouchableWithoutFeedback onPress={this._liquidateLoan}>
                                            <View style={[styles.loanCard, styles.card]}>
                                                <View>
                                                    <MaterialCommunityIcons color={'#fff'} name='bank-plus' size={30} />
                                                </View>
                                                <View>
                                                    <CustomText style={styles.cardText}>Liquidate Loan</CustomText>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('New Loan')}>
                                            <View style={[styles.newloanCard, styles.card]}>
                                                <View>
                                                    <SimpleLineIcons name="wallet" size={30} color="#fff" />
                                                </View>
                                                <View>
                                                    <CustomText style={styles.cardText}>Apply for a new loan</CustomText>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={styles.cardContainer}>
                                        <TouchableWithoutFeedback onPress={() => this._showModal(1)}>
                                            <View style={[styles.indebtCard, styles.card]}>
                                                <View>
                                                    <MaterialCommunityIcons color={'#fff'} name='file-document' size={30} />
                                                </View>
                                                <View>
                                                    <CustomText style={styles.cardText}>Indebtedness Letter</CustomText>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._showModal(2)}>
                                            <View style={[styles.nonidebtCard, styles.card]}>
                                                <View>
                                                    <MaterialCommunityIcons color={'#fff'} name='file-document' size={30} />
                                                </View>
                                                <View>
                                                    <CustomText style={styles.cardText}>Non-Indebtedness Letter</CustomText>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={styles.cardContainer}>
                                        <TouchableWithoutFeedback onPress={this.makeCall} >
                                            <View style={[styles.callAgent, styles.card]}>
                                                <View>
                                                    <AntDesign name="customerservice" size={30} color="white" />
                                                </View>
                                                <View>
                                                    <CustomText style={styles.cardText}>Speak to an agent</CustomText>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        {/* <FAB
                        style={[styles.fab, { bottom: snackBarVisible ? 50 : 0 }]}
                        // small
                        color="white"
                        icon="plus"
                        onPress={() => // // console.log('Pressed')}
                    /> */}
                        <Snackbar
                            visible={snackBarVisible}
                            onDismiss={this._onDismissSnackBar}
                            style={{backgroundColor: '#f56b2a',}}
                            action={{
                                label: 'Okay',
                                accessibilityLabel: 'Okay',
                                onPress: () => {
                                    // Do something
                                },
                            }}
                        >
                            Email Sent
                            </Snackbar>
                    </Fragment>}
            </SafeAreaView>
        )
    }
}

export default withTheme(HomeScreen);

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: resHeight(.5)
    },
    card: {
        borderRadius: 15,
        width: '49%',
        height: resHeight(16),
        padding: 10,
        // backgroundColor: '#f7971e',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    cardText: {
        color: '#fff',
        fontSize: resFont(13),
        fontFamily: 'Baloo-bold'
    },
    loanCard: {
        backgroundColor: '#f7971e',
    },
    newloanCard: {
        backgroundColor: '#FFD200',
    },
    indebtCard: {
        backgroundColor: '#64f38c'
    },
    nonidebtCard: {
        backgroundColor: '#F0C27B'
    },
    callAgent: {
        backgroundColor: '#3C3B3F'
    },
    header: {
        height: resHeight(5),
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight + resHeight(3) : Constants.statusBarHeight,
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .5,
        borderBottomColor: '#f56b2a'
    },
    surface: {
        padding: resFont(15),
        // height: resHeight(25),
        justifyContent: 'center',
        width: '100%',
        borderColor: 'rgba(0,0,0, .1)',
        borderWidth: 1,
        backgroundColor: 'white',
        marginVertical: resHeight(1),
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .3,
        shadowRadius: 2,
        elevation: 2,
    },
    loginbtn: {
        height: resHeight(5),
        width: resWidth(90)
    },
    fab: {
        position: 'absolute',
        margin: resFont(15),
        backgroundColor: '#f56b2a',
        right: 0,
        // bottom: 50,
    },
})