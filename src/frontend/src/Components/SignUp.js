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


        
    const onSignUp = async (e) => {
    
        
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
         navigate('/sign-up');
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


    
    return (
        <div className="container-md">
            <div className="row m-3 justify-content-center">
                <h1 className="text-center my-5">SIGN UP</h1>
            </div>

           
            
            <div className="row m-3 justify-content-center">
                <div className="col-sm-6">
                    <div className=" mb-3">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={confirm_password}
                            onChange={(e) => setConfirm_Password(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>


                    <div className="mb-3">
                        <label>First Name</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="First Name"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Last Name</label>
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
                    </div></center>
                   <center> <div className="row mb-3 px-3">
                        <input
                            type="submit"
                            onClick={onSignUp}
                            className="btn btn-primary"
                            value="Create Account"

                            id="female"
                        />
                    </div></center>
                    <div className="sign-in">
                        
                        <label
                            type="button"
                            className="text-decoration-underline"
                            onClick={onSignIn}
                        >
                           Sign In 
                        </label>
                        </div>
                        </div>
                    </div>
                    </div>
               
          
    );
    
};




export default SignUp;
