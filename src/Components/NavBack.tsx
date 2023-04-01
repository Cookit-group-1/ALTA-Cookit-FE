import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosCheckmarkCircle, IoIosArrowBack } from 'react-icons/io'

interface NavBackProps {
    title: string
}

const NavBack: FC<NavBackProps> = ({ title }) => {
    const navigate = useNavigate()

    // Scroll to Top
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`w-full text-xl text-white z-20 bg-primary sticky top-0`}>

            <div className='w-full h-16 flex flex-col items-center justify-between'>
                <div className='w-full grid grid-cols-3 justify-items-center items-center mt-6 px-4'>
                    <button onClick={() => navigate(-1)} className='justify-self-start text-2xl'>
                        <IoIosArrowBack />
                    </button>
                    <button onClick={handleScrollToTop} className='font-semibold'>{title}</button>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default NavBack