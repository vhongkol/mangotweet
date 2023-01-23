import React from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword () {

    const navigate = useNavigate();
    const onResetPassword = async (e) => {
        navigate("/reset-password");
    };
    return (
        
        <div className="container-md">
        <div className="row m-3 justify-content-center">
            <h1 className="text-center my-5">Forgot Password</h1>
        </div>
        <div className="row m-3 justify-content-center">
            <div className="col-sm-6">
                <div className=" mb-3">
               
                    
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                />
                
                     <div className="row mb-3 px-3">
                      <input 
                     type="submit"
                     className="btn btn-primary"
                     onClick={onResetPassword}
                     value="Send Code"
                />
                      </div>
                      </div>
        
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
