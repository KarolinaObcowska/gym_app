import {v4 as uuid} from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export function setAlert(msg, alertType) {
    return dispatch => {
            const id = uuid();
            dispatch({
                type: SET_ALERT,
                payload: { msg, alertType, id }
            });
            setTimeout(() => {
                dispatch({ type: REMOVE_ALERT, payload: id})
            }, 3000 )
        };
}
