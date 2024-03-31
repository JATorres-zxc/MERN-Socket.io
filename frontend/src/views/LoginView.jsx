import React from 'react'

const LoginView = () => {
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-900'>
				<h1 className='text-3xl font-semibold text-center text-gray-100'>
					Login
					<span className='text-blue-500'> Chatprj</span>
				</h1>

				<form>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-gray-300'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-gray-300'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
						/>
					</div>
                    
					<a href='#' className='text-sm  hover:underline hover:text-blue-500 mt-4 inline-block text-gray-300'>
						{"Don't"} have an account?
					</a>

					<div>
						<button className='btn btn-block btn-sm mt-4 text-gray-300'>Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginView