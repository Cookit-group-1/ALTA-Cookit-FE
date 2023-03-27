import React, { FC } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdAddShoppingCart } from 'react-icons/md'

interface CardQuoteProps {
    username: string
    profilePicture: string
    postType: string
    recipeName: string
    recipePicture: string
    verifiedUser: boolean
    verifiedRecipe: boolean
    handleCart?: React.MouseEventHandler
    handleRedirect?: React.MouseEventHandler
}

const CardQuote: FC<CardQuoteProps> =
    ({
        username,
        profilePicture,
        postType,
        recipeName,
        recipePicture,
        verifiedUser,
        verifiedRecipe,
        handleCart,
        handleRedirect
    }) => {
        return (
            <div className="w-full bg-base-100 border mt-2 rounded-lg">
                <div className='flex gap-2 p-4'>


                    {/* Profile Picture */}
                    <div className='w-2/12'>
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
                                <p className='font-light text-neutral-500'>{`· ${postType}`}</p>
                            </div>

                            {/* Shopping Cart for Verified Recipes */}
                            {verifiedRecipe ?
                                <MdAddShoppingCart className='text-accent text-2xl' /> :
                                <></>
                            }
                        </div>

                        {/* Recipe Name */}
                        <button className='font-semibold text-primary'>{recipeName}</button>


                    </div>
                </div>

                {/* Recipe Photo */}
                <div className='h-0 w-full pb-2/3 relative'>
                    <img
                        src={recipePicture}
                        className='inset-0 absolute w-full h-full object-cover rounded-b-lg'
                    />
                </div>
            </div>
        )
    }

export default CardQuote