import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutItem = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto py-3'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutItem;
