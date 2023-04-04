import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io'

interface NavSearchProps {
    handlePeople: React.MouseEventHandler
    handleRecipe: React.MouseEventHandler
    onSubmit: (query: string) => void
}

const NavSearch: FC<NavSearchProps> = ({ handlePeople, handleRecipe, onSubmit }) => {
    const navigate = useNavigate()

    // Handle Searcbar
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(query);
        setQuery('');
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
    const [isPeopleActive, setIsPeopleActive] = useState(false);
    const [isRecipeActive, setIsRecipeActive] = useState(true);

    const handlePeopleClick = (event: React.MouseEvent) => {
        setIsPeopleActive(true);
        setIsRecipeActive(false);
        handlePeople(event)
    };

    const handleRecipeClick = (event: React.MouseEvent) => {
        setIsPeopleActive(false);
        setIsRecipeActive(true);
        handleRecipe(event)
    };

    const peopleButtonStyle = isPeopleActive
        ? 'border-b-4 py-2 border-secondary font-semibold' // active style
        : ''; // inactive style

    const recipeButtonStyle = isRecipeActive
        ? 'border-b-4 py-2 border-secondary font-semibold' // active style
        : ''; // inactive style

    return (
        <div className={`w-full text-xl text-white z-20 bg-primary sticky ${stickyOffset}`}>

            <div className='w-full h-16 flex flex-col items-center justify-between'>
                <div className='w-full grid grid-cols-6 justify-items-center items-center mt-6 px-4'>
                    <button onClick={() => navigate(-1)} className='justify-self-start text-2xl'>
                        <IoIosArrowBack />
                    </button>
                    <form className='col-span-4 w-full' onSubmit={handleSubmit}>
                        <input
                            type="search"
                            placeholder='Search Cookit'
                            className='input h-8 rounded-full text-black w-full'
                            value={query}
                            onChange={handleChange}
                        />
                    </form>
                    {/* <button onClick={() => navigate(-1)} className='justify-self-end hover:text-secondary text-2xl'>
                        <IoIosCheckmarkCircle />
                    </button> */}
                    <div></div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-between '>
                <nav className='flex w-full gap-2 justify-evenly'>
                    <button className={recipeButtonStyle} onClick={handleRecipeClick}>
                        Recipes
                    </button>
                    <button className={peopleButtonStyle} onClick={handlePeopleClick}>
                        People
                    </button>
                </nav>
            </div>
        </div>
    )
}

export default NavSearch