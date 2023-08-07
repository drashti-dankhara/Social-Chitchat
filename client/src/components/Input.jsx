import React, { useState } from 'react'
import { IoMdAttach } from "react-icons/io"
import { BiImage } from "react-icons/bi"
import { VscSend } from "react-icons/vsc"
const Input = ({ handleSendMsg }) => {

    const [msg, setMesg] = useState("");

    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMesg('')
        }
    }


    return (
        <form action="" method='post' onSubmit={(e) => sendChat(e)} className='input'>
            <input type="text" placeholder='Type something...' name='msg' value={msg} onChange={(e) => setMesg(e.target.value)} />
            <div className="send">
                <span>
                    <IoMdAttach />
                </span>
                <input type="file" style={{ display: "none" }} id='file' />
                <label htmlFor="file">
                    <BiImage />
                </label>
                <button type='submit'>Send<VscSend /></button>
            </div>
        </form>
    )
}

export default Input
