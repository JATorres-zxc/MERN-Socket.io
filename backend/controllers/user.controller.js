import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({
            _id:{$ne:loggedInUserId}
        }).select('-password') // find every user ({except the user logged in})
            // since you dont want to see your acc in chat sidebar

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log("error in getUsersForSidebar controller:", error.message);
        res.status(500).json({ error: "internal server error" });
    }
}