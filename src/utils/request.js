import { getToken } from "./storage"
import navigationservice from "./navigationservice"

export const apiURL = 'https://creditwallet.ng/api/public/customer/'
export const publicURL = 'https://creditwallet.ng/api/public/'
const axios = require('axios').default;

export const request = (url, options) => {
    const requestOptions = {
        ...options,
    }
    return new Promise((resolve, reject) => {
        fetch(url, requestOptions).then(res => res.text()).then(data => {
            const parsedData = JSON.parse(data);
            // console.log(parsedData)
            if (parsedData.status === "success") {
                return resolve(parsedData)
            } else {
                return reject(parsedData)
            }
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}
export const axiosPost = (options) => {
    return axios.post(options)
}
export const requestWithToken = async (url, options) => {
    const token = await getToken();
    if (token) {
        // console.log(token)
        const requestOptions = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        return new Promise((resolve, reject) => {
            fetch(url, requestOptions).then(res => res.json()).then(data => {
                // console.log(data);
                if (data.status === "error" && data.message === "Authorization Failed, Please login to continue") {
                    navigationservice.navigate('Login')
                } else if (data.status === "success") {
                    return resolve(data)
                } else {
                    return reject(data)
                }
            }).catch(error => {
                return reject(error)
            })
        })
    } else {
        navigationservice.navigate('Auth')
        // console.log('no token')
    }
}