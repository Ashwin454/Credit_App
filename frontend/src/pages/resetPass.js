import { useRef, useState } from "react";
import "./login.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function ResetPass() {
  const navigate=useNavigate();
  const [password, setPassword]=useState('');
  const [confirmPass, setConfirmPass]=useState('');
  const formRef = useRef(null);
  const formData={
    password,
    confirmPass
  }
  const [loading, setLoading]=useState(false);
  const token=useParams();
  const formData1={
    token,
    formData
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response=await axios.post(`https://credit-app-backend.onrender.com/api/v1/resetPass/${token.token}`, formData);
      
      if(response.data && response.data.success){
        setLoading(false);
        navigate('/login');
        Swal.fire({
            icon: 'success',
            title: 'Reset Password Successful'
          })
        setPassword('');
        setConfirmPass('');
      }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Reset Password Failed',
            text: error.response?.data?.message || 'An unexpected error occurred',
          })
      setLoading(false);
    }    
  };

  return (
<div className="container">
  <div className="loginBox">
    <h1 className="title">Reset Password</h1>
    <hr
      style={{
        border: 'none',
        height: '4px',
        backgroundColor: '#3498db',
        margin: '20px 0',
        borderRadius: '2px',
      }}
    />
    <form onSubmit={handleSubmit}>
      <label htmlFor="password" className="boldText">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label htmlFor="confirmPass" className="boldText">Confirm Password:</label>
      <input
        type="password"
        id="confirmPass"
        name="confirmPass"
        placeholder="Enter confirm password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        required
      />

      <button
        type="submit"
        className={`submitButton ${loading ? 'buttonDisabled' : ''}`}
        disabled={loading}
      >
        {loading ? 'Logging In...' : 'Login'}
      </button>
    </form>
  </div>
</div>
  );
}
