import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('');

    const onSignIn = async (e) => {
        e.preventDefault();
        //validate email and password
       
        if (!email.includes("@")) {
            setError('Email must include an @');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setError('Incorrect password');}
        
        else {
            // Send request to server
            let URL = "http://localhost/api/v1/login";
            const response = await axios.post('http://localhost/api/v1/login',  {
                email: email,
                password: password,
              }, {})
                .then(function(response) {
                    console.log(response.data)
                    setError('');
                    navigate('/Home');
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    };

    const onEmailChange = async (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = async (e) => {
        setPassword(e.target.value);
    };

    const onSignUp = () => {
        navigate("/sign-up");
    };

    return (
        <div className="container-md">
            <div className="row m-3 justify-content-center">
                <h1 className="text-center my-5">SIGN IN</h1>
            </div>
            <div className="row m-3 justify-content-center">
                <div className="col-sm-6">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Email address" 
                            onChange={onEmailChange} required 
                        />
                        <label for="floatingInput">Email Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password" 
                            onChange={onPasswordChange} required
                        />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="row mb-3 px-3">
                        <input 
                            type="submit"
                            onClick={onSignIn}
                            className="btn btn-primary"
                            value="Login"
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}

                    <div className="sign-up">
                        <label>Don't have Account?</label>{" "}
                        <label
                            type="button"
                            className="text-decoration-underline"
                            onClick={onSignUp}
                        >
                            Sign Up
                        </label>
                        <div>
                        <a className="forgot" href="/forgot-password">Forgot Email or Password?</a>
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        
       
    );
     
};

export default SignIn;