import { 
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function authReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token );
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                ...payload
            };
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case CLEAR_PROFILE: 
            return {
                ...state,
                user: null,
                loading: false
            }
        default:
            return state;
    }
}