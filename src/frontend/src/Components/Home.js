import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const onSignOut = async (e) => {
        navigate("/sign-in");
    };
    return (
        <div>
            <label type="button" onClick={onSignOut}>
                Sign Out
            </label>
        </div>
    );
}

export default Home;
