import React, { useEffect } from 'react'
import { MdHome, MdSearch, MdShoppingCart, MdAddBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NavBottom = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    // Disable scrolling when modal is open
    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [modalOpen]);

    return (
        <div className='
        w-full sticky relative bottom-0
        sm:absolute sm:h-full sm:top-0 sm:-left-20 lg:-left-64 sm:w-20 lg:w-64
        '>
            {/* Bottom Navbar */}
            <div className='
            w-full z-30 bg-primary flex justify-between items-center text-white text-4xl py-3 px-8 gap-5
            sm:text-primary sm:bg-white sm:border-l-2 sm:fixed sm:w-20 lg:w-64
            sm:flex-col sm:h-screen sm:justify-start
            lg:items-start
            '>
                <p className='font-semibold hidden lg:flex'>Cookit</p>

                <Link className='hidden sm:flex items-center gap-2 hover:text-secondary' to={("/timeline")}>
                    <div className='w-9 justify-self-start'>
                        <div className='h-0 pb-1/1 relative hover:cursor-pointer'>
                            <img
                                src="https://media.juiceonline.com/2020/03/af3fd7d2-62fa-4512-b289-0f95748c09ab_169-600x339.jpeg"
                                className='inset-0 absolute w-full h-full object-cover rounded-full'
                            />
                        </div>
                    </div>
                    <p className='text-lg hidden lg:flex'>Profile</p>
                </Link>

                <Link className='flex items-center gap-2 hover:text-secondary' to={("/timeline")}>
                    <MdHome />
                    <p className='text-lg hidden lg:flex'>Home</p>
                </Link>
                <Link className='flex items-center gap-2 hover:text-secondary' to={("/timeline")}>
                    <MdSearch />
                    <p className='text-lg hidden lg:flex'>Search</p>
                </Link>
                <Link className='flex items-center gap-2 hover:text-secondary' to={("/cart")}>
                    <MdShoppingCart />
                    <p className='text-lg hidden lg:flex'>Cart</p>
                </Link>
                <button className='
                flex items-center gap-2 hover:text-secondary
                lg:btn lg:rounded-full lg:btn-primary'
                    onClick={() => setModalOpen(!modalOpen)}>
                    <MdAddBox className='lg:hidden' />
                    <p className='text-lg hidden lg:flex'>New Post</p>
                </button>
            </div>

            {/* Modal */}
            {modalOpen ?
                <>
                    <div onClick={() => setModalOpen(!modalOpen)} className='w-full h-full fixed inset-0 z-40 bg-black opacity-50'></div>
                    <div className='
                    w-full absolute bottom-0 z-50 bg-white flex flex-col p-4 py-8 gap-4 rounded-t-3xl max-w-xl
                    sm:fixed sm:w-2/3 sm:h-1/2 sm:inset-0 sm:m-auto sm:rounded-3xl
                    lg:w-1/2
                    '>
                        <p>What type of Post would you like to make?</p>
                        <button className='btn btn-primary rounded-full'>New Cooking</button>
                        <button className='btn btn-primary rounded-full'>New Recipe</button>
                        <button onClick={() => setModalOpen(!modalOpen)} className='btn btn-outline btn-primary rounded-full'>Cancel</button>
                    </div>
                </> :
                <></>
            }
        </div>
    )
}

export default NavBottom