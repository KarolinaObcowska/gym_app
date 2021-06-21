import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    height:'',
    weight:'',
    gender: '',
    age: '',
}

const Bmr = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { height, weight, age, gender } = formData;

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
        if (gender ==='' || weight === '' || height === '' || age === ''
            || isNaN(weight) || isNaN(height) || isNaN(age)) {
                result = 'Provide a valid data!'
            } else {
                if (gender === 'Female' ) {
                    result = 'Your BMR: ' + Math.ceil(655 + (
                        (9.6 * Math.ceil(weight)) + 
                        (1.8 * Math.ceil(height)) - 
                        (4.7 * Math.ceil(age))
                        ))
                } else if (gender === 'Male' ) {
                    result = 'Your BMR: ' + Math.ceil(66 + (
                        (13.7 * Math.ceil(weight)) + 
                        (5 * Math.ceil(height)) - 
                        (6.8 * Math.ceil(age))
                        ))
                };
            }
        document.getElementById('result').style.display = 'block'
        document.getElementById('bmr').innerHTML = result;
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
            <p className='text-primary large my-1'> BMR Calculator </p>
            <p>The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive. 
                It is the equivalent of figuring out how much gas an idle car consumes while parked.</p><br />
            <div style={{ display: 'none'}} id='result'>
                <p className='text-primary my-1 lead' id='bmr'></p>
            </div>
            <form className='form'>
                <div className="form-group">
                    <select name="gender" required value={gender} onChange={e => onChange(e)}>
                        <option value="0">Select Male/Female</option>
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

export default Bmr
