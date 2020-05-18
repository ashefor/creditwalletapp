import { getToken } from "./storage"
import navigationservice from "./navigationservice"

export const apiURL = 'https://creditwallet.ng/api/public/customer/'

export const request = (url, options) => {
    const requestOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return new Promise((resolve, reject) => {
        console.log('firing')
        fetch(url, requestOptions).then(res => res.json()).then(data => {
            if (data.status === "success") {
                return resolve(data)
            } else {
                return reject(data)
            }
        }).catch(error => {
            return reject(error)
        })
    })
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
                console.log(data);
                if (data.status === "error" && data.message === "Authorization Failed, Please login to continue") {
                    navigationservice.navigate('Auth')
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
        //   this.props.navigation.navigate('Auth')
        console.log('no token')
    }
}