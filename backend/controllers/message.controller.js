import Conversation from "../models/conversation.models.js";
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from "../socket/socket.js";

// finished no error yet
export const sendMessage = async (req, res) => {
	try {
		const {message} = req.body;
		const {id:receiverId} = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: {
                $all: [senderId, receiverId]
            },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		} // if no conversation then create one

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		})

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await conversation.save();
		await newMessage.save();


		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		
		res.status(201).json(newMessage);

	} catch (error) {
		console.log("error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "internal server error" })
	}
};

export const getMessages = async (req, res) => {
    try {
		const {id:userToChatId} = req.params
		const senderId = req.user._id

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
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// 1:31:35