import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchInputItem = () => {
	return (
		<form className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
            <button type='submit' className='btn btn-circle text-white bg-purple-900'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
		</form>
	);
};

export default SearchInputItem