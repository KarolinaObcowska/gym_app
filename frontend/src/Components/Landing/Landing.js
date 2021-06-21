import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return (
        <Fragment>
            <section className="landing">
                <BackgroundVideo />
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Personal Training Management</h1>
                        <p className="lead">
                        Sign Up to manage your trainings.
                        </p>
                        <div className="buttons">
                            <Link to='/signup' className="btn btn-primary">Sign Up</Link>
                            <Link to='/login' className="btn btn-light">Login</Link>
                        </div>
                    </div>
                </div>
    </section>
    </Fragment>
    );
};
Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
