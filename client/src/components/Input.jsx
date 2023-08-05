import React, { useState } from 'react'
import { IoMdAttach } from "react-icons/io"
import { BiImage } from "react-icons/bi"
import { VscSend } from "react-icons/vsc"
const Input = () => {

    const [msg, setMesg] = useState("");

    // const sendChat = (e) => {
    //     e.preventDefault();

    // }


    return (
        <div className='input'>
            <input type="text" placeholder='Type something...' name='msg' value={msg} onChange={(e) => setMesg(e.target.value)} />
            <div className="send">
                <span>
                    <IoMdAttach />
                </span>
                <input type="file" style={{ display: "none" }} id='file' />
                <label htmlFor="file">
                    <BiImage />
                </label>
                <button>Send<VscSend /></button>
            </div>
        </div>
    )
}

export default Input
