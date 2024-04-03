import HomeView from "./views/HomeView"
import LoginView from "./views/LoginView"
import SignupView from "./views/SignupView"

import { Route, Routes, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from "./context/AuthContext"

function App() {

    const {authUser} = useAuthContext()

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <Routes>
                <Route path='/' element={authUser ? <HomeView/> : <Navigate to={'/login'}/>} />
                <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginView />} />
                <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignupView />} />
            </Routes>
            <Toaster />
        </div>
        )
    }

export default App
