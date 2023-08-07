import React, { useEffect, useRef, useState } from 'react'
import { HiVideoCamera } from "react-icons/hi"
import { FiMoreHorizontal } from "react-icons/fi"
import Messages from './Messages'
import Input from './Input'
import userimg from '../assets/img/userimg.jpg'
import axios from "axios"
import { serverInfo } from '../ServerInfo';
import { v4 as uuidv4 } from "uuid"

const Chat = ({ currentChat, currentUser, socket }) => {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrolRef = useRef();

    useEffect(() => {
        getAllMessages();
    }, [currentChat])


    const getAllMessages = async () => {
        console.log(currentUser._id);
        console.log(currentChat._id);

        if (currentChat) {
            await axios({
                method: "post",
                url: `${serverInfo.URL}/api/getAllMessage`,
                data: {
                    from: currentUser._id,
                    to: currentChat._id,
                },
            }).then((res) => {
                console.log(res.data.data);
                setMessages(res.data.data);
            }).catch((err) => {
                console.log(err.message);
                // toast.error(err.response.data.msg, toastOpetions);
            });
        }
    }


    const handleSendMsg = async (msg) => {
        // alert(msg);
        await axios({
            method: "post",
            url: `${serverInfo.URL}/api/addMessage`,
            data: {
                from: currentUser._id,
                to: currentChat._id,
                message: msg
            },
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err.message);

            // toast.error(err.response.data.msg, toastOpetions);
        });

        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrolRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages])

    return (
        <div className='chat'>
            <div className="chatInfo">
                <div className='chatUser'>
                    <img src={!currentChat.profilepic ? userimg : currentChat.profilepic} alt="" />
                    <span>{currentChat.name}</span>
                </div>
                <div className="chatIcons">
                    <HiVideoCamera />
                    <FiMoreHorizontal />
                </div>
            </div>
            <Messages passref={scrolRef} messages={messages} currentUser={currentUser} currentChat={currentChat} />
            <div ref={scrolRef} />
            <Input handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default Chat
