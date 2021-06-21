import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import ExerciseItem from './Training/ExerciseItem'
import { connect } from 'react-redux'
import { addExercise, deleteExercise, deleteTraining} from '../../actions/training';

const TrainingItem = ({ auth, training: { _id, name, date, exercises, user, description, tags }, deleteTraining }) => {
    return (
        < div class="post bg-white p-1 my-1">
                <p class="lead text-primary"> {name} </p>

            <div className='training-details'>
                <p class="training-items">
                Date: {''}
                    <Moment format='DD/MM/YYYY'>{date}</Moment>
                </p>
                <p className='training-items'>
                    Description: {''}
                    {description && (
                        description
                    )}
                </p>
                <p className='training-items'>
                    Tags: {''}
                    {tags && (
                        tags
                    )}
                </p>
            </div>
            <div className='training'>
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
                    <Link to={`/training/${_id}`} class="btn my-1 btn-primary inline">
                    <p> <i className='fas fa-user-circle text-primary'></i>{' '}
                        Add exercise
                    </p>
                    </Link>
                    <button className='btn btn-danger' type ='button' onClick={e => deleteTraining(_id)}>
                            Delete training
                    </button>
            </div>
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
