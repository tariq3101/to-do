import React, { useState } from 'react';
import './Signup.css';
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({ email: "", username: "", password: "" });

  // Form validation
  const validateForm = () => {
    if (!Inputs.email || !Inputs.username || !Inputs.password) {
      toast.error("All fields are required");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(Inputs.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (Inputs.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  // Submit form
  const submit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${import.meta.env.BACKEND_URL}/api/v1/register`, Inputs);
      if (response.data.message === "User Already Exists") {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setInputs({ email: "", username: "", password: "" });
        history("/signin");
      }
    } catch (error) {
      toast.error("Error registering user. Please try again.");
    }
  };

  return (
    <div className='signup'>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column w-100 p-3'>
              <input
                className='p-2 my-3 input-signup'
                name='email'
                type='email'
                placeholder='Enter your email'
                onChange={change}
                value={Inputs.email}
              />
              <input
                className='p-2 my-3 input-signup'
                name='username'
                type='text'
                placeholder='Enter your username'
                onChange={change}
                value={Inputs.username}
              />
              <input
                className='p-2 my-3 input-signup'
                name='password'
                type='password'
                placeholder='Enter your password'
                onChange={change}
                value={Inputs.password}
              />
              <button className='btn-signup p-2' onClick={submit}>SignUp</button>
            </div>
          </div>
          <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-none">
            <h1 className='text-center sign-up-heading'>
              <HeadingComp first="Sign" second="Up" />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;