import React from 'react'
import { create } from 'zustand';


//global state
const useConversation = create((set) => ({
    selectedConversation:null,

    // function to set the selectedConversation in the global state
    setSelectedConversation:(selectedConversation) => set({
        selectedConversation
    }), // similar with useState in useLogin

    messages:[], // initialize messages as an empty array   

    setMessages: (messages) => set({messages}), // function to set the messages in the global state
    
}));

export default useConversation;