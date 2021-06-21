import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types";

const INITIAL_STATE = {
    user: {},
    loading: true,
    error: {},
}

export default function userReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                user: payload,
                loading: false,
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                laoding: false,
                user: null
            };
        default: 
            return state;
    }
}