import axios from 'axios';

export const deleteAd = id => {
    const request = axios.delete(`/api/ad?id=${id}`)
        .then(response => response.data)
    return {
        type: 'DELETE_AD',
        payload: request
    }
}

export const deleteFromFavorites = data => {
    const request = axios.post(`/api/ad/delete-from-favorites`, data)
        .then(response => {console.log(response, data)
            return response.data    
        })
    return {
        type: 'DELETE_AD_FROM_FAVORITES',
        payload: request
    }
}

export const getAd = id => {
    const request = axios.get(`/api/ad?id=${id}`)
        
    return (dispatch) => {
        request.then(({data}) => {
            let ad = data;
            axios.get(`/api/user/${ad.ownerId}`)
                .then(({data}) => {
                    let adInfo = {
                        ...ad,
                        owner: data
                    }
                    dispatch({
                        type: 'GET_AD',
                        payload: adInfo
                    })
                })
        })
    }
}

export const userAds = id => {
    const request = axios.get(`/api/ad/user-ads?id=${id}`)
        .then(response => response.data.docs)

    return {
        type: 'USER_ADS',
        payload: request
    }
}

export const addToFavorites = data => {
    const request = axios.post('/api/ad/add-to-favorites', data)
        .then(response => console.log(response))

    return {
        type: 'ADD_TO_FAVORITES',
        payload: request
    }
}
