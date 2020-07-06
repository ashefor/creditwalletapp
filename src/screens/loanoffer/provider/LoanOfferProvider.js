

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
            currentPage:1,
            amount: '',
            duration: 1,
            isApplying: false,
            isLoading: false,
            applicationSuccess: false,
            showDatePicker: false,
            loanOffer: null,
            firstname: null,
            lastname: null,
            telephone: null,
            referralcode: '',
            email: null,
            city: null,
            address: null,
            place_of_work: null,
            ippisnumber: null,
            selectedState: null,
            salary_bank_name: null,
            salary_bank_account: null,
            date: new Date(1598051730000),
            dob: null,
            category: null,
            title: null,
            gender: null,
        }
        this.state = this.initialstate
    }

    fetchLoanOffer = () => {
        
    }

    setAmount = amount => {
        this.setState({amount})
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
        // console.log(selectedDate)
        const currentDate = selectedDate || this.state.date;
        // console.log(currentDate)
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
        this.setState({dob: currentDate}, this.setState({showDatePicker: false}))
      };
    
    _handleLoanApply = () => {
        const url = `${loanApiURL}calculate-repayment`;
        const loan = {
            amount: this.state.amount,
            tenor: this.state.duration
        }
        console.log(loan)
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
             console.log(data)
            this.setState({ isApplying: false })
            if (data.data.status === 'success') {
                console.log(data);
                this.setState({ loanOffer: data.data, currentPage: 2 })
            }
        }).catch((error) => {
            this.setState({ isApplying: false })
            console.log(error)
        })
    }


    _handleAcceptLoan = async () => {
        const url = `${loanApiURL}apply/new`;
        const {amount, duration, loanOffer, firstname, lastname, title, gender, dob, email, telephone, address, city, selectedState, place_of_work, ippisnumber, salary_bank_name, salary_bank_account, referralcode} = this.state;
            // console.log(userObj);
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
                loan_amount: amount,
                monthly_repayment: loanOffer.monthlyrepayment,
                tenor: duration,
                dob: dob.toDateString(),
                referralcode: referralcode
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(loan),
            }
            console.log(loan)
            this.setState({ isLoading: true })
            axios({
                method: 'POST',
                url: url,
                data: loan
            }).then((data) => {
                console.log(data);
                this.setState({ isLoading: false })
                if (data.data.status === 'success') {
                    this.setState({ applicationSuccess: true })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                this.setState({ applicationSuccess: false })
                console.log(`this is the error -> ${error}`)
            })
            // request(url, options).then((data) => {
            //     console.log(data);
            //     this.setState({ isLoading: false })
            //     if (data.status === 'success') {
            //         this.setState({ applicationSuccess: true })
            //     }
            // }).catch((error) => {
            //     this.setState({ isLoading: false })
            //     this.setState({ applicationSuccess: false })
            //     console.log(`this is the error -> ${error}`)
            // })
    }


    render() {
        const {currentPage, amount, duration, isApplying, loanOffer, isLoading, applicationSuccess, firstname, lastname, category, title, gender, date, dob, email, telephone, address, city, selectedState, place_of_work, ippisnumber, salary_bank_name, salary_bank_account, referralcode, showDatePicker} = this.state;
        return (
            <LoanOfferContext.Provider
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
                firstname: firstname,
                lastname: lastname,
                isLoading: isLoading,
                currentPage: currentPage,
                isApplying: isApplying,
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
            }}
            >
               {this.props.children}
            </LoanOfferContext.Provider>
        )
    }
}


export {LoanOfferContext, LoanOfferProvider}
