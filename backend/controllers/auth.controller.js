import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		// to be filled when signing up
		const { fullName, username, password, confirmPassword, gender } = req.body; 

		// error handler
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		// checker if username already exist from db
		const user = await User.findOne({ username });

		// error handler
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10); // generate salt for hashing
		const hashedPassword = await bcrypt.hash(password, salt); // hash password useing the salt above

		// set pfp based on gender
		const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		// create new user after every error handler passed 
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
		});

		// if new user created 
		if (newUser) {
			// generate a token and set it as a cookie by newUser._id
            const token = await generateTokenAndSetCookie(newUser._id, res);
			await newUser.save(); //save
            // console.log('token', token)

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			}); // return user details for postman lang to in checking
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		// to be filled
		const { username, password } = req.body;

		// check if may username na ganon
		const user = await User.findOne({ username });

		// compare password to hashed password sa db
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		// error handler
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		
        const token = await generateTokenAndSetCookie(user._id, res);
        // console.log('token', token)
        
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 }); // clear jwt cookie
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
