import React from 'react';
import ConversationItem from './ConversationItem';

const ConversationsItem = () => {
    return (
        <div className=' py-2 flex flex-col overflow-auto'>
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
        </div>
    );
};

export default ConversationsItem;