import React from 'react'
import PropTypes from 'prop-types'

const UserGoalCard = ({ goalCard }) => {
    return (
        <table className='table-goal'>
            <tbody>
                <tr>
                    <td><strong>Actual weight</strong></td>
                    <td>{goalCard.actualWeight} kg</td>
                </tr>
                <tr>
                    <td><strong>Goal weight</strong></td>
                    <td>{goalCard.goalWeight} kg</td>
                </tr>
                <tr>
                    <td><strong>Height</strong></td>
                    <td>{goalCard.height} cm</td>
                </tr>
                <tr>
                    <td><strong>Kcal</strong></td>
                    <td>{goalCard.kcal} kcal</td>
                </tr>
                <tr>
                    <td><strong>Training / week</strong></td>
                    <td>{goalCard.trainingRate}</td>
                </tr>
                <tr>
                    <td><strong>Steps / day</strong></td>
                    <td>{goalCard.steps}</td>
                </tr>
            </tbody>
        </table>
        // <div>    
        //     <h4> 
        //         <strong> Actual weight: </strong> { goalCard.actualWeight}
        //     </h4>
        //     <h4>
        //         <strong> Goal weight: </strong> {goalCard.goalWeight}
        //     </h4>
        //     <h4>
        //         <strong> Height: </strong> {goalCard.height}
        //     </h4>
        //     <h4>
        //         <strong> Kcal: </strong> {goalCard.kcal}
        //     </h4>
        //     <h4>
        //         <strong> Trainings per week: </strong> {goalCard.trainingRate}
        //     </h4>
        //     <h4>
        //         <strong> Steps: </strong> {goalCard.steps}
        //     </h4>
        // </div>
                
    )
    
}

UserGoalCard.propTypes = {
    goalCard: PropTypes.array.isRequired,
}

export default UserGoalCard
