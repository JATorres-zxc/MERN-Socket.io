import React from 'react'

const GenderCheckboxItem = () => {
    return (
        <div className='flex mt-2'>
            <div className='form-control '>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Male</span>
                    <input type='checkbox' className='checkbox border-slate-900 bg-gray-400' />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Female</span>
                    <input type='checkbox' className='checkbox border-slate-900 bg-gray-400' />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckboxItem