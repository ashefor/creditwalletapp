

import React, { Component } from 'react';
import { requestWithToken, loanApiURL, request, axiosPost, apiURL } from '../../../utils/request';
import navigationservice from '../../../utils/navigationservice';
import { states } from '../../../utils/states';
const axios = require('axios').default;
const LoanOfferContext = React.createContext();

class LoanOfferProvider extends Component {
    constructor(props) {
        super(props);
        this.initialstate = {
            currentPage: 1,
            isAccepting: false,
            noOffer: false,
            isFetchingOffer: false,
            isValidating: false,
            hasError: false,
            hasFinishedFetching: false,
            applicationSuccess: false,
            idCard: '',
            errorMsg: null,
            passport: '',
            code: null,
            email: null,
            salary_bank_name: null,
            salary_bank_account: null,
            offerLetter: null
        }
        this.state = this.initialstate
    }

    setCode = code => {
        this.setState({code})
    }

    setIdCard = message => {
        this.setState({idCard: message})
    }

    setPassport = message => {
        this.setState({passport: message})
    }

    setEmail = email => {
        this.setState({email})
    }

    setBankCode = bankcode => {
        this.setState({salary_bank_name: bankcode})
    }

    setBankAccount = account=> {
        this.setState({salary_bank_account: account})
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
        const url = `${loanApiURL}verify/account`;
        const account = {
            bankcode: this.state.salary_bank_name,
            accountnumber: this.state.salary_bank_account
        }
        // console.log(account)
        this.setState({ isValidating: true, hasError: false })
         axios({
             method: 'POST',
             url: url,
             data: account
         }).then((data) => {
            //  console.log(data)
            this.setState({ isValidating: false })
            if (data.data.status === 'success') {
                // console.log(data);
                this._handleGoNext();
            } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured' })
            }
        }).catch((error) => {
            this.setState({ isValidating: false })
            this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
            console.log(error)
        })
    }


    _handleCancelApplication = () => {
        this.setState(this.initialstate, () => navigationservice.navigate('Home'))
    }
    _handleLoanApply = () => {
        const url = `${loanApiURL}loan/finalize/new`;
        const loan = {
            amount: this.state.amount,
            tenor: this.state.duration
        }
        // console.log(loan)
        const options = {
            method: 'POST',
            data: loan,
            url: url
        }
        this.setState({ isAccepting: true })
         axios({
             method: 'POST',
             url: url,
             data: loan
         }).then((data) => {
            //  console.log(data)
            this.setState({ isAccepting: false })
            if (data.data.status === 'success') {
                // console.log(data);
                // this.setState({ })
            }
        }).catch((error) => {
            this.setState({ isAccepting: false })
            console.log(error)
        })
    }


    _handleComplete = async () => {
        const url = `${loanApiURL}loan/finalize/new`;
            // console.log(userObj);
            const loan = {
                id: this.state.offerLetter.id,
                idcard: this.state.idCard,
                passport: this.state.passport,
            }
            // console.log(loan)
            this.setState({ isAccepting: true })
         axios({
             method: 'POST',
             url: url,
             data: loan
         }).then((data) => {
            //  console.log(data)
            this.setState({ isAccepting: false })
            if (data.data.status === 'success') {
                // console.log(data);
                this.setState({ applicationSuccess: true })
            } else {
                this.setState({ hasError: true, errorMsg: data.data.message ? data.data.message : 'An error has occured. Try again later' })
            }
        }).catch((error) => {
            this.setState({ isAccepting: false, applicationSuccess: false  })
            this.setState({ hasError: true, errorMsg: 'Error connecting to server. Please try again' })
            console.log(error)
        })
    }


    _handleFetchLoanOffer = async (loanId) => {
        const url = `${loanApiURL}loan/offer/view`;
            // console.log(userObj);
            const loan_id = {
                id: loanId
            }
            // console.log( loan_id)
            this.setState({ isFetchingOffer: true })
            axios({
                method: 'POST',
                url: url,
                data:  loan_id
            }).then((data) => {
                this.setState({ isFetchingOffer: false , hasFinishedFetching: true})
                if (data.data.status === 'success') {
                    // console.log(data);
                    this.setState({ offerLetter: data.data.loan})
                } else {
                    this.setState({noOffer: true})
                }
            }).catch((error) => {
                this.setState({ isFetchingOffer: false })
            })
    }


    render() {
        const {currentPage, hasError, errorMsg, isValidating, isAccepting,  hasFinishedFetching, applicationSuccess, email, code, salary_bank_name, salary_bank_account, isFetchingOffer, offerLetter, noOffer, idCard, passport} = this.state;
        return (
            <LoanOfferContext.Provider
            value={{
               code: code,
                currentPage: currentPage,
                isAccepting: isAccepting,
                isFetchingOffer: isFetchingOffer,
                isValidating: isValidating,
                applicationSuccess: applicationSuccess,
                hasFinishedFetching: hasFinishedFetching,
                noOffer: noOffer,
                hasError: hasError,
                errorMsg: errorMsg,
                email: email,
                idCard: idCard,
                passport: passport,
                offerLetter: offerLetter,
                salary_bank_name: salary_bank_name,
                salary_bank_account: salary_bank_account,
                goBack: this._handleGoBack,
                goNext: this._handleGoNext,
                cancel: this._handleCancelApplication,
                setEmail: this.setEmail,
                setCode: this.setCode,
                setBankCode: this.setBankCode,
                setBankAccount: this.setBankAccount,
                fetchLoanOffer: this._handleFetchLoanOffer,
                setIdCard: this.setIdCard,
                setPassport: this.setPassport,
                complete: this._handleComplete,
                verifyAccount: this.validateAccountDetails
            }}
            >
               {this.props.children}
            </LoanOfferContext.Provider>
        )
    }
}


export {LoanOfferContext, LoanOfferProvider}
