import React, { useState } from 'react';
import axios from 'axios';
import {Link , useNavigate} from 'react-router-dom';

export default function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Redirect to homepage or previous page after successful signin
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>sign in </h1>
                </div>
                <div>
                    <label htmlFor="email">email adress</label>
                    <input type="email" id="email" placeholder='Enter Email' required onChange={(e) =>setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" placeholder='Enter password' required onChange={(e) =>setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    New customer?{' '}
                    <Link to="/register">Create New Account</Link>
                </div>
            </form>
        </div>
    )
}