import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getTraining, deleteExercise } from '../../../actions/training'
import { connect } from 'react-redux'

const ExerciseItem = ({ getTraining, deleteExercise, trainingId, auth, exercise: { _id, name, series, reps }, }) => {
    useEffect(() => {
        getTraining(trainingId)
    }, [getTraining, trainingId])
    return (
        <Fragment>
            <tr>
                <td>{name}</td>
                <td>{series}</td>
                <td>{reps}</td>
                <td>
                    <button className='btn btn-danger delete' type ='button' onClick={e => deleteExercise(trainingId, _id)}>
                    <i className='fas fa-times'></i>
                    </button>
                </td>
            </tr>
          </Fragment>
    )
}

ExerciseItem.propTypes = {
    trainingId: PropTypes.number.isRequired,
    exercise: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteExercise: PropTypes.func.isRequired,
    getTraining: PropTypes.func.isRequired,
}

export default connect(null, { deleteExercise, getTraining })(ExerciseItem)
