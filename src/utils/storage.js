import * as SecureStore from 'expo-secure-store';

import navigationservice from "./navigationservice"

export const setUserType = async(type) => {
    await SecureStore.setItemAsync('creditWalletUserType', JSON.stringify(type));
}

export const getUserType = async () => {
    return await SecureStore.getItemAsync('creditWalletUserType');
};

export const setCustomerToken = async (token) => {
    await SecureStore.setItemAsync('creditWalletCustomerToken', token);
};

export const getCustomerToken = async () => {
    return await SecureStore.getItemAsync('creditWalletCustomerToken');
};
export const setInvestorToken = async (token) => {
    await SecureStore.setItemAsync('creditWalletInvestorToken', token);
};

export const getInvestorToken = async () => {
    return await SecureStore.getItemAsync('creditWalletInvestorToken');
};

export const setCustomer = async(details) => {
    await SecureStore.setItemAsync('creditWalletCustomer', JSON.stringify(details));
}

export const getCustomer = async () => {
    return await SecureStore.getItemAsync('creditWalletCustomer');
};

export const setIntent = async(value) => {
    await SecureStore.setItemAsync('cw-intent', value);
}

export const getIntent = async () => {
    return await SecureStore.getItemAsync('cw-intent');
};

export const signOut = async() => {
    return await SecureStore.deleteItemAsync('creditWalletCustomerToken').then(SecureStore.deleteItemAsync('creditWalletCustomer').then(navigationservice.navigate('Initial Screen')))
}
