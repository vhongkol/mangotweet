import { useEffect, useState } from "react";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";
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
                    <Route exact path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    {/* <Route path="/about" element={<AboutUs />} /> */}
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
