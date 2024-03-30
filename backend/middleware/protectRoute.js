import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"

const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt
        console.log('token', token)

        if(!token){
            return res.status(401).json({error:'no token'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error:'invalid token'})
        }

        const user = await User.findById(decoded.userId).select('-password')

        if(!user){
            return res.status(401).json({error:'user no found'})
        }

        req.user = user

        next() // to call next function on message.routes.js

    } catch (error) {
		console.log("error in protectRoute middleware", error.message)
		res.status(500).json({ error: "internal server error" })
    }
}


export default protectRoute;