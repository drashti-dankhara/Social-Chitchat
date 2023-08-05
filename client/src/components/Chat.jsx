import React from 'react'
import { HiVideoCamera } from "react-icons/hi"
import { FiMoreHorizontal } from "react-icons/fi"
import Messages from './Messages'
import Input from './Input'
import userimg from '../assets/img/userimg.jpg'

const Chat = ({ currentChat }) => {
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
            <Messages />
            <Input />
        </div>
    )
}

export default Chat
