import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    },
},{timestamps:true})// timestamp for createdAt and updatedAt

const Message = mongoose.model('Message', messageSchema)

export default Message;