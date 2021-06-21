import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    height:'',
    gender: ''
}

const Lorenz = () => {
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
                result = "Your ideal weight: " + height - 100 - (height - 150)/2
            } else if (gender === 'Male' ) {
                result = "Your ideal weight: " + height - 100 - (height - 150)/4
            };
        }
        document.getElementById('result').style.display = 'block'
        document.getElementById('bmi').innerHTML = result;
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
            <p className='text-primary large my-1'> Lorenz Calculator </p>
            <div style={{ display: 'none'}} id='result'>
                <p className='text-primary my-1 lead' id='bmi'></p>
            </div>
            <form className='form'>
                <div className="form-group">
                    <select requirde name="gender" required value={gender} onChange={e => onChange(e)}>
                        <option value="0">Select Male/Female</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="form-group">
                    <p className='text-primary'><strong>Height: </strong></p>
                        <input type="number" required placeholder="height" name="height" value={height} onChange={e => onChange(e)}/>
                </div>
                <button onClick={onClick}type="submit" className="btn btn-primary my-1">Calculate</button>
            </form>
        </Fragment>
    )
}

export default Lorenz
