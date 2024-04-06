import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast'

const SearchInputItem = () => {

	const [search, setSearh] = useState('')
	const {setSelectedConversation} = useConversation()
	const {conversations} = useGetConversations()

	const handleSumbit = (e) =>{
		e.preventDefault()
		if(!search) return
		
		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

		if(conversation){
			setSelectedConversation(conversation)
			setSearh('')
		} else {
			toast.error('no user found')
		}
	}

	return (
		<form className='flex items-center gap-2' onSubmit={handleSumbit}>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' 
				value={search}
				onChange={(e) => setSearh(e.target.value)}
			/>
				<button type='submit' className='btn btn-circle text-white bg-purple-900'>
					<IoSearchSharp className='w-6 h-6 outline-none' />
				</button>
		</form>
	);
};

export default SearchInputItem