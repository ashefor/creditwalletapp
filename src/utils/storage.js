import * as SecureStore from 'expo-secure-store';

import navigationservice from "./navigationservice"


export const setToken = async (token) => {
    await SecureStore.setItemAsync('access_token', token);
};

export const getToken = async () => {
    return await SecureStore.getItemAsync('access_token');
};

export const setUser = async(details) => {
    await SecureStore.setItemAsync('creditWalletUser', JSON.stringify(details));
}

export const getUser = async () => {
    return await SecureStore.getItemAsync('creditWalletUser');
};

export const signOut = async() => {
    return await SecureStore.deleteItemAsync('access_token').then(SecureStore.deleteItemAsync('creditWalletUser').then(navigationservice.navigate('Auth')))
}
