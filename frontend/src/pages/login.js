import React, { useContext, useEffect, useState } from 'react';
import './login.css';
import { AppContext } from '../context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const { user, setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://credit-app-backend.onrender.com/api/v1/login", { email, password }, {withCredentials: true});
      if(response.data.success){
        setUser(response.data.user1); 
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'An unexpected error occurred',
      })
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(user){
      navigate("/");
    }
  }, [user, navigate])
  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">Login</h1>
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
          <label htmlFor="email" className="boldText">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

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

          <button
            type="submit"
            className={`submitButton ${loading ? 'buttonDisabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <div className="links">
          <p>
            <Link to="/signup" className="link">
              Don't have an account? Create account
            </Link>
          </p>
          <p>
            <Link to="/forgotPass" className="link">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
