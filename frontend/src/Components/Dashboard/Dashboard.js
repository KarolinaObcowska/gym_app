import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner'
import { getCurrentUser, deleteAccount } from '../../actions/user';
import UserGoalCard from '../User/UserGoalCard';
import UserTop from '../User/UserTop'

const Dashboard = ({ deleteAccount, getCurrentUser, auth: { user }, user: { goalCard, loading } }) => {
    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser])
    return (
        loading && user === null ? <Spinner /> :
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user'></i>{'  '}
                Welcome { user && user.name }
            </p>
            { user !== null ? 
            <Fragment>
                <DashboardActions />
                <UserTop user={user} />
                <div className="profile-exp bg-white p-2">
                    {
                        goalCard !== null ?
                            <Fragment>
                                <h2 className='text-primary'>Goal Card</h2>
                                <UserGoalCard goalCard={user.goalCard[0]} />
                            </Fragment>
                        : <h2> You have not yet setup your Goal Card </h2>
                    }
                </div>
                <div className='btn btn-danger my-1' onClick={() => deleteAccount()}>
                    <i className='fas fa-user-minus'></i> Delete My Account
                </div>
            </Fragment> :
            <Fragment>
                <p> You have not yet setup your account, pleace add some information</p>
                <Link to='/edit-account' className='btn btn-primary my-1'>
                    Update account
                </Link>
            </Fragment> }
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
});

export default connect(mapStateToProps, { getCurrentUser, deleteAccount })(Dashboard);
