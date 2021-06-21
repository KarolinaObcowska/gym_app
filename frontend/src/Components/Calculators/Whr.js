import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    waist:'',
    hip:'',
    gender: '',
}

const Whr = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { waist, hip, gender } = formData;

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
        if (gender === '' || hip === '' || isNaN(hip) || waist === '' || isNaN(waist)) {
            result = 'Provide a valid data!'
        } else {
            result = "Your waist-to-hip raio: " + waist/hip;
        }
        document.getElementById('result').style.display = 'block'
        document.getElementById('ymca').innerHTML = result;
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
            <p className='centered text-primary large my-1'> YMCA Body Fat Percentage Calculator </p>
            <div className='border'></div>

            <p>This calculator uses the formula developed by the YMCA to estimate your body fat percentage without calipers. Use a tape measure and enter your waist measurement. 
                Combine the waist measurement with your gender and weight and this calculator will estimate your percent of body fat, how much of your weight is lean mass and how much is fat mass, and your general fitness category.</p>
            <div style={{ display: 'none'}} id='result'>
                <p className='text-primary my-1 lead' id='ymca'></p>
            </div>
            <form className='form calculators'>
            <div className="form-group">
                    <select requirde name="gender" required value={gender} onChange={e => onChange(e)}>
                        <option value="0">Select Male or Female</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="form-group">
                        <input type="number" required placeholder="Waist size (cm)" name="waist" value={waist} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                        <input type="number" required placeholder="Hip size 9cm)" name="hip" value={hip} onChange={e => onChange(e)}/>
                </div>
                <button onClick={onClick}type="submit" className="btn btn-primary my-1">Calculate</button>
            </form>
            <table className=' table my-1'>
                    <thead>
                        <tr>
                            <th>Women</th>
                            <th>Men</th>
                            <th>Health Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0.80 or lower</td>
                            <td>0.95 or lower</td>
                            <td>Low health risk</td>
                        </tr>
                        <tr>
                            <td>0.81 - 0.84</td>
                            <td>0.96 - 1.0</td>
                            <td>Moderate risk</td>
                        </tr>
                        <tr>
                            <td>0.85 or higher</td>
                            <td>1.0 or higher</td>
                            <td>High risk</td>
                        </tr>
                    </tbody>
                </table>
        </Fragment>
    )
}

export default Whr
