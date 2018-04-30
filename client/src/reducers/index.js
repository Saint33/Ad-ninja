import { combineReducers } from 'redux';
import ad from './ad-reducer';
import user from './user-reducer';

const rootReducer = combineReducers({
    ad, 
    user
});

export default rootReducer;