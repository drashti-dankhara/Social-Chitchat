import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = ({ currentUser, changeCurrentChat, currentChat, currentSelected }) => {
    return (
        <div className='sidebar'>
            <Navbar currentUser={currentUser} />
            <Search />
            <Chats changeCurrentChat={changeCurrentChat} currentChat={currentChat} currentSelected={currentSelected} />
        </div>
    )
}

export default Sidebar
