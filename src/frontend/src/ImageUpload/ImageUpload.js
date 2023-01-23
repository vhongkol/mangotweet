import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ImageUpload.css';
function ImageUpload(){
    const [data,setData]=useState();
    console.log(data)
    return(
        <div className="main">
            <div className="uploadimage">
                <label htmlFor="imgs">Upload</label>
            </div>
            <input id="imgs" type="file" accept="image/png, image/jpeg,.txt,.doc" onChange={(e)=>setData(e.target.files)} />
        </div>
        

        
    );
}
export default ImageUpload;