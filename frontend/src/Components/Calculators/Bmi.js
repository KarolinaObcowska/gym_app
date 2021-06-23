import React, { Fragment, useState }from 'react'
import Calculators from './Calculators'

const INITIAL_STATE = {
    height:'',
    weight:''
}

const Bmi = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { height, weight } = formData;

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
        if (height === '' || isNaN(height) || weight === '' || isNaN(weight)) {
            result = 'Provide a valid data!'
        } else {
            result = 'Your BMI: ' + Math.ceil(Math.round(weight)/Math.pow(height, 2) * 10000);
        };
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
            <p className='centered text-primary large my-1'> BMI Calculator </p>
            <div className='border'></div>
            <p>BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. 
                It is widely used as a general indicator of whether a person has a healthy body weight for their height.</p>
            <br />
            <div style={{ display: 'none'}} id='result'>
                <p className='text-primary my-1 lead' id='bmi'></p>
            </div>
            <form className='form calculators'>
                <div className="form-group">
                        <input type="number" required placeholder="Weight (kg)" name="weight" value={weight} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                        <input type="number" required placeholder="Height (cm)" name="height" value={height} onChange={e => onChange(e)}/>
                </div>
                <button onClick={onClick}type="submit" className="btn btn-primary my-1">Calculate</button>
            </form>
            <div className='centered my-2'>
                <table className='table my-1'>
                    <thead>
                        <tr>
                            <th>BMI Range</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> &gt; 16 </td>
                            <td>Severe Thinness</td>
                        </tr>
                        <tr>
                            <td> &gt; 16 - 17 </td>
                            <td>Moderate Thinness</td>
                        </tr>
                        <tr>
                            <td> &gt; 17 - 18.5  </td>
                            <td>Mild Thinness</td>
                        </tr>
                        <tr>
                            <td>18.5 - 25</td>
                            <td>Normal</td>
                        </tr>
                        <tr>
                            <td>25 - 30</td>
                            <td>Overweight</td>
                        </tr>
                        <tr>
                            <td>30 - 35</td>
                            <td>Obese class I</td>
                        </tr>
                        <tr>
                            <td>35 - 40 </td>
                            <td>Obese Class II</td>
                        </tr>
                        <tr>
                            <td>40  &lt;</td>
                            <td>Obese Class III</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </Fragment>
    )
}

export default Bmi
