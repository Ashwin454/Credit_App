import { useRef, useState } from 'react';
import './forgotPass.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
    const navigate=useNavigate();
    const [email, setEmail]=useState('');
    const formRef = useRef(null);
    const formData={
      email
    }
    const [loading, setLoading]=useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response=await axios.post("https://credit-app-backend.onrender.com/api/v1/forgotPass", formData);
        if(response.data && response.data.success){
          setLoading(false);
          navigate('/login');
          Swal.fire({
            icon: 'success',
            title: 'Please check you email',
          })
          setEmail('');
        }
      } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Failed to send email',
            text: error.response?.data?.message || 'An unexpected error occurred',
          })
        setLoading(false);
      }    
    };

    return (
        <div className="container">
        <div className="forgotPasswordBox">
          <h1 className="title">Forgot Password</h1>
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
            <label htmlFor="email" className="boldText">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
