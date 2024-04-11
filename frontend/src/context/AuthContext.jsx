import { createContext, useContext, useState } from "react";

// import createContext function to create new context
export const AuthContext = createContext()

// create  custom hook to access authContext
export const useAuthContext = () => {
    return useContext(AuthContext)
}


// provide authenticattion context to its children
export const AuthContextProvider = ({ children }) => {
    //useState hook to manage the authentication user state, initialized with the user data stored in localStorage or null if not available
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null)

    // rendering the AuthContext.Provider component to provide the authentication context value to its children
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}
