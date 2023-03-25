import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface NavTopProps {
    handleTimeline?: React.MouseEventHandler
    handleRecipe?: React.MouseEventHandler
}

const NavTop: FC<NavTopProps> = ({ handleTimeline, handleRecipe }) => {
    const navigate = useNavigate()

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
        <div className={`w-full text-xl text-white z-0 bg-primary sticky ${stickyOffset} sm:top-0`}>

            <div className='w-full h-16 flex flex-col items-center justify-between sm:hidden'>
                <div className='w-full grid grid-cols-3 justify-items-center items-center mt-6 px-4'>
                    <div className='w-10 justify-self-start'>
                        <div onClick={() => navigate("/")} className='h-0 pb-1/1 relative hover:cursor-pointer'>
                            <img
                                src="https://media.juiceonline.com/2020/03/af3fd7d2-62fa-4512-b289-0f95748c09ab_169-600x339.jpeg"
                                className='inset-0 absolute w-full h-full object-cover rounded-full'
                            />
                        </div>
                    </div>
                    <p className='font-semibold'>Cookit</p>
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