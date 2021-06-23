import React, { Fragment, useState }from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addGoalCard, getCurrentUser } from '../../actions/user';


const INITIAL_STATE = {
    actualWeight: '',
    goalWeight: '',
    height: '',
    kcal: '',
    trainingRate: '',
    steps: ''
}
const AddGoalCard = ({ addGoalCard, history }) => {


    const [formData, setFormData] = useState(INITIAL_STATE);

    
    const { actualWeight, goalWeight, height, kcal, trainingRate, steps } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData)
        addGoalCard(formData, history)
    }

    return (
        <Fragment>
            <h1 className="centered large text-primary"> Add Your Goal </h1>
            <div className='border'></div>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="number" placeholder="Actual weight (kg)" name="actualWeight" required value={actualWeight} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Goal weight (kg)" name="goalWeight" required value={goalWeight} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Height (cm)" name="height" value={height} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Kcal" name="kcal" required value={kcal} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Training per week" name="trainingRate" value={trainingRate} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="Steps" name="steps" value={steps} onChange={e => onChange(e)}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" value='Send' />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddGoalCard.propTypes = {
 addGoalCard: PropTypes.func.isRequired,
 getCurrentUser: PropTypes.func.isRequired,
 user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { addGoalCard, getCurrentUser})(withRouter(AddGoalCard))
