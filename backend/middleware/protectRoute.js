import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"

// i used this sa message and user routes, eto muna before yung mga fnuctions sa controller
const protectRoute = async (req,res,next) =>{
    try {
        // get jwt token from req
        const token = req.cookies.jwt
        // console.log('token', token)

        // error handler
        if(!token){
            return res.status(401).json({error:'no token'})
        }

        // verify jwt token using jwt_secret from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // error handler
        if(!decoded){
            return res.status(401).json({error:'invalid token'})
        }

        // find user by decoded userId but exclude password(nagsshow kasi password)
        const user = await User.findById(decoded.userId).select('-password')

        // error handler
        if(!user){
            return res.status(401).json({error:'user no found'})
        }

        // attach usr object so that it can be used sa next fnunxtion which is controller sa routes
        req.user = user

        next() // to call next function on message.routes.js

    } catch (error) {
		console.log("error in protectRoute middleware", error.message)
		res.status(500).json({ error: "internal server error" })
    }
}


export default protectRoute;