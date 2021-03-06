import React, { Fragment, useEffect }from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTrainings } from '../../actions/training'
import TrainingItem from './TrainingItem'
import TrainingForm from './TrainingForm'

const Trainings = ({ getTrainings, training: { trainings } }) => {
    useEffect(() => {
        getTrainings()
    }, [getTrainings])
    return (
        <Fragment>
            <h1 className="large text-primary">Your trainings</h1>
        
            <TrainingForm />
            <div className='trainings'>
                    {trainings.map((training) => (
                        <TrainingItem key={training._id} training={training} />
                    ))}
            </div>
        </Fragment>
    )
}

Trainings.propTypes = {
    getTrainings: PropTypes.func.isRequired,
    training: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    training: state.training
})

export default connect(mapStateToProps, { getTrainings })(Trainings)
