import React, { FC } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdAddShoppingCart } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface CardQuoteProps {
    username: string
    profileID: number
    recipeID: number
    profilePicture: string
    postType: string
    recipeName: string | null
    description: string | null
    recipePicture?: string
    verifiedUser: boolean
    verifiedRecipe: boolean
    handleCart?: React.MouseEventHandler
    handleRedirect?: React.MouseEventHandler
}

const CardQuote: FC<CardQuoteProps> =
    ({
        username,
        profileID,
        recipeID,
        profilePicture,
        postType,
        recipeName,
        description,
        recipePicture,
        verifiedUser,
        verifiedRecipe,
        handleCart,
    }) => {
        const navigate = useNavigate()

        const handleToPost = () => {
            if (postType === "Cooked") {
                navigate(`/posts/${recipeID}`)
            } else {
                navigate(`/recipes/${recipeID}`)
            }
        }

        return (
            <div className="w-full bg-base-100 border mt-2 rounded-lg">
                <div className='flex gap-2 p-4'>
                    {/* Profile Picture */}
                    <div onClick={() => navigate(`/profile/${profileID}`)} className='w-2/12 hover:cursor-pointer'>
                        <div className='h-0 pb-1/1 relative'>
                            <img
                                src={profilePicture}
                                className='inset-0 absolute w-full h-full object-cover rounded-full'
                            />
                        </div>
                    </div>

                    <div className='w-10/12'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-1'>
                                <p className='font-semibold flex'>
                                    {/* Username */}
                                    {username}

                                    {/* Verified User Checkmark */}
                                    {verifiedUser ?
                                        <IoIosCheckmarkCircle className='text-accent' /> :
                                        <></>
                                    }
                                </p>

                                {/* Post Type */}
                                <p className='font-light text-neutral-500'>{`· ${postType === "Original" ? "new recipe" : (postType === "Cooked" ? "new cooking" : "recooked")}`}</p>
                            </div>

                            {/* Shopping Cart for Verified Recipes */}
                            {verifiedRecipe ?
                                <button onClick={handleCart}>
                                    <MdAddShoppingCart className='text-accent text-2xl hover:text-secondary' />
                                </button> :
                                <></>
                            }
                        </div>

                        {/* Recipe Name / Description*/}
                        {postType === "Original" || postType === "Mixed" ?
                            <p onClick={handleToPost} className='font-semibold text-primary hover:text-accent hover:cursor-pointer'>{recipeName}</p> :
                            <p className='font-light'>{description}</p>
                        }


                    </div>
                </div>

                {/* Recipe Photo */}
                {recipePicture !== null ?
                    <div onClick={handleToPost} className='h-0 w-full pb-2/3 relative'>
                        <img
                            src={recipePicture}
                            className='inset-0 absolute w-full h-full object-cover rounded-b-lg'
                        />
                    </div> :
                    <></>}
            </div>
        )
    }

export default CardQuote