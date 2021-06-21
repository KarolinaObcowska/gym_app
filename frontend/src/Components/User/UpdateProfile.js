import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, getCurrentUser } from '../../actions/user';

const INITIAL_STATE = {
    location: '',
    bio: '',
    twitter: '',
    facebook: '',
    instagram: ''
}

const UpdateProfile = ({ user: { user, loading }, getCurrentUser, updateProfile, history }) => {
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        if (!user) getCurrentUser();
        if (!loading && user) {
          const profileData = { ...INITIAL_STATE };
          for (const key in user) {
            if (key in profileData) profileData[key] = user[key];
          }
          for (const key in user.social) {
            if (key in profileData) profileData[key] = user.social[key];
          }
          setFormData(profileData);
        }
      }, [loading, getCurrentUser, user]);
    
    const { bio, location, twitter, facebook, instagram } = formData;
    
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData)
        updateProfile(formData, history)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Update Your Account
            </h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <p className='text-primary'><strong>Bio</strong></p>
                    <textarea type="text" placeholder="bio" name="bio" value={bio} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <p className='text-primary'><strong>Location</strong></p>
                    <input type="text" placeholder="location" name="location" value={location} onChange={e => onChange(e)}/>
                </div>
                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)}type="button" className="btn btn-light">Add Social Network Links</button>
                    
                </div>
                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
                    </div>
                </Fragment>}

                
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard" >Go Back</Link>
            </form>
        </Fragment>
    )
}

UpdateProfile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps, { updateProfile, getCurrentUser })(withRouter(UpdateProfile))
