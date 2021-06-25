import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_GOALCARD } from "../actions/types";

const INITIAL_STATE = {
    user: {},
    loading: true,
    error: {},
    goalCard: {}
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
                goalCard: payload.goalCard
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                laoding: false,
                user: null
            };
        case GET_GOALCARD:
            return {
                ...state,
                goalCard: payload,
                loading: false
            }
        default: 
            return state;
    }
}