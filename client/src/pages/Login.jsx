import React, { useState } from 'react';
import '../assets/css/style.scss'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { serverInfo } from '../ServerInfo';

const Login = () => {
    const toastOpetions = {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    }
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const handleValidation = () => {
        const { email, password } = values
        if (password === "") {
            toast.error("password is required", toastOpetions);
            return false;
        }
        else if (email === "") {
            toast.error("Email is required", toastOpetions);
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation) {
            // console.log(values);
            await axios({
                method: "post",
                url: `${serverInfo.URL}/api/loginUser`,
                data: {
                    email: values.email,
                    password: values.password
                },
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    console.log(res.data.userData);
                    toast.success("Login Successful", toastOpetions);
                    localStorage.setItem("chat-app-user", JSON.stringify(res.data.userData))
                    // console.log(localStorage.getItem("chat-app-user"))
                    navigate("/home");
                }
                else {
                    console.log("fail");
                }
            }).catch((err) => {
                toast.error(err.response.data.msg, toastOpetions);
            });
        }
    }

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>ChitChat</span>
                <span className='title'>Login</span>
                <form action="" onSubmit={handleSubmit}>
                    <input type="email" placeholder='Enter Email' name="email" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Enter Password' name="password" onChange={(e) => handleChange(e)} />
                    <button>Login</button>
                </form>
                <p>Don't have an account ? <Link to={'/register'}>Sign Up</Link></p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
