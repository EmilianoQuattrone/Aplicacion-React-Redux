import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    //React-redux
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);
    // console.log(loading);

    const [values, handleInputChange] = useForm({

        email: 'pedro@gmail.com',
        password: '123456'
    });

    const { email, password } = values;

    const handleLogin = (e) => {

        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogle = () => {

        dispatch(startGoogleLogin());
    }

    return (

        <>
            <h3>Login</h3>

            <form onSubmit={handleLogin}>

                <input
                    className='login__input'
                    type="text"
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className='login__input'
                    type="password"
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />

                <button className='btn btn-primary btn-block' type='submit' disabled={loading}> Login </button>

                <div className='login__social-networks'>

                    <p>Login con google</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogle}
                    >
                        <div className="google-icon-wrapper">

                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>

                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                    <Link className='link mt-5' to="/auth/register"> Crear nueva cuenta </Link>

                </div>

            </form>

        </>
    )
}