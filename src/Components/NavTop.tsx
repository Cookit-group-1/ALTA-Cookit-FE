import React, { FC, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios';

interface NavTopProps {
    handleTimeline?: React.MouseEventHandler
    handleRecipe?: React.MouseEventHandler
}

const NavTop: FC<NavTopProps> = ({ handleTimeline, handleRecipe }) => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    // Profile Picture
    const [img, setImg] = React.useState<any>()

    const [loading, setLoading] = React.useState(true)
    const endpoint = `https://cookit.my-extravaganza.site/users`
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

    useEffect(() => {
        fetchDataUser();
    }, [endpoint]);

    // Scroll to Top
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Sticky Navbar
    const [stickyOffset, setStickyOffset] = useState<string>('-top-16')
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (prevScrollPos > currentScrollPos) {
                // User has scrolled up
                setStickyOffset('top-0');
            } else {
                // User has scrolled down
                setStickyOffset('-top-16');
            }
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    // Navbar buttons
    const [isTimelineActive, setIsTimelineActive] = useState(true);
    const [isRecipeActive, setIsRecipeActive] = useState(false);

    const handleTimelineClick = () => {
        setIsTimelineActive(true);
        setIsRecipeActive(false);
        handleTimeline
    };

    const handleRecipeClick = () => {
        setIsTimelineActive(false);
        setIsRecipeActive(true);
    };

    const timelineButtonStyle = isTimelineActive
        ? 'border-b-4 py-2 border-secondary font-semibold' // active style
        : ''; // inactive style

    const recipeButtonStyle = isRecipeActive
        ? 'border-b-4 py-2 border-secondary font-semibold' // active style
        : ''; // inactive style

    return (
        <div className={`w-full text-xl text-white z-20 bg-primary sticky ${stickyOffset} sm:top-0`}>

            <div className='w-full h-16 flex flex-col items-center justify-between sm:hidden'>
                <div className='w-full grid grid-cols-3 justify-items-center items-center mt-6 px-4'>
                    <Link to={(`/profile/${cookies.user.id}`)} className={`w-10 justify-self-start ${loading ? 'animate-pulse' : ''}`}>
                        <div onClick={() => navigate("/")} className='h-0 pb-1/1 relative hover:cursor-pointer'>
                            <img
                                src={loading ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` : img}
                                className='inset-0 absolute w-full h-full object-cover rounded-full'
                            />
                        </div>
                    </Link>
                    <button onClick={handleScrollToTop} className='font-semibold'>Cookit</button>
                    <div></div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-between '>
                <nav className='flex w-full gap-2 justify-evenly'>
                    <button className={timelineButtonStyle} onClick={handleTimelineClick}>
                        Timeline
                    </button>
                    <button className={recipeButtonStyle} onClick={handleRecipeClick}>
                        Recipe
                    </button>
                </nav>
            </div>
        </div>
    )
}

export default NavTop