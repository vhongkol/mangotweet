import { useState } from "react";
import { useNavigate } from "react-router-dom";


import axios from 'axios';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
   


     {
    
        
        console.log("send this data");
        console.log(email);
        console.log(code);
        console.log(password);
        console.log(confirmPass);
       

        let URL = "http://localhost/api/v1/register";
      const response =  axios.post('http://localhost/api/v1/register',  {
        email: email,       
        code:code,
        password: password,
        confirmPass:confirmPass,
        
      }, {})

   
 
    .then(function(Response) {
        console.log(Response.data)
    })
    .catch(function(error) {
        console.log(error.response.data.data.error)
    });


   // navigate("/");

};
       

    const onCreate = async (e) => {
        if (
            email != "" &&
            code != "" &&
            password != "" &&
            confirmPass != "" &&
            ""
            
        ) {
            /* navigate("/sign-in");
            alert("Created Successfully");*/
        } {
           
        }
    };
    const handleChange = async (e) => {};
    const onSignIn = () => {
        navigate("/sign-in");
    };

    
    return (
        <div className="container-md">
            <div className="row m-3 justify-content-center">
                <h1 className="text-center my-5">Reset Password</h1>
            </div>
            <div className="row m-3 justify-content-center">
                <div className="col-sm-6">
                    <div className=" mb-3">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Code</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>
                   
                    </div>
                    <div className="sign-up">
                      
                        <label
                            type="button"
                            className="btn btn-primary"
                            onClick={onSignIn}
                        >
                            Reset Password
                        </label>
                    </div>
                </div>
            </div>
        
    );
    
};




export default ResetPassword;
