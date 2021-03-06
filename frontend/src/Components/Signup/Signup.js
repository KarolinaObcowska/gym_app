import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { signup } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ setAlert, signup, isAuthenticated }) => {
    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    
    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Password do not match', 'danger' )
        } else {
            signup({name, email, password})
        }
    };
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1 className="centered large text-primary">Sign Up</h1>
            <div className='border'></div>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name} 
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={email} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="8"
                        value={password} 
                        onChange={e => onChange(e)}
                        required
                     />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="8"
                    value={password2} 
                    onChange={e => onChange(e)}
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="centered my-1">
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    )
};

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});



export default connect(mapStateToProps, { setAlert, signup })(Signup)
