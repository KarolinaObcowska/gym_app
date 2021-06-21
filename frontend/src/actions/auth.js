import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from './types';

// LOAD USER
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/user/me');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//SIGNUP USER
export const signup = ({ name, email, password }) => async dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password })

    try {
        const res = await axios.post('auth/signup', body, options)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => 
                dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SIGNUP_FAIL
        })
    }
}

// LOGIN USER
export const login = ( email, password ) => async dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/auth/login', body, options);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => 
                dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// LOGOUT
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
}