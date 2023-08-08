import React, { useRef } from 'react'

const Messages = ({ messages, currentUser, currentChat }) => {
    // const scrolRef = useRef(passref);
    return (
        <>
            <div div className='messages' >
                {
                    messages.map((elem) => {
                        return (
                            <div className={`message ${elem.fromSelf === true ? `owner` : ""} `} >
                                <div className="messageInfo">
                                    <img src={`${elem.fromSelf === true ? currentUser.profilepic : currentChat.profilepic} `} alt="" />
                                    {/* <span>just now</span> */}
                                </div>
                                <div className="messageContent">
                                    {
                                        elem.message ? <p>{elem.message}</p> : ""
                                    }
                                    {
                                        elem.img ? <img src={elem.img} alt="" /> : ""
                                    }
                                </div>
                            </div>

                        )
                    })
                }

                {/* < div ref={scrolRef} /> */}

            </div>
        </>
    )
}

export default Messages






//image code
