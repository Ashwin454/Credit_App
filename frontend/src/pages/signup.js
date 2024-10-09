import React, { useContext, useState, useEffect } from 'react';
import './signup.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppContext } from '../context/UserContext';
import Swal from 'sweetalert2';

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const response = await axios.post("https://credit-app-backend.onrender.com/api/v1/register", {name, email, password, confirmPass});
      if (response.data.success) {
        setUser(response.data.user1);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'SigUp Failed',
        text: error.response?.data?.message || 'An unexpected error occurred',
      })
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(user){
      Swal.fire({
        icon: 'success',
        title: 'Please check you email',
      })
      navigate("/verify-email");
    }
  }, [user, navigate])
  return (
    <div className="pageContainer">
      <div className="formWrapper">
        <h1 className="title">Register</h1>
        <hr
          style={{
            border: 'none',
            height: '4px',
            backgroundColor: '#3498db',
            margin: '20px 0',
            borderRadius: '2px',
          }}
        />
        <br />
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label htmlFor="name" className="label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="confirmPass" className="label">Confirm Password</label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="photo" className="label">Profile Picture</label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="input"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className={`submitButton ${loading ? 'buttonDisabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
