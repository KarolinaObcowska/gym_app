import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    height:'',
    weight:'',
    gender: '',
    age: '',
    rate: ''
}

const HarrisBenedict = () => {
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
                        (9.6 * Math.ceil(weight)) + 
                        (1.8 * Math.ceil(height)) - 
                        (4.7 * Math.ceil(age))
                        ) * rate)
                } else if (gender === 'Male' ) {
                    result = "Your result: " + Math.ceil(6 + (
                        (13.7 * Math.ceil(weight)) + 
                        (5 * Math.ceil(height)) - 
                        (6.76 * Math.ceil(age))
                        ) * rate)
                };
            }
        document.getElementById('result').style.display = 'block'
        document.getElementById('harris').innerHTML = result;
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
            <p className='centered text-primary large my-1'> Harris-Benedict Calculator </p>
            <div className='border'></div>
            <p>The Harris Benedict Equation is a formula that uses your BMR and then applies an activity factor to determine your total daily energy expenditure (calories).</p>
            <div style={{ display: 'none'}} id='result'>
                <p className='text-primary my-1 lead' id='harris'></p>
            </div>
            <form className='form calculators'>
                <div className="form-group">
                    <select requirde name="rate" required value={rate} onChange={e => onChange(e)}>
                        <option value="0">Select Activity Level</option>
                        <option value="1.2">No exercise</option>
                        <option value="1.375">Exercise 1 - 2 times/week</option>
                        <option value="1.55">Daily exercise or intense exercise 3-4 times/week	</option>
                        <option value="1.725">Intense exercise 6-7 times/week	</option>
                        <option value="1.9">Very intense exercise daily, or physical job	</option>
                    </select>
                </div>
                <div className="form-group">
                    <select requirde name="gender" required value={gender} onChange={e => onChange(e)}>
                        <option value="0">Select Male or Female</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="form-group">
                        <input type="number" required placeholder="Weight (kg)" name="weight" value={weight} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                        <input type="number" required placeholder="Height (cm)" name="height" value={height} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                        <input type="number" required placeholder="Age" name="age" value={age} onChange={e => onChange(e)}/>
                </div>
                <button onClick={onClick}type="submit" className="btn btn-primary my-1">Calculate</button>
            </form>
        </Fragment>
    )
}

export default HarrisBenedict
