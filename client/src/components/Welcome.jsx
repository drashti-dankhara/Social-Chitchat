import React, { useEffect, useState } from 'react'
import img1 from "../assets/img/welcomepage.png"

const Welcome = ({ currentUser }) => {

    return (
        <div className='welcome'>
            <img src={img1} alt="" />
            <h1>
                Welcome , <span>{currentUser.name}!</span>
            </h1>
            <h3>Please select a chat to start messaging!</h3>
        </div>
    )
}

export default Welcome
