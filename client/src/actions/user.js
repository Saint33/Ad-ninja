import axios from 'axios';
import { userAds } from './ad';

export const login = ({email, password}) => {
    const request = axios.post('/api/auth/login', {email, password})
        .then(response => response.data)
    return{
        type: 'USER_LOGIN',
        payload: request
    }
}

export const auth = () => {
    const request = axios.get('/api/auth')
        .then(response => response.data)

    return {
        type: 'USER_AUTH',
        payload: request
    }
}

export const logout = () => {
    const request = axios.get('/api/auth/logout')
        .then(response => response.data)

    return {
        type: 'USER_LOGOUT',
        payload: request
    }
}

export const getUser = (id) => {
    const request = axios.get(`/api/user/${id}`)
        .then(response => response.data)

    return {
        type: 'GET_USER',
        payload: request
    }  
}

export const getUserWithAds = (id) => {
    return dispatch => {
        dispatch(getUser(id))
            .then(() => dispatch(userAds(id)))
    }

}