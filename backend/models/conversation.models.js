import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],// array of participants since many
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
        default:[]
    }],// array of messages
},{timestamps:true})// timestamp for createdAt and updatedAt

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation;