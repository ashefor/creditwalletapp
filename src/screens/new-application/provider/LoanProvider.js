

import React, { Component } from 'react';
import { requestWithToken, loanApiURL, request } from '../../../utils/request';

const LoanContext = React.createContext();

class LoanProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage:1,
            amount: '',
            duration: 1,
            isApplying: false,
            isLoading: false,
            loanOffer: null,
            firstName: null,
            lastName: null,
            category: null,
            applicationSuccess: false,
        }
    }

    setAmount = amount => {
        this.setState({amount})
    }

    setDuration = duration => {
        this.setState({duration})
    }
    setFirstName = firstName => {
        this.setState({firstName})
    }

    setLastName = lastName => {
        this.setState({lastName})
    }

    setCategory = category => {
        this.setState({category})
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
    _handleLoanApply = () => {
        const url = `${loanApiURL}calculate-repayment`;
        const loan = {
            amount: this.state.amount,
            tenor: this.state.duration
        }
        console.log(loan)
        const options = {
            method: 'POST',
            body: JSON.stringify(loan),
        }
        this.setState({ isApplying: true })
        request(url, options).then((data) => {
            this.setState({ isApplying: false })
            if (data.status === 'success') {
                console.log(data);
                this.setState({ loanOffer: data, currentPage: 2 })
            }
        }).catch((error) => {
            this.setState({ isApplying: false })
            console.log(error)
        })
    }


    _handleAcceptLoan = async () => {
        const url = `${loanApiURL}apply`;
        const user = await getUser();
        if (user) {
            const userObj = JSON.parse(user)
            // console.log(userObj);
            const loanData = {
                firstname: userObj.borrower_firstname,
                lastname: userObj.borrower_lastname,
                gender: userObj.borrower_gender,
                title: userObj.borrower_title,
                email: userObj.borrower_email,
                telephone: userObj.borrower_mobile,
                house_address: userObj.borrower_address,
                city: userObj.borrower_city,
                state: userObj.borrower_province,
                place_of_work: userObj.borrower_business_name,
                ippisnumber: userObj.custom_field_1135,
                salary_bank_account: getBankCode(userObj.custom_field_1168.toLowerCase()),
                salary_bank_name: userObj.custom_field_1169,
                loan_amount: this.state.amount,
                monthly_repayment: this.state.loanOffer.monthlyrepayment,
                tenor: this.state.duration,
                dob: userObj.borrower_dob
            }

            console.log(loanData)
            const options = {
                method: 'POST',
                body: JSON.stringify(loanData),
            }
            this.setState({ isLoading: true })
            requestWithToken(url, options).then((data) => {
                this.setState({ isLoading: false })
                if (data.status === 'success') {
                    console.log(data);
                    this.setState({ applicationSuccess: true })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ applicationSuccess: false })
                console.log(error)
            })
        }
    }


    render() {
        const {currentPage, amount, duration, isApplying, loanOffer, isLoading, applicationSuccess, firstName, lastName, category} = this.state;
        return (
            <LoanContext.Provider
            value={{
                amount: amount,
                duration: duration,
                loanOffer: loanOffer,
                category: category,
                firstName: firstName,
                lastName: lastName,
                isLoading: isApplying,
                currentPage: currentPage,
                isApplying: isApplying,
                setAmount: this.setAmount,
                setDuration: this.setDuration,
                loanApply: this._handleLoanApply,
                acceptLoan: this._handleAcceptLoan,
                goBack: this._handleGoBack,
                goNext: this._handleGoNext,
                setCategory: this.setCategory,
            }}
            >
               {this.props.children}
            </LoanContext.Provider>
        )
    }
}

export {LoanContext, LoanProvider}
