import React from 'react'
import { create } from 'zustand';


//global state
const useConversation = create((set) => ({
    selectedConversation:null,

    setSelectedConversation:(selectedConversation) => set({
        selectedConversation
    }), // similar with useState in useLogin

    messages:[],

    setMessages: (messages) => set({messages}),
    
}));

export default useConversation;