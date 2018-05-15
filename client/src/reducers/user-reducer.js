const initialState = {login: {isAuth: false, errorMessage: ''}, loginModalIsOpen: false};

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
        case 'OPEN_MODAL':
            return {
                ...state,
                loginModalIsOpen: true
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                loginModalIsOpen: false
            }
        default: 
            return state;
    }
}