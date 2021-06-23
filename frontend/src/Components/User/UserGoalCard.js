import React from 'react'
import PropTypes from 'prop-types'

const UserGoalCard = ({ goalCard }) => {
    return (
        <div>    
            <h4> 
                <strong> Actual weight: </strong> { goalCard.actualWeight}
            </h4>
            <h4>
                <strong> Goal weight: </strong> {goalCard.goalWeight}
            </h4>
            <h4>
                <strong> Height: </strong> {goalCard.height}
            </h4>
            <h4>
                <strong> Kcal: </strong> {goalCard.kcal}
            </h4>
            <h4>
                <strong> Trainings per week: </strong> {goalCard.trainingRate}
            </h4>
            <h4>
                <strong> Steps: </strong> {goalCard.steps}
            </h4>
        </div>
                
    )
    
}

UserGoalCard.propTypes = {
    goalCard: PropTypes.array.isRequired,
}

export default UserGoalCard
