import axios from 'axios';

export const deleteAd = (id) => {
    const request = axios.delete(`/api/ad?id=${id}`)
        .then(response => response.data)
    return {
        type: 'DELETE_AD',
        payload: request
    }
}