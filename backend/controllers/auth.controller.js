import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js';

// no error yet
export const signup = async (req, res) => {
	try{
		const { fullName, username, password, confirmPassword, gender } = req.body

		if (password !== confirmPassword) {
			return res.status(400).json({error: "password dont match"})
		}

		const user = await User.findOne({username})

		if (user) {
			return res.status(400).json({error: "username already exists"})
		}

		const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

		const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
		const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
		})

        if(newUser){
            generateTokenAndSetCookie({ userId: newUser._id, res })
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }else{
            res.status(400).json({error:'invalid user data'})
        }

	}catch (error){
		console.log("error in signup controller", error.message)
		res.status(500).json({ error: "internal server error" })
	}
};

// no error yet
export const login = async (req,res) =>{
    try {
        const {username,password} = req.body

        const user = await User.findOne({username})

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid password or username' });
        }

        if (!user) {
            return res.status(400).json({ error: 'No user found' })
        }

        generateTokenAndSetCookie({userId: user._id, res})

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })

    } catch (error) {
		console.log("rrror in login controller", error.message)
		res.status(500).json({ error: "internal server error" })
    }
}

// there's an errror(yata) since status message was sent but the cookie is still right there
// fix this
export const logout = (req,res) =>{
    try {
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({message:'logged out'})

    } catch (error) {
		console.log("rrror in logout controller", error.message)
		res.status(500).json({ error: "internal server error" })
    }
}


//41:56