import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	// generate jwt token containing useId using jwt_secret
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	})
	

	// set jwt token in a cookie named 'jwt'
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15ms
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	})
    return token;
};

export default generateTokenAndSetCookie;