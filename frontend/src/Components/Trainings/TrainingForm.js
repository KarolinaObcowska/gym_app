import React , { useState, Fragment }from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTraining } from '../../actions/training';

const INITIAL_STATE = {
    name: '',
    date: '',
    description: '',
    tags:''
}
const TrainingForm = ({ createTraining }) => {

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [displayTrainingInputs, toggTrainingInputs] = useState(false);
    const { name, date, tags, description } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        createTraining(formData);
        setFormData('');
    }
    return (
        <Fragment>
            <div className="my-2">
                <button onClick={() => toggTrainingInputs(!displayTrainingInputs)}type="button" className="btn btn-light">Add new training</button>
            </div>
                <form class="form my-1 centered" onSubmit={e => onSubmit(e)}>
                {displayTrainingInputs && <Fragment>
                    <div className="form-group">
                        <input
                            name="name"
                            type='text'
                            placeholder="Workout name"
                            required 
                            value={name}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            type='text'
                            placeholder="Description"
                            rows='3'
                            required 
                            value={description}
                            onChange={e => onChange(e)}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <input
                            name="tags"
                            type='text'
                            placeholder="Tags"
                            required 
                            value={tags}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <div className="form-group">
                        <input
                            name="date"
                            placeholder="Training's date"
                            required
                            type='date'
                            value={date}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <input type="submit" class="btn btn-dark my-1" value="Submit" />
                    </Fragment>}
                </form>
        </Fragment>
    )
}

TrainingForm.propTypes = {
    createTraining: PropTypes.func.isRequired,
}

export default connect(null, { createTraining })(TrainingForm)
