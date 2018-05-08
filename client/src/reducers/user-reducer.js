const initialState = {login: {isAuth: false, errorMessage: ''}};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN_FULFILLED':
            return {
                ...state, 
                login: action.payload
            }
        case 'USER_LOGIN_REJECTED':
            return {
                ...state,
                login: action.payload
            }
        case 'USER_AUTH_FULFILLED':
            return {
                ...state, 
                login: action.payload
            }
        case 'USER_LOGOUT_FULFILLED':
            return {
                ...state, 
                login: action.payload
            }
        case 'GET_USER_FULFILLED':
            return {
                ...state, 
                currentUser: action.payload
            }
        case 'USER_REGISTER_FULFILLED':
            return {
                ...state,
                login: action.payload.user,
                success: action.payload.success
            }
        default: 
            return state;
    }
}