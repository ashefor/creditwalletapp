

import React, { Component } from 'react';
import { requestWithToken, publicURL, request, axiosPost, apiURL } from '../../../utils/request';
import navigationservice from '../../../utils/navigationservice';
import { states } from '../../../utils/states';
const axios = require('axios').default;
const LoanContext = React.createContext();

class NewLoanProvider extends Component {
    constructor(props) {
        super(props);
        this.initialstate = {
            currentPage:1,
            amount: '',
            duration: 2,
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
            email: null,
            city: null,
            address: null,
            place_of_work: null,
            ippisnumber: null,
            selectedState: null,
            salary_bank_name: null,
            salary_bank_account: null,
            date: new Date(1937, 0, 1),
            dob: null,
            category: null,
            title: null,
            gender: null,
            decimalSeparator: '.',
            commaSeparator: ','
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

    setLastName = lastname => {
        this.setState({lastname})
    }

    setCategory = category => {
        this.setState({category})
    }

    setTitle = title => {
        this.setState({title})
    }
    setGender = gender => {
        this.setState({gender})
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

    setSelectedState = selectedState => {
        this.setState({selectedState})
    }
    setDate = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({date: currentDate})
    }

    setBankCode = bankcode => {
        this.setState({salary_bank_name: bankcode})
    }

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
        this.setState({dob: this.state.date})
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
            if(prevState.currentPage === 5) {
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
            accountnumber: this.state.salary_bank_account
        }
        this.setState({ isValidating: true, hasError: false })
         axios({
             method: 'POST',
             url: url,
             data: account
         }).then((data) => {
            this.setState({ isValidating: false })
            if (data.data.status === 'success') {
                this._handleAcceptLoan();
            } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured' })
            }
        }).catch((error) => {
            this.setState({ isValidating: false })
            this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
        })
    }
    _handleCancelApplication = () => {
        navigationservice.navigate('Auth')
    }

    resetState = () => {
        return this.setState(this.initialstate)
    }
    setShowDatePicker = () => {
        return this.setState({showDatePicker: true})
    }

    closeDatePicker = () => {
        this.setState({showDatePicker: false})
    }
    dateOnChange = (event, selectedDate) => {
        const currentDate = selectedDate || null;
        this.setState({dob: currentDate}, this.setState({showDatePicker: false}))
      };
    
    _handleLoanApply = () => {
        const url = `${publicURL}calculate-repayment`;
        const loan = {
            amount: this.unFormat(this.state.amount),
            tenor: this.state.duration
        }
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
            this.setState({ isApplying: false })
            if (data.data.status === 'success') {
                this.setState({ loanOffer: data.data, currentPage: 2 })
            } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured. Try again later' })
            }
        }).catch((error) => {
            this.setState({ isApplying: false })
            this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
        })
    }

    _onDismissSnackBar = () => {
        this.setState({ hasError: false })
    };

    _handleAcceptLoan = async () => {
        const url = `${publicURL}apply/new`;
        const {amount, duration, loanOffer, firstname, lastname, title, gender, dob, email, telephone, address, city, selectedState, place_of_work, ippisnumber, salary_bank_name, salary_bank_account, referralcode} = this.state;
            const loan = {
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                title: title,
                email: email,
                telephone: telephone,
                house_address: address,
                city: city,
                state: selectedState,
                place_of_work: place_of_work,
                ippisnumber: ippisnumber,
                salary_bank_account: salary_bank_account,
                salary_bank_name: salary_bank_name,
                loan_amount: this.unFormat(amount),
                monthly_repayment: loanOffer.monthlyrepayment,
                tenor: duration,
                dob: new Date(dob).toDateString(),
                refferalcode: referralcode ? referralcode : 0
            }
            this.setState({ isLoading: true })
            axios({
                method: 'POST',
                url: url,
                data: loan
            }).then((data) => {
                this.setState({ isLoading: false })
                if (data.data.status === 'success') {
                    this.setState({ applicationSuccess: true })
                    if (data.data.returnstatus) {
                        this.setState({ automate: true, processing: true }, () => navigationservice.navigate('Offer', {loanid: data.data.id}))
                    } else {
                        this.setState({ falseautomate: true })
                    }
                } else {
                    this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured. Try again later' })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ applicationSuccess: false })
                this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
            })
    }


    render() {
        const {currentPage, amount, duration, isApplying, loanOffer, isLoading, applicationSuccess, firstname, lastname, category, title, gender, date, dob, email, telephone, address, city, selectedState, place_of_work, ippisnumber, salary_bank_name, salary_bank_account, referralcode, showDatePicker, isValidating, hasError, errorMsg, automate, falseautomate, processing} = this.state;
        return (
            <LoanContext.Provider
            value={{
                amount: amount,
                duration: duration,
                loanOffer: loanOffer,
                category: category,
                title: title,
                gender: gender,
                showDatePicker: showDatePicker,
                dob: dob,
                date: date,
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
                setAmount: this.setAmount,
                setDuration: this.setDuration,
                unFormat: this.unFormat,
                loanApply: this._handleLoanApply,
                acceptLoan: this._handleAcceptLoan,
                goBack: this._handleGoBack,
                goNext: this._handleGoNext,
                setFirstName: this.setFirstName,
                setLastName: this.setLastName,
                setCategory: this.setCategory,
                setTitle: this.setTitle,
                setGender: this.setGender,
                setDate: this.setDate,
                cancel: this._handleCancelApplication,
                confirmDatePicker: this.confirmDatePicker,
                setEmail: this.setEmail,
                setPhone: this.setPhone,
                setAddress: this.setAddress,
                setCity: this.setCity,
                setSelectedState: this.setSelectedState,
                setBankCode: this.setBankCode,
                setPlaceOfWork: this.setPlaceOfWork,
                setBankAccount: this.setBankAccount,
                setIppisNumber: this.setIppisNumber,
                setReferral: this.setReferral,
                dateOnChange: this.dateOnChange,
                closeDatePicker: this.closeDatePicker,
                setShowDatePicker: this.setShowDatePicker,
                verifyAccount: this.validateAccountDetails,
                _onDismissSnackBar: this._onDismissSnackBar,
                resetState: this.resetState
            }}
            >
               {this.props.children}
            </LoanContext.Provider>
        )
    }
}

export {LoanContext, NewLoanProvider}
