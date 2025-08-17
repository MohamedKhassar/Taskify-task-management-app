import { Github } from 'lucide-react'
import React from 'react'

const SSOBtn = () => {
    return (
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <button className='bg-slate-700 hover:bg-slate-800 duration-300 cursor-pointer p-3 text-white flex gap-2 justify-center rounded-xl items-center font-semibold'><Github className='fill-white' />Github</button>
            <button className='bg-white hover:bg-slate-50 duration-300 cursor-pointer p-3 flex gap-2 justify-center rounded-xl items-center border border-gray-200 font-semibold'>
                <img src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-internet-icon-vector-png-image_9183287.png" alt="Google Logo" className='size-6' />
                Google</button>
        </div>
    )
}

export default SSOBtn