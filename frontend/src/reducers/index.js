import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import training from './training';



export default combineReducers({
    alert,
    auth,
    user,
    training
});