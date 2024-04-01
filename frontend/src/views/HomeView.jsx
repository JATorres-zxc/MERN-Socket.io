import React from 'react'
import SidebarItem from '../components/sidebarComponents/SidebarItem'
import MessageContainerItem from '../components/messagesComponents/MessageContainerItem'

const HomeView = () => {
return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden'>
        <SidebarItem/>
        <MessageContainerItem/>
    </div>
)
}

export default HomeView