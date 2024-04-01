import React from 'react'

const MessageItem = () => {
	return (
		<div className={`chat chat-end`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
                    o
				</div>
			</div>
			<div className={`chat-bubble text-white bg-purple-400`}>hehehehhehehehe</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>1:23:45</div>
		</div>
	);
};

export default MessageItem