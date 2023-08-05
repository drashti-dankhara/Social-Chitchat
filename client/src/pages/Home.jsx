import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { serverInfo } from '../ServerInfo';
import Welcome from '../components/Welcome'

const Home = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState('');
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            console.log("localstorage not seted")
            navigate("/login")
        }
        else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        }
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentChat(contact);
        setCurrentSelected(index);
    }

    return (
        <div className='home'>
            <div className="container">
                <Sidebar currentUser={currentUser} changeCurrentChat={changeCurrentChat} currentChat={currentChat} currentSelected={currentSelected} />
                {
                    currentChat === undefined ? (<Welcome currentUser={currentUser} />) : (<Chat currentChat={currentChat} />)
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home
