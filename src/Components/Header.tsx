import React, { FC } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

interface myProps {
    title: string
    link: string
}

const Header: FC<myProps> = ({ title, link }) => {
    return (
        <div className='w-full h-16 px-5 grid grid-cols-3 sticky top-0 z-50  items-center bg-primary'>
            <Link to={`/${link}`}>
                <IoIosArrowBack className='text-2xl col-span-1 text-white' />
            </Link>
            <h1 className='text-xl font-semibold text-white text-center '>{title}</h1>
        </div>
    )
}

export default Header
