const initialState = {loading: true}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'USER_ADS_FULFILLED':
            return {
                ...state,
                currentUserAds: {
                    activeAds: action.payload.filter(ad => ad.active),
                    inactiveAds: action.payload.filter(ad => !ad.active)
                },
                loading: false
            } 
        case 'GET_AD':
            return {
                ...state,
                currentAd: action.payload,
                loading: false
            }
        case 'DELETE_AD_FULFILLED':
            return {
                ...state,
                currentUserAds: {
                    activeAds: state.currentUserAds.activeAds.filter(ad => ad._id !== action.payload.id),
                    inactiveAds: state.currentUserAds.inactiveAds.filter(ad => ad._id !== action.payload.id)
                }
            }
        default: 
            return state;
    }
}