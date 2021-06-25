import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExercise } from '../../../actions/training';

const INITIAL_STATE = {
    name: '',
    reps: '',
    series: ''
}

const ExerciseForm = ({ addExercise, trainingId }) => {
    const [formData, setFormData] = useState(INITIAL_STATE)
    const { name, reps, series } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        addExercise(trainingId, formData);
        setFormData(INITIAL_STATE);
    }

    return (
        <Fragment>
            <form class="calculators form my-1" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input
                    name='name'
                    required
                    type='text'
                    placeholder='Exercise name'
                    value={name}
                    onChange={e => onChange(e)}
                    >
                    </input>
                </div>
                <div className="form-group">
                    <input
                        name='series'
                        required
                        type='number'
                        placeholder='Series'
                        value={series}
                        onChange={e => onChange(e)}
                        >
                        </input>
                </div >           
                <div className="form-group">
                    <input
                        name='reps'
                        required
                        type='number'
                        placeholder='Reps'
                        value={reps}
                        onChange={e => onChange(e)}
                        >
                    </input>
                </div>     
                <input type="submit" class=" btn btn-light my-1" value="Submit" />
            </form>
        </Fragment>
    )
}

ExerciseForm.propTypes = {
    addExercise: PropTypes.func.isRequired,
}

export default connect(null, { addExercise, })(ExerciseForm)
