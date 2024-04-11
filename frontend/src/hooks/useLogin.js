import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogin = () => {
	// using the useState hook to manage loading state, initialized as false
    const [loading, setLoading] = useState(false)

    // destructuring the setAuthUser function from the useAuthContext hook
    const {setAuthUser} = useAuthContext()

    const login = async (username, password) =>{
        setLoading(true) // true na to show data is being fetch

        try {
            // eend POST request to the server's login endpoint with username and password in the request body
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json(); // parse
            if (data.error) {
                throw new Error(data.error);
            }
            // store userdata in localstorage
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data); // set authentucated user n the authContext

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, login}

}


export default useLogin;
