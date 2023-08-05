import React, { useState } from 'react';
import '../assets/css/style.scss'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { serverInfo } from '../ServerInfo';
// import { BiImageAdd } from "react-icons/bi"

const Register = () => {

    const toastOpetions = {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    }

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const [profilepic, setProfilepic] = useState("");

    const handleValidation = () => {
        const { name, email, password, cpassword } = values
        if (name === "") {
            toast.error("Name is required", toastOpetions);
            return false;
        }
        else if (password !== cpassword) {
            toast.error("password and confirm password should be same", toastOpetions);
            return false;
        } else if (password.length < 5) {
            toast.error("password should be greater than 5 characters", toastOpetions);
            return false;
        } else if (email === "") {
            toast.error("Email is required", toastOpetions);
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation) {
            // console.log(values);
            // console.log(profilepic);
            const body = new FormData();
            body.append("name", values.name);
            body.append("email", values.email);
            body.append("password", values.password);
            body.append("profilepic", profilepic);
            await axios({
                method: "post",
                url: `${serverInfo.URL}/api/auth/registerUser`,
                headers: { 'Content-Type': "multipart/form-data" },
                data: body,
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    // console.log("success");
                    alert("done");
                    toast.success("Registered Successful", toastOpetions);
                    navigate("/login");
                    // localStorage.setItem("chat-app-user", JSON.stringify(res.data.user))
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
                <span className='title'>Register</span>
                <form action="" onSubmit={handleSubmit} method='post'>
                    <input type="text" name='name' placeholder='Enter Name' onChange={(e) => handleChange(e)} />
                    <input type="email" name='email' placeholder='Enter Email' onChange={(e) => handleChange(e)} />
                    <input type="password" name='password' placeholder='Enter Password' onChange={(e) => handleChange(e)} />
                    <input type="password" name='cpassword' placeholder='Enter Confirm Password' onChange={(e) => handleChange(e)} />
                    {/* <input style={{ display: "none" }} name='profilepic' type="file" id='profilepic' onChange={(e) => setProfilepic(e.target.files[0])} />
                    <label htmlFor="profilepic">
                        <BiImageAdd />
                        <span>Add an avtar</span>
                    </label> */}
                    <input type="file" name='profilepic' onChange={(e) => setProfilepic(e.target.files[0])} />
                    <button>Sign Up</button>
                </form>
                <p>Already have an account ?<Link to={'/login'}>Login</Link></p>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Register
