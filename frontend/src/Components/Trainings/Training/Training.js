import React, { Fragment, useEffect }from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TrainingItem from '../TrainingItem'
import ExerciseForm from './ExerciseForm';
import Spinner from '../../Layout/Spinner'
import { getTraining } from '../../../actions/training'


const Training = ({ getTraining, match, training: { training, loading }}) => {
    useEffect(() => {
        getTraining(match.params.id)
    }, [getTraining, match.params.id])
    return loading || training === null ? <Spinner /> : <Fragment>
        <Link to='/trainings' className='btn'>Back to Trainings</Link>
        <TrainingItem training={training} />
        <ExerciseForm trainingId={training._id}/>
    </Fragment>
}

Training.propTypes = {
    getTraining: PropTypes.func.isRequired,
    training: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    training: state.training
})
export default connect(mapStateToProps, { getTraining })(Training)
