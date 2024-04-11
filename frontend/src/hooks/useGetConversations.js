import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"


const useGetConversations = () => {
	// using the useState hook to manage loading state, initialized as false
	const [loading, setLoading] = useState(false)
	// using the useState hook to manage conversations state, initialized as an empty array
	const [conversations, setConversations] = useState([])

	// useEffect hook to perform side effects, in this case, fetching conversations data
	useEffect(() => {
		// funcction
		const getConversations = async () => {
			setLoading(true) // true na to show data is being fetch
			try {
				
				const res = await fetch("/api/users")// fetch data from server

				const data = await res.json() // parse as json
				if (data.error) {
					throw new Error(data.error)
				}
				// update csetConversations state wuth fetched data
				setConversations(data)
			} catch (error) {
				toast.error(error.message)
			} finally {
				// setloading to false na after fetching
				setLoading(false)
			}
		};
		// call the getConversations function when the component mounts (empty dependency array)
		getConversations()
	}, []) // em pty dependecy array so this effect only runs when compoent mounts

	return { loading, conversations } // return object containing loading and conversations state
};
export default useGetConversations;