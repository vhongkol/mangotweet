import { useEffect, useState } from "react";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import ResetPassword from "./Components/ResetPassword";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
    const [apiDetails, setApiDetails] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
            .then((r) => r.json())
            .then((response) => setApiDetails(response));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
            
                {apiDetails && (
                    <p>
                        Connected to {apiDetails.description} v
                        {apiDetails.version}
                    </p>
                )}
            </header>
            <Router>
                <Routes>
                    <Route  exact path="/Home" element={<Home />} />
                    <Route  exact path="/Dashboard" element={<Dashboard />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    {/* <Route path="/about" element={<AboutUs />} /> */}
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                    />
                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;
