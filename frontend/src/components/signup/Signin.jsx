import React, { useState } from 'react';
import './Signup.css';
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [Inputs, setInputs] = useState({ email: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const validateForm = () => {
        if (!Inputs.email || !Inputs.password) {
            toast.error("All fields are required");
            return false;
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(Inputs.email)) {
            toast.error("Invalid email format");
            return false;
        }
        return true;
    };

    const submit = async (e) => {
        // console.log(`${process.env.REACT_APP_BACKEND_URL}`)
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // console.log(`${process.env.REACT_APP_BACKEND_URL}`)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, Inputs);
            const { message, others } = response.data;

            if (message === "Please signup first") {
                toast.error("Please signup first!");
            } else if (message === "Password is not correct") {
                toast.error("Password is not correct!");
            } else {
                toast.success(message);
                sessionStorage.setItem("id", others._id);
                dispatch(authActions.login());
                history("/todo");
                window.location.reload();
            }
        } catch (error) {
            toast.error("Error during sign in. Please try again.");
        }
    };

    return (
        <div>
            <div className='signup'>
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
                            <h1 className='text-center sign-up-heading'>
                                <HeadingComp first="Sign" second="In" />
                            </h1>
                        </div>
                        <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                            <div className='d-flex flex-column w-100 p-3'>
                                <input
                                    className='p-2 my-3 input-signup'
                                    name='email'
                                    type='email'
                                    value={Inputs.email}
                                    onChange={change}
                                    placeholder='Enter your email'
                                />
                                <input
                                    className='p-2 my-3 input-signup'
                                    name='password'
                                    type='password'
                                    value={Inputs.password}
                                    onChange={change}
                                    placeholder='Enter your password'
                                />
                                <button className='btn-signup p-2' onClick={submit}>SignIn</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;