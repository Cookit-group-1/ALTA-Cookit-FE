import React,{FC} from 'react'
import { IoIosArrowBack } from 'react-icons/io'

interface myProps {
    title : string
}

const Header:FC<myProps> = ({title}) => {
    return (
        <div className='w-full h-16 px-5 grid grid-cols-3 items-center bg-primary'>
            <IoIosArrowBack className='text-2xl col-span-1 text-white' />
            <h1 className='text-xl font-semibold text-white text-center '>{title}</h1>
        </div>
    )
}

export default Header
