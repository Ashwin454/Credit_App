import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import VerifierContent from "../components/verifierContent";
import { AppContext } from "../context/UserContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifierHome() {
    const {user, setUser} = useContext(AppContext);
    const [loans, setLoans] = useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(user === null){
            navigate('/login');
          }
        const fetchLoans = async () => {
            try {
                console.log("user: ", user);
                const response = await axios.get("http://localhost:9000/api/v1/verifier/getVerifierLoan");
                setLoans(response.data.pendingList); 
            } catch (error) {
                Swal.fire({
                    icon:'error',
                    title:"Error fetching loans",
                    text:error?.response?.data?.message || "Unexpected error occured"
                })
            }
        };
        fetchLoans();
    }, [])
    return (
        <div className="flex">
            <Sidebar user={user}/>
            <VerifierContent user={user} setUser={setUser} loans={loans}/>
        </div>
    );
}

export default VerifierHome;