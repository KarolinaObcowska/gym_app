import React , { useState }from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTraining } from '../../actions/training';

const INITIAL_STATE = {
    name: '',
    date: ''
}
const TrainingForm = ({ createTraining }) => {

    const [formData, setFormData] = useState(INITIAL_STATE);
    const { name, date } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        createTraining(formData);
        setFormData('');
    }
    return (
            <div class="post-form">
                <div class="bg-primary p">
                <h3>Add Training</h3>
            </div>
            <form class="form my-1" onSubmit={e => onSubmit(e)}>
                <input
                    name="name"
                    placeholder="Traning's name"
                    required 
                    value={name}
                    onChange={e => onChange(e)}>
                </input>
                <input
                    name="date"
                    placeholder="Training's date"
                    required
                    type='date'
                    value={date}
                    onChange={e => onChange(e)}>
                </input>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
      </div>
    )
}

TrainingForm.propTypes = {
    createTraining: PropTypes.func.isRequired,
}

export default connect(null, { createTraining })(TrainingForm)
