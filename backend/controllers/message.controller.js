import Conversation from "../models/conversation.models.js";
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from "../socket/socket.js";

// finished no error yet
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body

		// extract receiverId from req parameters
		const { id: receiverId } = req.params
		
		// get senderId from authenticated user's data
		const senderId = req.user._id

		// find all conversation from senferId and receiverId
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		})

		// if no prev convo then create one
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			})
		}
		
		// create newMessage object
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		})

		// if newMessage then add that message to conversation
		if (newMessage) {
			conversation.messages.push(newMessage._id)
		}

		// await conversation.save()
		// await newMessage.save()

		// this will run in parallel(same as above but fasrter)
		await Promise.all([conversation.save(), newMessage.save()])

		// sokcet functionality
		const receiverSocketId = getReceiverSocketId(receiverId) // get and set receiver socket id

		// if exist then emit 'newMessage' event to receiver's socket
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage)
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message)
		res.status(500).json({ error: "Internal server error" })
	}
};

export const getMessages = async (req, res) => {
    try {
		// get if of user to chat with from request params
		const {id:userToChatId} = req.params

		// get sender's id from authenticated user's data
		const senderId = req.user._id

		// find all conversatio between sender and usertochat
		const conversation = await Conversation.findOne({
			participants:{
				$all:[
					senderId,userToChatId
				]
			},
		}).populate('messages') // get array of actual messages

        if (!conversation) {
            return res.status(200).json([]); // Added return statement here
        }

		res.status(200).json(conversation.messages)


    } catch (error) {
        console.log("Error in getMessages controller:", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
};

