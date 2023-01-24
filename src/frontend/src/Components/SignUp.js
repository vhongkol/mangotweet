import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp =  () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_Password] = useState("");
    const [address, setAddress] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [formErrors, setFormErrors] = useState({});


    
    
        
    const onSignUp = async (e) => {
        e.preventDefault();
    
        // reset form errors
        setFormErrors({});
    
        // validate form inputs
        if (!name) {
            setFormErrors((prevState) => ({
                ...prevState,
                name: "Name is required"
            }));
        }
        if (!username) {
            setFormErrors((prevState) => ({
                ...prevState,
                username: "Username is required"
            }));
        }
        if (!first_name) {
            setFormErrors((prevState) => ({
                ...prevState,
                first_name: "First Name is required"
            }));
        }
        if (!last_name) {
            setFormErrors((prevState) => ({
                ...prevState,
                last_name: "Last Name is required"
            }));
        }
        if (!address) {
            setFormErrors((prevState) => ({
                ...prevState,
                address: "Address is required"
            }));
        }
        if (!email) {
            setFormErrors((prevState) => ({
                ...prevState,
                email: "Email is required"
            }));
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setFormErrors((prevState) => ({
                ...prevState,
                email: "Invalid email address"
            }));
        
        }
        if (!password) {
            setFormErrors((prevState) => ({
                ...prevState,
                password: "Password is required"
            }));
        } else if (password.length < 8) {
            setFormErrors((prevState) => ({
                ...prevState,
                password: "Password must be at least 8 characters long"
            }));
        }
        if (!confirm_password) {
            setFormErrors((prevState) => ({
                ...prevState,
                confirm_password: "Confirm Password is required"
            }));
        }
        if (password !== confirm_password) {
            setFormErrors((prevState) => ({
                ...prevState,
                confirm_password: "Passwords do not match"
            }));
        }
        if (Object.keys(formErrors).length) {
            return;
        }
    
        // form is valid, proceed with making the request to the server
        console.log("sending data");
        console.log(name);
        console.log(username);
        console.log(password);
        console.log(confirm_password);
        console.log(address);
        console.log(first_name);
        console.log(last_name);
    
       
    

        let URL = "http://localhost/api/v1/register";
      const response = await axios.post('http://localhost/api/v1/register',  {
        name: name,  
        username: username,   
        first_name: first_name,
        last_name: last_name,
        address: address,
        email: email,       
        password: password,
        confirm_password: confirm_password,
       
        }, {}).then(function(Response) {
            console.log( Response.data)
         navigate('/sign-in');
        })
        .catch(function(error) {
            console.log( error)
            // console.log(error)
        });

   // navigate("/");

};
       

   
    const handleChange = async (e) => {};
    const onSignIn = () => {
        navigate("/sign-in");
    };
    const onNameChange = async (e) => {
        console.log(e.target.value);
        setName(e.target.value);
      };
    const onEmailChange = async (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
      };
      const onUsernameChange = async (e) => {
        console.log(e.target.value);
        setUsername(e.target.value);
      }; const onPasswordChange = async (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
      };
      const onConfirm_Password = async (e) => {
        console.log(e.target.value);
        setConfirm_Password(e.target.value);
      };
      const onAddressChange = async (e) => {
        console.log(e.target.value);
        setAddress(e.target.value);
      };
      const onFirst_nameChange = async (e) => {
        console.log(e.target.value);
        setFirst_name(e.target.value);
      };
      const onLast_nameChange = async (e) => {
        console.log(e.target.value);
        setLast_name(e.target.value);
      };

      const onFormErrorsChange = async (e) => {
        console.log(e.target.value);
        setFormErrors(e.target.value);
      };


    
    return (
        <div className="container-md">
            <div className="row m-3 justify-content-center">
                <h1 className="text-center my-5">SIGN UP</h1>
            </div>

           
            
            <div className="row m-3 justify-content-center">
                <div className="col-sm-10">
                    <div className=" mb-3">

                    {formErrors.email && <span className="text-danger">{formErrors.email}</span>} 
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                       
                    </div>
                    <div className="mb-3">
                
                       
                        {formErrors.name && <span className="text-danger">{formErrors.name}</span>}
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                    {formErrors.username && <span className="text-danger">{formErrors.username}</span>}
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    {formErrors.password && <span className="text-danger">{formErrors.password}</span>}
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    {formErrors.confirm_password && <span className="text-danger">{formErrors.confirm_password}</span>}
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirm_password}
                            onChange={(e) => setConfirm_Password(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                    {formErrors.address && <span className="text-danger">{formErrors.address}</span>}
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>


                    <div className="mb-3">
                    {formErrors.first_name && <span className="text-danger">{formErrors.first_name}</span>}
                        <input
                            type="email"
                            className="form-control"
                            placeholder="First Name"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                    {formErrors.last_name && <span className="text-danger">{formErrors.last_name}</span>}
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Last Name"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                        />

                       

                   </div><center>
                    <div className="radio">
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                        />
                        <label class="form-check-label" for="exampleRadios1">
                            Male
                        </label>
                    </div>
                    <div class="form-check form-check-inline mb-3">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="male"
                            value="option1"
                        />
                        <label class="form-check-label" for="exampleRadios1">
                            Female
                        </label>
                        </div>
                    </div>
                </center>
                     <div class="col-12 d-flex justify-content-center">
                       <div class="form-check"> 
                            <input class="form-check-input"
                                type="checkbox"
                                  value="" 
                                    id="invalidCheck" 
                                         required>
                                    </input>
                            <label class="form-check-label" for="invalidCheck">
                     <center>Agree to terms and conditions</center>
            </label><br></br>  
                
                 <div className="row mb-3 px-3">
                        <input
                            type="submit"
                            onClick={onSignUp}
                            className="btn btn-primary"
                            value="Create Account"

                            id="female"
                        />
                    </div>
                    <div className="sign-in">
                        
                        
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
               
          
    );
    
};




export default SignUp;
