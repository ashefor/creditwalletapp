

import React, { Component } from 'react';
import { requestWithToken, publicURL, request, axiosPost, apiURL } from '../../../../utils/request';
import navigationservice from '../../../../utils/navigationservice';
import { states } from '../../../../utils/states';
const axios = require('axios').default;
const InvestmentContext = React.createContext();

class NewInvestmentProvider extends Component {
    constructor(props) {
        super(props);
        this.initialstate = {
            currentPage:1,
            amount: '',
            isApplying: false,
            isLoading: false,
            applicationSuccess: false,
            showDatePicker: false,
            isValidating: false,
            automate: false,
            falseautomate: false,
            processing: false,
            hasError: false,
            loanOffer: null,
            firstname: null,
            lastname: null,
            errorMsg: null,
            telephone: null,
            referralcode: null,
            tax_id: null,
            email: null,
            city: null,
            address: null,
            place_of_work: null,
            ippisnumber: null,
            selectedState: null,
            salary_bank_name: null,
            salary_bank_account: null,
            date: new Date(),
            start_date: null,
            category: null,
            title: null,
            duration: null,
            gender: null,
            interest: null,
            decimalSeparator: '.',
            investmentDetails: null,
            commaSeparator: ',',
            investorDataIncomplete: {},
        }
        this.state = this.initialstate
    }

    unFormat(val) {
        if (!val) {
          return '';
        }
        val = val.replace(/^0+/, '');
        if (val.includes(',')) {
          return val.replace(/,/g, '');
        } else {
          return val.replace(/\./g, '');
        }
    }

    formatNum(valString) {
        const {commaSeparator, decimalSeparator} = this.state
        if (!valString) {
            return '';
          }
          const val = valString.toString();
          const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
          return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, commaSeparator) + (!parts[1] ? '' : decimalSeparator + parts[1]);
    }
    setAmount = amount => {
        this.setState({amount: this.formatNum(amount)})
    }

    setDuration = duration => {
        this.setState({duration})
    }
    setFirstName = firstname => {
        this.setState({firstname})
    }

    setGender = gender => {
        this.setState({gender})
    }
    setLastName = lastname => {
        this.setState({lastname})
    }

    setCategory = category => {
        this.setState({category})
    }

    setTitle = title => {
        this.setState({title})
    }
    setDuration = duration => {
        this.setState({duration})
    }

    setEmail = email => {
        this.setState({email})
    }

    setPhone = phone => {
        this.setState({telephone: phone})
    }

    setAddress = address => {
        this.setState({address})
    }

    setCity = city => {
        this.setState({city})
    }

    setReferral = code => {
        this.setState({referralcode: code})
    }

    setTaxId = taxid => {
        this.setState({tax_id: taxid})
    }
    setSelectedState = selectedState => {
        this.setState({selectedState})
    }
    setDate = (event, selectedDate) => {
        // console.log(selectedDate)
        const currentDate = selectedDate || this.state.date;
        // console.log(currentDate)
        this.setState({date: currentDate})
    }

    setBankCode = bankcode => {
        this.setState({salary_bank_name: bankcode})
    }

    _onDismissSnackBar = () => {
        this.setState({ hasError: false })
    };
    setBankAccount = account=> {
        this.setState({salary_bank_account: account})
    }

    setPlaceOfWork = workplace => {
        this.setState({place_of_work: workplace})
    }


    setIppisNumber = number => {
        this.setState({ippisnumber: number})
    }
    confirmDatePicker = () => {
        this.setState({start_date: this.state.date})
    }
    _handleGoBack = () => {
        this.setState(prevState => {
            if(prevState.currentPage === 1) {
                return;
            } else {
                return {
                    currentPage: prevState.currentPage - 1 
                }
            }
        })
    }

    _handleGoNext = () => {
        this.setState(prevState => {
            if(prevState.currentPage === 3) {
                return;
            } else {
                return {
                    currentPage: prevState.currentPage + 1 
                }
            }
        })
    }

    validateAccountDetails = () => {
        const url = `${publicURL}verify/account`;
        const account = {
            bankcode: this.state.salary_bank_name,
            accountnumber: this.state.salary_bank_account,
            tax_id: this.state.tax_id ? this.state.tax_id : ''
        }
        console.log(account)
        this.setState({ isValidating: true, isLoading: true })
         axios({
             method: 'POST',
             url: url,
             data: account
         }).then((data) => {
             this.setState({isLoading: false})
             console.log(data.data)
            // this.setState({ isLoading: false })
            if (data.data.status === 'success') {
                // console.log(data);
                this._handleCompleteApplication();
            } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured' })
            }
        }).catch((error) => {
            this.setState({ isLoading: false })
            this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
            console.log(error)
        })
    }
    _handleCancelApplication = () => {
        this.setState(this.initialstate, ()=> navigationservice.navigate('Auth'))
    }
    setShowDatePicker = () => {
        return this.setState({showDatePicker: true})
    }

    closeDatePicker = () => {
        this.setState({showDatePicker: false})
    }
    dateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || null;
        this.setState({start_date: currentDate}, this.setState({showDatePicker: false}))
      };
    
    _handleLoanApply = () => {
        const url = `${publicURL}calculate-repayment`;
        const loan = {
            amount: this.unFormat(this.state.amount),
            tenor: this.state.duration
        }
        // console.log(loan)
        const options = {
            method: 'POST',
            data: loan,
            url: url
        }
        this.setState({ isApplying: true })
         axios({
             method: 'POST',
             url: url,
             data: loan
         }).then((data) => {
            //  console.log(data)
            this.setState({ isApplying: false })
            if (data.data.status === 'success') {
                // console.log(data);
                this.setState({ loanOffer: data.data, currentPage: 2 })
            } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured. Try again later' })
            }
        }).catch((error) => {
            this.setState({ isApplying: false })
            this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
            // console.log(error)
        })
    }


    _handleCompleteApplication = async () => {
        const url = `${publicURL}/investment/account/start/initiate`;
        const {amount, duration, gender, firstname, lastname, title, start_date, email, telephone, salary_bank_name, salary_bank_account, referralcode, interest, tax_id} = this.state;
            // console.log(userObj);
            const investor = {
                firstname: firstname,
                lastname: lastname,
                duration: duration,
                title: title,
                gender: gender,
                email: email,
                telephone: telephone,
                accountnumber: salary_bank_account,
                bankcode: salary_bank_name,
                amount: this.unFormat(amount),
                startdate: start_date.toDateString(),
                interestrate: interest,
                code: referralcode ? referralcode : '',
                tax_id: tax_id ? tax_id : ''
            }
            // console.log(investor)
            this.setState({ isLoading: true })
            axios({
                method: 'POST',
                url: url,
                data: investor
            }).then((data) => {
                console.log(data.data)
                if (data.data.status === 'success') {
                    const investorDataIncomplete = data.data;
                    investorDataIncomplete .id = data.initiate_id
                   this.setState({investorDataIncomplete})
                   this.processReservedAcct(data.data)
                } else {
                    this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured. Try again later' })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ applicationSuccess: false })
                this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
                // console.log(`this is the error -> ${error}`)
            })
    }

    processReservedAcct = (data) => {
        const url = `${publicURL}/investment/account/payment/create`;
        if(!data.account_reserved) {
            const param = {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname
            }
            axios({
                method: 'POST',
                url: url,
                data: param
            }).then((data) => {
                console.log(data.data)
                this.setState({isLoading: false})
                if (data.data.status === 'success') {
                    console.log(this.state.investorDataIncomplete);
                    const completerUrl = `${publicURL}/investment/account/payment/create`;
                    axios({
                        method: 'POST',
                        url: completerUrl,
                        data: this.state.investorDataIncomplete
                    }).then((data) => {
                        console.log(data.data)
                        if (data.data.status === 'success') {
                            this.setState({isLoading: false}, () => this.setState({applicationSuccess: true}))
                        } else {
                            this.setState({ hasError: true, errorMsg: data.data.responseMessage ? data.data.responseMessage : 'An error has occured. Try again later' })
                        }
                    }).catch((error) => {
                        this.setState({ isLoading: false })
                        this.setState({ applicationSuccess: false })
                        this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
                        // console.log(`this is the error -> ${error}`)
                    })
                } else {
                    this.setState({ hasError: true, errorMsg: data.data.responseMessage ? data.data.responseMessage : 'An error has occured. Try again later' })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ applicationSuccess: false })
                this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
                // console.log(`this is the error -> ${error}`)
            })
        } else {
            const completerUrl = `${publicURL}/investment/account/payment/create`;
            axios({
                method: 'POST',
                url: completerUrl,
                data: this.state.investorDataIncomplete
            }).then((data) => {
                this.setState({isLoading: false})
                if (data.data.status === 'success') {
                    this.setState({isLoading: false}, () => this.setState({applicationSuccess: true}))
                    
                } else {
                    this.setState({ hasError: true, errorMsg: data.data.responseMessage ? data.data.responseMessage : 'An error has occured. Try again later' })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ applicationSuccess: false })
                this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
                // console.log(`this is the error -> ${error}`)
            })
        }
    }

    proceedToViewDetails = () => {
        if(this.state.referralcode) {
            const url = `${publicURL}referralcode/one`;
            const codeData = {
                referralcode: this.state.referralcode
            }
            this.setState({ isLoading: true })
            axios({
                method: 'POST',
                url: url,
                data: codeData
            }).then((data) => {
                // console.log(data.data);
                // this.setState({ isLoading: false })
                console.log(data.data);
                if (data.data.status === 'success') {
                    this.setState({ interest: data.data.referralcode.interest }, () => this.processInterest())
                } else {
                    this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured. Try again later' })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ applicationSuccess: false })
                this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
                // console.log(`this is the error -> ${error}`)
            })

        } else {
            this.setState({interest: 2}, () => this.processInterest())
        }
    }


    processInterest = () => {
        const url = `${publicURL}investment/history/new`;
        const investmentData ={ 
            amount: this.unFormat(this.state.amount),
            duration: this.state.duration,
            interest: this.state.interest,
            startdate: this.state.start_date.toISOString().slice(0, 10)
        }
        console.log(investmentData);
        this.setState({ isLoading: true })
        axios({
            method: 'POST',
            url: url,
            data: investmentData
        }).then((data) => {
            // console.log(data.data);
            this.setState({ isLoading: false })
            console.log(data.data);
            if (data.data.status === 'success') {
                this.setState({ investmentDetails: data.data})
                this._handleGoNext()
            } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured. Try again later' })
            }
        }).catch((error) => {
            this.setState({ isLoading: false })
            // this.setState({ applicationSuccess: false })
            this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
            // console.log(`this is the error -> ${error}`)
        })
    }

    render() {
        const {currentPage, gender, amount, duration, isApplying, loanOffer, isLoading, applicationSuccess, firstname, lastname, category, title, date, start_date, email, telephone, address, city, selectedState, place_of_work, ippisnumber, salary_bank_name, salary_bank_account, referralcode, showDatePicker, isValidating, hasError, errorMsg, automate, falseautomate, processing, investmentDetails, interest, tax_id} = this.state;
        return (
            <InvestmentContext.Provider
            value={{
                amount: amount,
                duration: duration,
                loanOffer: loanOffer,
                category: category,
                interest: interest,
                title: title,
                gender: gender,
                showDatePicker: showDatePicker,
                start_date: start_date,
                date: date,
                tax_id: tax_id,
                errorMsg: errorMsg,
                firstname: firstname,
                lastname: lastname,
                isLoading: isLoading,
                currentPage: currentPage,
                automate,
                falseautomate,
                processing,
                isApplying: isApplying,
                isValidating: isValidating,
                hasError: hasError,
                applicationSuccess: applicationSuccess,
                email: email,
                address: address,
                telephone: telephone,
                city: city,
                ippisnumber: ippisnumber,
                referralcode: referralcode,
                place_of_work: place_of_work,
                salary_bank_name: salary_bank_name,
                salary_bank_account: salary_bank_account,
                selectedState: selectedState,
                investmentDetails: investmentDetails,
                setAmount: this.setAmount,
                setDuration: this.setDuration,
                unFormat: this.unFormat,
                loanApply: this._handleLoanApply,
                continue: this._handleCompleteApplication,
                goBack: this._handleGoBack,
                goNext: this._handleGoNext,
                setFirstName: this.setFirstName,
                setGender: this.setGender,
                setLastName: this.setLastName,
                setTitle: this.setTitle,
                setDuration: this.setDuration,
                setDate: this.setDate,
                cancel: this._handleCancelApplication,
                confirmDatePicker: this.confirmDatePicker,
                setEmail: this.setEmail,
                setPhone: this.setPhone,
                setAddress: this.setAddress,
                setCity: this.setCity,
                setBankCode: this.setBankCode,
                setBankAccount: this.setBankAccount,
                setIppisNumber: this.setIppisNumber,
                setReferral: this.setReferral,
                setTaxId: this.setTaxId,
                dateOnChange: this.dateOnChange,
                closeDatePicker: this.closeDatePicker,
                setShowDatePicker: this.setShowDatePicker,
                verifyAccount: this.validateAccountDetails,
                proceed: this.proceedToViewDetails,
                _onDismissSnackBar: this._onDismissSnackBar
            }}
            >
               {this.props.children}
            </InvestmentContext.Provider>
        )
    }
}

export {InvestmentContext, NewInvestmentProvider}
