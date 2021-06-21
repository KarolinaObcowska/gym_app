import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, DELETE_ACCOUNT, UPDATE_PROFILE } from './types';

// get current user account
export const getCurrentUser = () => async dispatch => {
    try {
        const res = await axios.get('/user/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// update account
export const updateProfile = (formData, history ) => async dispatch => {
    try {
        const options =  {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/user', formData, options);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Profile updated!', 'success'))
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => 
                dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// delete account 
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are your sure?'))
    try {
        await axios.delete('/user');
        dispatch({ type: DELETE_ACCOUNT });
        dispatch(setAlert('Account has been removed', 'danger'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};


export const addGoalCard = (formData, history) => async dispatch => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/user/goalcard', formData, options)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Goal Card added', 'success'));
        history.push('/dashboard')


    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => 
                dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const deleteGoalCard = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`/user/goaldcard/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };