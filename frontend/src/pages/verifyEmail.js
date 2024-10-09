import { useRef, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function VerifyEmail() {
  const navigate=useNavigate();
  const [email, setEmail]=useState('');
  const [otp, setOtp]=useState('');
  const formRef = useRef(null);
  const formData={
    email, otp
  }
  const [loading, setLoading]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    try {
      const response=await axios.post("https://credit-app-backend.onrender.com/api/v1/verify-email", formData);
      if(response?.data?.success){
        setLoading(false);
        navigate('/');
        formRef.current.reset(); 
        setEmail('');
        setOtp('');        
      }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Verification failed',
            text: error.response?.data?.message || 'An unexpected error occurred',
          })
      setLoading(false);
    }    
  };
  
  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">Email Verification</h1>
        <hr style={{ border: 'none', height: '4px', backgroundColor: '#3498db', margin: '20px 0', borderRadius: '2px' }} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="boldText">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
          
          <label htmlFor="otp" className="boldText">OTP:</label>
          <input type="password" id="otp" name="otp" placeholder="Enter OTP" value={otp} onChange={(e)=>{setOtp(e.target.value)}} required />
          
          <button
            type="submit"
            className={`submitButton ${loading ? 'buttonDisabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}




