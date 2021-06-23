import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardActions = () => {
    return (
        <div className='dash-buttons my-1'>
            <Link to='/edit-account' className='btn btn-dark'>
                <p>
                <i className='fas fa-user-circle text-primary'></i>{' '}
                Edit profile
                </p>
            </Link>
            <Link to='/add-goalcard' className='btn btn-dark'>
                <p>
                <i className='fas fa-user-circle text-primary'></i>{' '}
                    Add goal Card
                </p>
            </Link>
        </div>
    )
}

export default DashboardActions;