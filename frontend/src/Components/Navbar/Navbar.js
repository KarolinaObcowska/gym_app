import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const isAuthLink = (
    <ul>
      <li>
          <Link to='/calculators'>
          <i className="fas fa-calculator"></i>{' '}
            <span className='hide-sm'>Calculators</span>
          </Link>
      </li>
      <li>
          <Link to='/trainings'>
          <i className="fas fa-dumbbell"></i>{' '}
          <span className='hide-sm'>Trainings</span>
          </Link>
      </li>
      <li>
          <Link to='/dashboard'>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'> My account </span>
          </Link>
      </li>
      <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
          <Link to='/calculators'>
            Calculators
          </Link>
      </li>
      <li>
          <Link to='/signup'>SignUp</Link>
      </li>
      <li>
          <Link to='/login'>Login</Link>
      </li>
    </ul>
  )
    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
            <i className="fas fa-code"></i> FitManagement
        </Link>
      </h1>
      { !loading && <Fragment> { isAuthenticated ? isAuthLink : guestLinks} </Fragment> }
    </nav>
    )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
