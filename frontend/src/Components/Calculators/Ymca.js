import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    waist:'',
    weight:'',
    gender: '',
}

const Ymca = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { waist, weight, gender } = formData;

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
        if (waist === '' || isNaN(waist) || weight === '' || isNaN(weight) || gender === '') {
            result = 'Provide a valid data!'
        } else {
            if (gender === 'Female' ) {
                result = "Your Body Fat: " + Math.ceil((
                    (4.15 * waist) - (0.082 * weight) - 76.76)/weight * 100)/10 + '%';
            } else if (gender === 'Male' ) {
                result = "Your Body Fat: " + Math.ceil(((4.15 * waist) -
                    (0.082 * weight) - 98.42)/weight * 100)/10 + '%'
            };
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
                        <input type="number" required placeholder="Weight (kg)" name="weight" value={weight} onChange={e => onChange(e)}/>
                </div>
                <button onClick={onClick}type="submit" className="btn btn-primary my-1">Calculate</button>
            </form>
            <table className=' table my-1'>
                    <thead>
                        <tr>
                            <th>BFP Category</th>
                            <th>Women</th>
                            <th>Men</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Essential Fat precent</td>
                            <td>10 - 13%</td>
                            <td>2 - 5%</td>
                        </tr>
                        <tr>
                            <td>Fat Percent for Athletes</td>
                            <td>14 - 20%</td>
                            <td>6 - 13%</td>
                        </tr>
                        <tr>
                            <td>Fitness Level</td>
                            <td>21 - 24%</td>
                            <td>14 - 17%</td>
                        </tr>
                        <tr>
                            <td>Average Level</td>
                            <td>25 - 31%</td>
                            <td>18 - 24%</td>
                        </tr>
                        <tr>
                            <td>Obese Level</td>
                            <td>&gt; 32%</td>
                            <td>&gt; 25%</td>
                        </tr>

                    </tbody>
                </table>
        </Fragment>
    )
}

export default Ymca
