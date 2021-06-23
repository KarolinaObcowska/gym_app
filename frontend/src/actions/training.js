import axios from 'axios';
import { setAlert } from './alert';

import { 
    CREATE_TRAINING,
    GET_TRAININGS,
    GET_TRAINING,
    UPDATE_TRAINING,
    DELETE_TRAINING,
    TRAINING_ERROR,
    ADD_EXERCISE,
    DELETE_EXERCISE,
} from '../actions/types';

// get trainings 

export const getTrainings = () => async dispatch => {
    try {
        const res = await axios.get('/training');
        dispatch({
            type: GET_TRAININGS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: TRAINING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// get training 
export const getTraining = (id) => async dispatch => {
    try {
        const res = await axios.get(`/training/${id}`);
        dispatch({
            type: GET_TRAINING,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: TRAINING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// create training 
export const createTraining = (formData) => async dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/training', formData, options);
        dispatch({
            type: CREATE_TRAINING,
            payload: res.data
        })
        dispatch(setAlert('Training created!', 'success'))
    } catch (err) {
        dispatch({
            type: TRAINING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// update training
export const updateTraining = (id, formData) => async dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put(`/training/${id}`, formData, options);
        dispatch({
            type: UPDATE_TRAINING,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: TRAINING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// delete training
export const deleteTraining = (id) => async dispatch => {
    try {
        await axios.delete(`/training/${id}`);
        dispatch({
            type: DELETE_TRAINING,
            payload: id
        });
        dispatch(setAlert('Training removed!', 'success'))
    } catch (err) {
        dispatch({
            type: TRAINING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// add exercise 
export const addExercise = (trainingId, formData, history) => async dispatch => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/training/exercise/${trainingId}`, formData, options);
        dispatch({
            type: ADD_EXERCISE,
            payload: res.data
        })
        dispatch(setAlert('Exercise added!', 'success'))
    } catch (err) {
        dispatch({
            type: TRAINING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// delete exercise
export const deleteExercise = (trainingId, exerciseId) => async dispatch => {
    try {
        await axios.delete(`/training/exercise/${trainingId}/${exerciseId}`);
        dispatch({
            type: DELETE_EXERCISE,
            payload: exerciseId,
        })
        dispatch(setAlert('Exercise removed!', 'danger'))
    } catch (err) {
        dispatch({
            type: TRAINING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

