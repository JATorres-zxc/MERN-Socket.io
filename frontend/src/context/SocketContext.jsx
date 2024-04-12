import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

// createcontext
export const SocketContext = createContext()

// hook to use that context
export const useSocketContext = () => {
    return useContext(SocketContext)
}

// create component to provide socket context to children
export const SocketContextProvider = ({children}) =>{
    // useState hook to manage the socket and onlineUsers state
    const [socket,setSocket] = useState(null) // null muna

    const [onlineUsers, setOnlineUsers] = useState([]) // empty muna onlineUsers
    const {authUser} = useAuthContext()

    // useEffect hook to perform side effects like setting up and cleaning up the socket connection
    useEffect(() =>{
        if(authUser){
            // establish socket connection to server with user's id
            const socket = io('https://mern-socket-io.onrender.com',{
                query:{
                    userId: authUser._id
                }
            })

            // set socket state
            setSocket(socket)

            // socket.on() to listen to the events and can be used both on client and server side
            socket.on('getOnlineUsers', (users) =>{
                setOnlineUsers(users)
            })

            // cleanup function to close socket connection when component unmounts or when authUser changes
            return () => socket.close()
        } else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser]) // dependency array to re-run the effect when the authUser changes

    return <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
        </SocketContext.Provider>
}