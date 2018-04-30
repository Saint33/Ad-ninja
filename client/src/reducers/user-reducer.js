const initialState = {login: {isAuth: false}};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN_FULFILLED':
            return {
                ...state, 
                login: action.payload
            }
        case 'USER_AUTH_FULFILLED':
            return {
                ...state, 
                login: action.payload
            }
        default: 
            return state;
    }
}