import React from 'react'
import MessagesItems from './MessagesItems';
import MessageInputItem from './MessageInputItem';
import {TiMessages} from 'react-icons/ti'

const MessageContainerItem = () => {
	const NochatSelected = true

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{NochatSelected ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>hehehe</span>
					</div>
					<MessagesItems />
					<MessageInputItem />
				</>
			)}
		</div>
	);
};

export default MessageContainerItem

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 hehehe ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};