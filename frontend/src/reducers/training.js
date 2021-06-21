import { 
    CREATE_TRAINING,
    GET_TRAININGS,
    GET_TRAINING,
    UPDATE_TRAINING,
    DELETE_TRAINING,
    TRAINING_ERROR,
    ADD_EXERCISE,
    DELETE_EXERCISE,
    GET_EXERCISES,
} from '../actions/types';

const INITIAL_STATE = {
    trainings: [],
    training: null,
    loading: true,
    error: {}
};

export default function trainingReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_TRAININGS:
            return {
                ...state,
                trainings: payload,
                loading: false
            };
        case GET_TRAINING:
        case UPDATE_TRAINING:
            return {
                ...state,
                training: payload,
                loading: false
            };
        case TRAINING_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CREATE_TRAINING:
            return {
                ...state,
                trainings: [ payload, ...state.trainings ],
                loading: false
            };
        case DELETE_TRAINING:
            return {
                ...state,
                trainings: state.trainings.filter( training => training._id !== payload ),
                loading: false
            };
        case ADD_EXERCISE:
            return {
                ...state,
                training: { ...state.training, exercises: payload },
                loading: false
            }
        case DELETE_EXERCISE:
            return {
                ...state,
                training: {
                    ...state.training,
                    exercises: state.training.exercises.filter(
                        exercise => exercise._id !== payload
                    )
                }
            }
        case GET_EXERCISES:
            return {
                ...state,
                loading: false,
                training: {
                    ...state.training,
                    exercises: state.training.exercises
                }
            }
        default: 
            return state;
    }
}
