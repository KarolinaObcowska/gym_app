import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import ExerciseItem from './Training/ExerciseItem'
import { connect } from 'react-redux'
import { addExercise, deleteExercise, deleteTraining} from '../../actions/training';

const TrainingItem = ({ training: { _id, name, date, exercises, description, tags }, deleteTraining }) => {
    return (
        < div class="training-form p-1 my-1">
            <div className='training-details '>
                <div className='training-items lead training-name m-1'>
                    <p class="text-primary"> {name} </p>
                </div>
                <p class="training-items">
                Date: {''}
                    <Moment format='DD/MM/YYYY'>{date}</Moment>
                </p>
                {/* <p className='training-items'>
                    Description: {''}
                    {description && (
                        description
                    )}
                </p> */}
                <p className='training-items'>
                    Tags: {''}
                    {tags && (
                        tags
                    )}
                </p>
            </div>
            <div className='training'>
                <table className='table centered'> 
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Series</th>
                            <th>Reps</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {exercises.map((exercise) => (
                                <ExerciseItem key={exercise._id} exercise={exercise} trainingId={_id}/>
                ))}
                         
                    </tbody>
                </table>
                    <Link to={`/training/${_id}`} class="btn my-1 btn-primary">
                    <p>
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
