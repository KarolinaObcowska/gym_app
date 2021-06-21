import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    height: '',
    gender: ''
}

const BorcBrugsh = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { height, gender } = formData;

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
        if (height === '' || isNaN(height) || gender === '') {
            result = 'Provide a valid data!'
        } else {
            if (gender === 'Female' ) {
                result = "Your Ideal Weight: " + 
                    Math.round((height - 100) +
                    (height - 100) * 0.15)
            } else if (gender === 'Male' ) {
                result = "Your Ideal Weight: " + 
                    Math.round((height - 100) - 
                    (height - 100) * 0.1)
            };
        }
        document.getElementById('result').style.display = 'block'
        document.getElementById('borc').innerHTML = result;
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
            <p className='centered text-primary large my-1'> Borc Index Calculator </p>
            <div className='border'></div>
            <p>The Broca Index formed the benchmark for other body calculations in use today but is now considered outdated and usually replaced in practice by the body mass index (BMI).</p>
            <div style={{ display: 'none'}} id='result'>
                <p className='text-primary my-1 lead' id='borc'></p>
            </div>
            <form className='form calculatorss'>
                <div className="form-group">
                    <select requirde name="gender" required value={gender} onChange={e => onChange(e)}>
                        <option value="0">Select Male/Female</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="form-group">
                        <input type="number" required placeholder="Height (cm)" name="height" value={height} onChange={e => onChange(e)}/>
                </div>
                <button onClick={onClick}type="submit" className="btn btn-primary my-1">Calculate</button>
            </form>
        </Fragment>
    )
}

export default BorcBrugsh
