import React, { useState } from 'react'
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
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Add exercise</h3>
            </div>
            <form class="form my-1" onSubmit={e => onSubmit(e)}>
            <table> 
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Series</td>
                        <td>Reps</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                            name='name'
                            required
                            value={name}
                            onChange={e => onChange(e)}
                            >
                            </input>
                        </td>
                        <td>
                            <input
                                name='series'
                                required
                                value={series}
                                onChange={e => onChange(e)}
                                >
                            </input>
                        </td>
                        <td>
                            <input
                                name='reps'
                                required
                                value={reps}
                                onChange={e => onChange(e)}
                                >
                            </input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

ExerciseForm.propTypes = {
    addExercise: PropTypes.func.isRequired,
}

export default connect(null, { addExercise })(ExerciseForm)
