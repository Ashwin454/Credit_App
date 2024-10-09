import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../context/UserContext";

function Header() {
    const {user, setUser} = useContext(AppContext);
    const navigate=useNavigate();
    const logout = async () => {
        setUser(null); // Clear user from context
        localStorage.removeItem("user"); // Remove token from local storage
        try {
            const response = await axios.post("http://localhost:9000/api/v1/logout", {}, {withCredentials: true});
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Error logging out"
            })
        }
        navigate("/login"); // Redirect to login page
    };    
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center">
                <i className="fas fa-bell text-xl mr-4"></i>
                <i className="fas fa-envelope text-xl mr-4"></i>
                <i className="fas fa-user-circle text-xl"></i>
                <Button onClick={logout} colorScheme="red" variant="outline" className="ml-4">
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default Header;