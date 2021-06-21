import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import ExerciseItem from './Training/ExerciseItem'
import { connect } from 'react-redux'
import { addExercise, deleteExercise, deleteTraining} from '../../actions/training';

const TrainingItem = ({ auth, training: { _id, name, date, exercises, user }, deleteTraining }) => {
    return (
        <div class="post bg-white p-1 my-1">
            <p class="my-1 lead text-primary"> {name} </p>
            <button className='btn btn-danger my-1' type ='button' onClick={e => deleteTraining(_id)}>
                                <i className='fas fa-times'></i>
                </button>
            <p class="post-date">
                <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
                <table className='table'> 
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Series</th>
                            <th>Reps</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {exercises.map((exercise) => (
                            <ExerciseItem key={exercise._id} exercise={exercise} />
                ))}
                         
                    </tbody>
                </table>
                    <Link to={`/training/${_id}`} class="btn btn-primary inline">
                            <p> <i className='fas fa-user-circle text-primary'></i>{' '}
                                Add exercise
                            </p>
            </Link>
         </div>
    )
}
TrainingItem.propTypes = {
    training: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addExercise: PropTypes.func.isRequired,
    deleteExercise: PropTypes.func.isRequired,
    deleteTraining: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addExercise, deleteExercise, deleteTraining })(TrainingItem)
