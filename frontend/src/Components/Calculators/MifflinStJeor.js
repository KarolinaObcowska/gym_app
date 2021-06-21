import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    height:'',
    weight:'',
    gender: '',
    age: '',
    rate: ''
}

const MifflinStJeor = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { height, weight, age, gender, rate } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onClick = (e) => {
        e.preventDefault();
        showMessage();
        clearMessage();
    }
    const showMessage = () => {
        let result;
        if ( age === '' || isNaN(age) || weight === '' || isNaN(weight) ||
            height === '' || isNaN(height) || gender === '' || rate === '') {
                result = 'Provide a valid data!'
            } else {
                if (gender === 'Female' ) {
                    result = "Your result: " + Math.ceil(655 + (
                        (10 * weight) + (6.35 * height) - (5 * age)- 161) * rate)
        } else if (gender === 'Male' ) {
            result = "Your result: " +  Math.ceil(6 + (
                (10 * weight) + (6.25 * height) - (5 * age) + 5) * rate)
        };
    }
        document.getElementById('result').style.display = 'block'
        document.getElementById('mifflin').innerHTML = result;
    }
    const clearMessage = () => {
        setTimeout(() => {
            document.getElementById('result').style.display = 'none';
            setFormData(INITIAL_STATE);
        }, 4000)
    }
    return (
        <Fragment>
            <Calculators />
            <p className='text-primary large my-1'> Mifflin-St Jeor Calculator </p>
            <p>Mifflin St. Jeor Calculator, the formula can be located under the calculator. The Mifflin-St Jeor Equation calculates your basal metabolic rate (BMR), and its results are based on an estimated average. 
                Basal metabolic rate is the amount of energy expended per day at rest.</p>
            <div style={{ display: 'none'}} id='result'>
                <p className='text-primary my-1 lead' id='mifflin'></p>
            </div>
            <form className='form'>
                <div className="form-group">
                    <select requirde name="rate" required value={rate} onChange={e => onChange(e)}>
                    <option value="0">Select Activity Level</option>
                        <option value="1.2">No exercise</option>
                        <option value="1.37">Exercise 1 - 2 times/week</option>
                        <option value="1.55">Daily exercise or intense exercise 3-4 times/week	</option>
                        <option value="1.72">Intense exercise 6-7 times/week	</option>
                        <option value="1.9">Very intense exercise daily, or physical job	</option>
                    </select>
                </div>
                <div className="form-group">
                    <select requirde name="gender" required value={gender} onChange={e => onChange(e)}>
                        <option value="0">Select Female or Male</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="form-group">
                    <p className='text-primary'><strong>Weight: </strong></p>
                        <input type="number" required placeholder="weight" name="weight" value={weight} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p className='text-primary'><strong>Height: </strong></p>
                        <input type="number" required placeholder="height" name="height" value={height} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p className='text-primary'><strong>Age: </strong></p>
                        <input type="number" required placeholder="Age" name="age" value={age} onChange={e => onChange(e)}/>
                </div>
                <button onClick={onClick}type="submit" className="btn btn-primary my-1">Calculate</button>
            </form>
        </Fragment>
    )
}

export default MifflinStJeor
