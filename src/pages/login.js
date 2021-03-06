
import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { userSignup, userSignin } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css';



function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [userType, setuserType] = useState('CUSTOMER');
    const [userSignupData, setUserSignupData] = useState({});
    const [message, setMessage] = useState('');
    const history = useNavigate();

    const toggleSignup = () => {
        setShowSignup(!showSignup)
    };

    const handleSelect = (e) => {
        setuserType(e)
    };

    //to grab values from signup input fields ,very imp
    const updateSignupData = (e) => {
        userSignupData[e.target.id] = e.target.value;
        console.log(userSignupData);
    }

    const signupFn = (e) => {

        const username = userSignupData.username;
        const userId = userSignupData.userId;
        const email = userSignupData.email;
        const password = userSignupData.password;

        const data = {
            name: username,
            userId: userId,
            email: email,
            userType: userType,
            password: password
        }

        console.log('DATA', data);

        e.preventDefault();


        userSignup(data).then(function (response) {
            // console.log(response);
            if (response.status === 201) {
                history(0);
            }
            if (response.status === 204) {
                history(0);
            }
        })
            .catch(function (error) {
                if (error.response.status === 400) {
                    setMessage(error.response.data.message)
                } else {
                    console.log(error)
                }
            });
    };


    const loginFn = (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const password = document.getElementById('password').value;

        const data = {
            userId: userId,
            password: password
        }

        userSignin(data)
            .then(function (response) {
                console.log(response);//will console the response 
                if (response.status === 200) {

                    //localstorage to store the data we get in response once user slog's in
                    //with the help of 'access token' user can navigate respective pages and redirected too
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('userTypes', response.data.userTypes);
                    localStorage.setItem('userStatus', response.data.userStatus);
                    localStorage.setItem('token', response.data.accessToken);


                    if (response.data.userTypes === 'CUSTOMER') {
                        history('/customer');
                    } else if (response.data.userTypes === 'ENGINEER') {
                        history('/engineer');
                    } else {
                        history('/admin');
                    }
                }
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    setMessage(error.response.data.message);
                } else {
                    console.log(error)
                }
            });
        // console.log('login SUCESSFULL;')
    };


    return (
        <div className='body bg-dark d-flex justify-content-center align-items-center vh-100'>
            <div className='card m-5 p-5 bg-dark border border-light'>
                <div className='row'>
                    <div className='col'>
                        {!showSignup ? (<div className='login-container'>
                            <div className='login '>
                                <h1 className='text-light p-2 mb-4 text-center' >LOGIN</h1>
                                <form onSubmit={loginFn}>
                                    <div className='input-group m-1 p-2'>
                                        <input type='text'
                                            className='form-control'
                                            placeholder='User Id'
                                            id='userId' />
                                    </div>
                                    <div className='input-group m-1 p-2'>
                                        <input type='password'
                                            className='form-control'
                                            placeholder='password'
                                            id='password' />
                                    </div>
                                    <div className='input-group my-4 mx-0 '>
                                        <input type='submit'
                                            className='form-control btn  btn-dark border border-light'
                                            value='Log In' />
                                    </div>
                                    <div className='text-info text-center ' onClick={toggleSignup}>
                                        <p>Dont have an account <u><a href="#" className=" pe-auto text-decoration-none text-info">SIGN UP!</a></u></p>
                                    </div>
                                </form>
                            </div>
                        </div>) : (<div className='signup '>
                            <h1 className='text-light p-2 mb-4 text-center'>SIGN UP ????</h1>

                            <form onSubmit={signupFn}>


                                <div className='input-group m-1 p-2'>
                                    <input type='text'
                                        className='form-control'
                                        id='username'
                                        placeholder='User Name'
                                        onChange={updateSignupData} />
                                </div>
                                <div className='input-group m-1 p-2'>
                                    <input type='text'
                                        className='form-control'
                                        id='userId' placeholder='User Id' onChange={updateSignupData} />
                                </div>

                                <div className='input-group m-1 p-2'>
                                    <input type='text'
                                        className='form-control'
                                        id='email' placeholder='Email' onChange={updateSignupData} />
                                </div>

                                <div className='input-group m-1 p-2'>
                                    <input type='password'
                                        className='form-control'
                                        id='password'
                                        placeholder='password'
                                        onChange={updateSignupData} />
                                </div>

                                <div className='input-group m-2'>
                                    <span className='text-muted m-1'>USER TYPE :</span>
                                    <DropdownButton
                                        align='end'
                                        title={userType}
                                        variants='light'
                                        className='mx-2 my-2'
                                        onSelect={handleSelect}>
                                        <Dropdown.Item eventKey='CUSTOMER'>CUSTOMER</Dropdown.Item>
                                        <Dropdown.Item eventKey='ENGINEER'>ENGINEER</Dropdown.Item>
                                    </DropdownButton>
                                </div>

                                <div className='input-group my-4 mx-0'>
                                    <input type='submit'
                                        className='form-control btn  btn-dark border-light'
                                        value='Sign Up' />
                                </div>

                                <div className=' text-center text-info ' onClick={toggleSignup}>
                                    <p>Already have an account
                                        <u>
                                            <a href="#"
                                                className=" pe-auto 
                                                text-decoration-none 
                                                text-info"> LOGIN </a>
                                        </u>
                                    </p>
                                </div>
                                <div className='text-danger'>{message}</div>
                            </form>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;