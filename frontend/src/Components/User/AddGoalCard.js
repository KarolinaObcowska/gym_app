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
}
const AddGoalCard = ({ addGoalCard, history }) => {


    const [formData, setFormData] = useState(INITIAL_STATE);

    
    const { actualWeight, goalWeight, height, kcal, trainingRate } = formData;

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
            <h1 className="large text-primary"> Add Your Goal </h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <p>Actual weight: </p>
                    <input type="number" placeholder="Actual weight (kg)" name="actualWeight" required value={actualWeight} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p>Goal weight: </p>
                    <input type="number" placeholder="Goal weight (kg)" name="goalWeight" required value={goalWeight} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p>Height: </p>
                    <input type="number" placeholder="Height (cm)" name="height" value={height} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p>Kcal: </p>
                    <input type="number" placeholder="Kcal" name="kcal" required value={kcal} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p>Trainings per week: </p>
                    <input type="number" placeholder="Training per week" name="trainingRate" value={trainingRate} onChange={e => onChange(e)}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
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
