import React, { useRef } from 'react'

const Messages = ({ messages, currentUser, currentChat }) => {
    // const scrolRef = useRef(passref);
    return (
        <div className='messages'>
            {
                messages.map((elem) => {
                    return (
                        <div className={`message ${elem.fromSelf === true ? `owner` : ""} `} >
                            <div className="messageInfo">
                                <img src={`${elem.fromSelf === true ? currentUser.profilepic : currentChat.profilepic} `} alt="" />
                                {/* <span>just now</span> */}
                            </div>
                            <div className="messageContent">
                                <p>{elem.message}</p>
                                {/* <img src="https://images.pexels.com/photos/13096920/pexels-photo-13096920.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" /> */}
                            </div>
                        </div>

                    )
                })
            }

            {/* < div ref={scrolRef} /> */}


        </div >
    )
}

export default Messages






//image code
