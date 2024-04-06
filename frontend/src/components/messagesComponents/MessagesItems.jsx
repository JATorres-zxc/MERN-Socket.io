import React from 'react'
import MessageItem from './MessageItem';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeleton/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const MessagesItems = () => {

      const {messages, loading} = useGetMessages()
      console.log('messages:', messages)

      useListenMessages()

	return (
		<div className='px-4 flex-1 overflow-auto'>
                  {loading && [...Array(5)].map((_,idx) => <MessageSkeleton key={idx}/>)}

                  {!loading && messages.length === 0 && (
                        <p className='text-center'>Send Message to start the conversation</p>
                  )}

                  {!loading && messages.length >0 && messages.map((message) => (
                        <MessageItem key={message._id} message={message}/>
                  ))}
		</div>
	);
};

export default MessagesItems


// 3:42:00