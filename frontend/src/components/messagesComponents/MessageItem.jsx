import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';

const MessageItem = ({message}) => {
	const {authUser} = useAuthContext()
	const {selectedConversation} = useConversation()

	const fromMe = message.senderId === authUser._id

	const chatClassName = fromMe ? 'chat-end' : 'chat-start'
	const profilePic = fromMe ? authUser.profilePic: selectedConversation?.profilePic
	const bubbleBgColor = fromMe ? 'bg-purple-400': ''

    // Format the createdAt time
    const createdAt = new Date(message.createdAt);
    const timeString = `${createdAt.getHours()}:${createdAt.getMinutes()}`;

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
                    <img src={profilePic} alt="Tailwind CSS chat bubble component" />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{timeString}</div>
		</div>
	);
};

export default MessageItem