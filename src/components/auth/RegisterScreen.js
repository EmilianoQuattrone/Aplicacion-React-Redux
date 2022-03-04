import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterNameEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    // console.log(msgError);

    const [values, handleInputChange] = useForm({

        nombre: 'Pedro',
        email: 'pedro@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { nombre, email, password, password2 } = values;

    const handleRegister = (e) => {

        e.preventDefault();

        if (isFormValid()) {

            // console.log('Formulario correcto');
            dispatch(startRegisterNameEmailPassword(email, password, nombre));
        }
    }

    const isFormValid = () => {

        if (nombre.trim().length === 0) {

            dispatch(setError('El nombre es requerido.'));
            return false;

        } else if (!validator.isEmail(email)) {

            dispatch(setError('El email no es valido.'));
            return false

        } else if (password.length <= 4) {

            dispatch(setError('La contraseña tiene que tener mas de 4 digitos'));
            return false;

        } else if (password !== password2) {

            dispatch(setError('Las contraseñas no coinciden.'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (

        <div>
            <h3>Register</h3>

            <form onSubmit={handleRegister}>

                {
                    msgError ?

                        (<div>
                            {msgError}
                        </div>)
                        :
                        (<div>

                        </div>)
                }

                <input
                    className='login__input'
                    type="text"
                    placeholder='Nombre'
                    name='nombre'
                    value={nombre}
                    autoComplete='off'
                    onChange={handleInputChange}
                />

                <input
                    className='login__input'
                    type="text"
                    placeholder='Email'
                    name='email'
                    value={email}
                    autoComplete='off'
                    onChange={handleInputChange}
                />

                <input
                    className='login__input'
                    type="password"
                    placeholder='Contraseña'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    className='login__input'
                    type="password"
                    placeholder='Confirmar contraseña'
                    name='password2'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button className='btn btn-primary btn-block' type='submit'> Login </button>

                <hr />

                <Link className='link mt-5' to="/auth/login"> ¿Estas registrado? </Link>

            </form>

        </div>
    )
}