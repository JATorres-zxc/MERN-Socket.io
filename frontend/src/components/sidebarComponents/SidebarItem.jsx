import React from 'react'
import SearchInputItem from './SearchInputItem'
import ConversationsItem from './ConversationsItem'
import LogoutItem from './LogoutItem'

const SidebarItem = () => {
return (
	<div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInputItem/>
        <div className='divider px-3'></div>
        <ConversationsItem />
        <LogoutItem />
    </div>
    )
}

export default SidebarItem