import React from 'react'
import PropTypes from 'prop-types'

const UserTop = ({ user : { location, social, name, bio }}) => {
    return (
        <div className="profile-top bg-primary p-2 my-1">
          <h1 className="large">{name}</h1>
          <p><span>{location}</span></p>
          <p><span>{bio}</span></p>
          <div className="icons my-1">
            {
                social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )
            }
            {
                social && social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )
            }
            {
                social && social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )
            }
          </div>
        </div>
    )
}

UserTop.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserTop
