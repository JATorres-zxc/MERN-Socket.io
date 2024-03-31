import React from 'react'
import SearchInputItem from './SearchInputItem'
import ConversationsItem from './ConversationsItem'
import LogoutItem from './LogoutItem'

const SidebarItem = () => {
return (
    <div>
        <SearchInputItem/>
        <div className='divider px-3'></div>
        <ConversationsItem />
        <LogoutItem />
    </div>
)
}

export default SidebarItem