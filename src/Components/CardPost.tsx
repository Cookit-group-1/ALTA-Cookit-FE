import React, { FC } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdAddShoppingCart, MdModeComment, MdFavorite } from 'react-icons/md'
import { ImLoop2 } from 'react-icons/im'

interface CardPostProps {
    children?: React.ReactNode
    username: string
    profilePicture: string
    postType: string
    postPicture?: string
    recipeName?: string
    description?: string
    commentAmt: number
    likeAmt: number
    verifiedUser: boolean
    verifiedRecipe: boolean
    handleCart?: React.MouseEventHandler
    handleToPost?: React.MouseEventHandler
    handleToProfile?: React.MouseEventHandler
    handleComment?: React.MouseEventHandler
    handleLike?: React.MouseEventHandler
    handleRecook?: React.MouseEventHandler
    handleRemix?: React.MouseEventHandler
}

const CardPost: FC<CardPostProps> =
    ({
        children,
        username,
        profilePicture,
        postType,
        postPicture,
        recipeName,
        description,
        commentAmt,
        likeAmt,
        verifiedUser,
        verifiedRecipe,
        handleCart,
        handleToPost,
        handleToProfile,
        handleComment,
        handleLike,
        handleRecook,
        handleRemix
    }) => {
        return (
            <div className="w-full bg-base-100 border-2 border-t-0 flex gap-2 p-4">
                {/* Profile Picture */}
                <div className='w-2/12'>
                    <div onClick={handleToProfile} className='h-0 pb-1/1 relative hover:cursor-pointer'>
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
                            <button onClick={handleCart}>
                                <MdAddShoppingCart className='text-accent text-2xl hover:text-secondary' />
                            </button>
                            :
                            <></>
                        }
                    </div>

                    {/* Recipe Name */}
                    <p onClick={handleToPost} className='font-semibold text-primary hover:text-accent hover:cursor-pointer'>{recipeName}</p>

                    {/* Post Description */}
                    <p className='font-light'>{description}</p>

                    {/* Recipe Photo */}
                    <div onClick={handleToPost} className='h-0 pb-2/3 relative hover:cursor-pointer mt-4'>
                        <img
                            src={postPicture}
                            className='inset-0 absolute w-full h-full object-cover rounded-lg'
                        />
                    </div>

                    {/* Quoted Recipe */}
                    <div>{children}</div>

                    <div className='grid grid-cols-3 text-secondary mt-1'>
                        {/* Comments */}
                        <div className='flex'>
                            <button
                                className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'
                                onClick={handleComment}
                            >
                                <MdModeComment className='text-lg' />
                                {commentAmt}
                            </button>
                        </div>

                        {/* Likes */}
                        <div className='flex'>
                            <button
                                className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'
                                onClick={handleLike}
                            >
                                <MdFavorite className='text-xl' />
                                {likeAmt}
                            </button>
                        </div>

                        {/* Recook/Remix */}
                        <div className='flex'>
                            <button className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'>
                                <ImLoop2 className='text-lg' />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

export default CardPost