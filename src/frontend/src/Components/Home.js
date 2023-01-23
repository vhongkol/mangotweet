
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Home() {

    const navigate = useNavigate();
    const onSignIn = async (e) => {
        navigate("/sign-in");   
    };
    let URL = "http://localhost/api/v1/logout";
    const response =  axios.post('http://localhost/api/v1/logout', )

    return (
        <div>
            <label type="text" onClick={""}>
                
                <center>WELCOME TO MANGO TWEET</center><br></br>
                What is MANGO tWEET actually used for?
                 Twitter is a service for friends, family,
                          and coworkers to communicate and stay 
                              connected through the exchange of quick,
                          frequent messages. People post Tweets,
                 which may contain photos, videos, links, 
                      and text. These messages are posted to your profile,
                             sent to your followers, and are searchable MANGO TWEET on search.
            </label>
        
            <div className="sign-up">
                        
                        <button 
                            type="button"
                            className="btn btn-primary"
                            onClick={onSignIn}
                        >
                            Log Out
                        </button>
</div>
        </div>
    );

}



export default Home;

