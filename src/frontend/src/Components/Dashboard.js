import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {

    const navigate = useNavigate();
    const onHome = async (e) => {
        navigate("/Home");
    };

    return (


        <div>
            
            
            <label type="text" onClick={onHome}>
                "WELCOME TO MANGO TWEET DASHBOARD"
            </label>
        </div>
    );

}



export default Dashboard;

