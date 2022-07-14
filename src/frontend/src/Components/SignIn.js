import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import bootstrap from "bootstrap";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState();
    const onSignIn = async (e) => {
        navigate("/");
    };
    const handleChange = async (e) => {};
    const onSignUp = () => {
        navigate("/sign-up");
    };

    return (
        <div className="container-md">
            <div className="row m-3 justify-content-center">
                <h1 className="text-center my-5">Welcome to PostIT</h1>
            </div>
            <div className="row m-3 justify-content-center">
                <div className="col-sm-6">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Email address"
                        />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
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
                    <div>
                        <label>Don't have Account?</label>{" "}
                        <label
                            type="button"
                            className="text-decoration-underline"
                            onClick={onSignUp}
                        >
                            Sign Up
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
