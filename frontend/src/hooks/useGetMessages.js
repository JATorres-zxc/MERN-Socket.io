import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from "react-hot-toast"


// custom hook
const useGetMessages = () => {
	// using the useState hook to manage loading state, initialized as false
    const [loading, setLoading] = useState(false)

    // destructuring values from useConversation hook context provider
    const {messages, setMessages, selectedConversation} = useConversation()

    // useEffect hook to perform side effects, in this case, fetching messages data
    useEffect(() =>{

        const getMessages = async () =>{
            setLoading(true)// true na to show data is being fetch
    
            try {
                 // fetch data from server by selectedConversation._id
                const res = await fetch(`/api/messages/${selectedConversation._id}`)
    
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                // update setMessages state with fetched data
                setMessages(data)
    
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }
        // \call the getMessages function when there's a selected conversation ID
        if(selectedConversation?._id) getMessages()

    },[selectedConversation?._id, setMessages])
    // return object contaning messages and loading state
    return {messages, loading}
}

export default useGetMessages