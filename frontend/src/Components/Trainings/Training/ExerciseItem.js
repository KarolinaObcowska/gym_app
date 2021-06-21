import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { deleteExercise } from '../../../actions/training'
import { connect } from 'react-redux'

const ExerciseItem = ({ deleteExercise, trainingId, auth, exercise: { _id, name, series, reps }}) => {
    return (
        <Fragment className='post bg-white p-1 my-1'>
            <tr>
                <td>{name}</td>
                <td>{series}</td>
                <td>{reps}</td>
                
                    <button className='btn btn-danger' type ='button' onClick={e => deleteExercise(trainingId, _id)}>
                        <i className='fas fa-times'></i>
                    </button>
                
            </tr>
            
          </Fragment>
    )
}

ExerciseItem.propTypes = {
    trainingId: PropTypes.number.isRequired,
    exercise: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteExercise: PropTypes.func.isRequired,
}

export default connect(null, { deleteExercise })(ExerciseItem)
