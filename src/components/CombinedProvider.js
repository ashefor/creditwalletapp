import React from 'react';
import { LoanOfferProvider } from '../screens/loanoffer/provider/LoanOfferProvider';
import { AutoLoanOfferProvider } from '../screens/autoloanoffer/provider/AutoLoanOfferProvider';
import { NewLoanProvider } from '../screens/new-application/provider/NewLoanProvider';
import { NewInvestmentProvider } from '../screens/investment/new-application/provider/NewInvestmentProvider';

const CombinedContextProvider = ({children}) => (
   <AutoLoanOfferProvider>
        <LoanOfferProvider>
            <NewLoanProvider>
                <NewInvestmentProvider>
                {children}
                </NewInvestmentProvider>
            </NewLoanProvider>
        </LoanOfferProvider>
   </AutoLoanOfferProvider>
)

export default CombinedContextProvider