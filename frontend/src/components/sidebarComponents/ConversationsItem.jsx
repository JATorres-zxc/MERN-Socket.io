import React from 'react';
import ConversationItem from './ConversationItem';
import useGetConversations from '../../hooks/useGetConversations';

const ConversationsItem = () => {

    const { loading, conversations } = useGetConversations();

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation, idx) => (
                <ConversationItem
                    key={conversation._id}
                    conversation={conversation}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};


export default ConversationsItem;