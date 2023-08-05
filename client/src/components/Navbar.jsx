import React, { useState, useEffect } from 'react';
import { IoMdLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser }) => {

    const navigate = useNavigate()
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.profilepic);
            setCurrentUserName(currentUser.name);
        }
    }, [currentUser])

    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className='navbar'>
            <span className='logo'>ChitChat</span>
            <div className='user'>
                <img src={currentUserImage} alt="" />
                <span>{currentUserName}</span>
                <span className='logoutbtn' onClick={handleLogout}>
                    <IoMdLogOut />
                </span>
            </div>
        </div>
    )
}

export default Navbar
