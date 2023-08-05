import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useRevalidator } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { serverInfo } from '../ServerInfo';

const Chats = ({ changeCurrentChat, currentChat, currentSelected }) => {

    const toastOpetions = {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    }

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState('');
    const [contacts, setContacts] = useState([]);
    // const [currentSelected, setCurrentSelected] = useState(undefined);
    // const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            console.log("localstorage not seted")
            navigate("/login")
        }
        else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        }
    }, []);

    const getContects = async () => {
        if (currentUser) {
            await axios({
                method: "get",
                url: `${serverInfo.URL}/api/getUsers/${currentUser._id}`,
            }).then((res) => {
                console.log(res.data.data);
                setContacts(res.data.data);
            }).catch((err) => {
                toast.error(err.response.data.msg, toastOpetions);
            });
        }
    }

    useEffect(() => {
        getContects();
    }, [currentUser]);

    const handleChange = (index, contact) => {
        changeCurrentChat(index, contact)
    }

    return (
        <>
            <div div className='chats' >
                {
                    contacts.map((contact, index) => {
                        return (
                            <div className={`userChat ${index === currentSelected ? `selected` : ""}`} key={index} onClick={() => handleChange(index, contact)}>

                                <img src={contact.profilepic} alt="" />
                                <div className="userChatInfo">
                                    <span>{contact.name}</span>
                                    <p>hello</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
        </>
    )
}

export default Chats
