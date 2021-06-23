import React from 'react'
import { Link } from 'react-router-dom'

export const Calculators = () => {
    return (
        <div className='block'>
            <ul>
                <li>
                    <Link to='/calculators/bmi' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator BMI
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/calculators/whr' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator WHR
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/calculators/broc-brugsh' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator Broca - Brugsha
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/calculators/lorenz' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator Lorenza
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/calculators/ymca' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator YMCA
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/calculators/bmr' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator BMR
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/calculators/harris-benedict' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator Harrisa-Benedicta
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/calculators/mifflin-st-jeor' className='btn btn-dark my-1'>
                        <p>
                            <i className='fas fa-user-circle text-primary'></i>{' '}
                                Kalkulator Mifflina-St Jeor
                        </p>
                    </Link>
                </li>
            </ul>
            <br />
            <hr />
        </div>
    )
}

export default Calculators;