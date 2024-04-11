import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'

import notification from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    // destructuring values from the useSocketContext and useConversation hooks
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation()
    
    // listening for new messages from the socket
    useEffect(() =>{
        // listen for 'newMessage' event from the socket
        socket?.on('newMessage', (newMessage) =>{
            const sound = new Audio(notification)
            sound.play()
            // update messages state by adding the new message to the existing messages
            setMessages([...messages,newMessage])
        })
        // cleanup function to remove the 'newMessage' event listener when the component unmounts
        return () => socket?.off('newMessage')

    },[socket,setMessages,messages]) // dependency array includes socket, setMessages, and messages
}

export default useListenMessages