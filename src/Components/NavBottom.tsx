import React, { useEffect } from 'react'
import { MdHome, MdSearch, MdShoppingCart, MdAddBox } from 'react-icons/md'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { GiKnifeFork } from 'react-icons/gi'
import { IoIosPaper } from 'react-icons/io'
import Swal from 'sweetalert2';


const NavBottom = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [cartLength, setCartLength] = useState()
    const navigate = useNavigate()

    // Profile Picture
    const [loading, setLoading] = React.useState(true)
    const endpoint = `https://cookit.my-extravaganza.site/users`
    const [img, setImg] = React.useState<any>()
    const fetchDataUser = async () => {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            setImg(response.data.data.profile_picture)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getcart = () => {
        axios.get('https://cookit.my-extravaganza.site/users/carts', {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        }).then((response) => { setCartLength(response.data.data.length) })
    }

    useEffect(() => {
        getcart()
    }, [cookies.user])

    useEffect(() => {
        fetchDataUser();
    }, [endpoint]);

    // Scroll to Top
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Disable scrolling when modal is open
    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [modalOpen]);

    // handle log out
    const logOut = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Logout successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                removeCookie("user");
                navigate("/login");
            }
        });
    };

    return (
        <div className='
        w-full bottom-0 mt-auto
        sticky 
        sm:absolute sm:h-full sm:top-0 sm:-left-20 lg:-left-64 sm:w-20 lg:w-64
        '>
            {/* Bottom Navbar */}
            <div className='
            w-full z-30 bg-primary flex justify-between items-center text-white text-4xl py-3 px-8 gap-5
            sm:text-primary sm:bg-white sm:fixed sm:w-20 lg:w-64
            sm:flex-col sm:h-screen sm:justify-start
            lg:items-start
            '>
                <button onClick={handleScrollToTop} className='font-bold hidden sm:flex sm:text-sm lg:font-semibold lg:text-4xl'>Cookit</button>

                {/* Profile Picture */}
                <div className={`hidden dropdown dropdown-bottom sm:block `} >
                    <label tabIndex={0} className={`hidden ${loading ? 'animate-pulse' : ''} hover:cursor-pointer  sm:flex items-center gap-2 hover:text-secondary`}>
                        <div className={`w-10 justify-self-start ${loading ? 'animate-pulse' : ''}`}>
                            <div className='w-10'>
                                <div className="h-0 pb-1/1 relative ">
                                    <img src={loading ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` : img}
                                        className='inset-0 absolute w-full h-full object-cover rounded-full' />
                                </div>
                            </div>
                        </div>
                        <p className='text-lg hidden lg:flex'>Profile</p>
                    </label>
                    <ul tabIndex={0} className="dropdown-content md:text-sm menu p-2 text-black shadow-lg bg-base-100 rounded-box w-52">
                        <li><Link to={`/profile/${cookies.user.id}`}>Profile</Link></li>
                        <li><Link to="/history">my purchase</Link></li>
                        <li><span onClick={logOut} >logout</span></li>
                        <li className={`${cookies.user.role === "Admin" ? 'block' : 'hidden'}`}><Link to="/verifyusers">verify users</Link></li>
                    </ul>
                </div>



                <Link className='flex items-center gap-2 hover:text-secondary' to={("/timeline")}>
                    <MdHome />
                    <p className='text-lg hidden lg:flex'>Home</p>
                </Link>
                <Link className='flex items-center gap-2 hover:text-secondary' to={("/search")}>
                    <MdSearch />
                    <p className='text-lg hidden lg:flex'>Search</p>
                </Link>
                <Link className='flex items-center gap-2 hover:text-secondary' to={("/cart")}>
                    <div className="indicator">
                        <span className="indicator-item badge text-white badge-secondary">{cartLength}</span>
                        <MdShoppingCart />
                    </div>

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
                    w-full absolute bottom-0 z-50 bg-white grid p-4 py-8 gap-4 rounded-t-3xl max-w-xl
                    sm:fixed sm:w-2/3 sm:h-64 sm:inset-0 sm:m-auto sm:rounded-3xl sm:grid-cols-2
                    lg:w-1/2
                    '>
                        <p className='hidden justify-self-center sm:flex text-xl text-center font-semibold col-span-2 my-10'>What type of Post would you like to make?</p>
                        <Link to={"/newcooking"} onClick={() => setModalOpen(!modalOpen)} className='btn flex gap-2 btn-primary rounded-full'>
                            <GiKnifeFork />
                            New Cooking
                        </Link>
                        <Link to={"/recipes/new"} onClick={() => setModalOpen(!modalOpen)} className='btn flex gap-2 btn-primary rounded-full'>
                            <IoIosPaper />
                            New Recipe
                        </Link>
                        <button onClick={() => setModalOpen(!modalOpen)} className='btn btn-outline sm:btn-sm sm:btn-circle btn-primary rounded-full sm:absolute sm:right-4 sm:top-4'>
                            <span className="sm:hidden">Cancel</span>
                            <span className="hidden sm:block">x</span>
                        </button>
                    </div>
                </> :
                <></>
            }
        </div>
    )
}

export default NavBottom