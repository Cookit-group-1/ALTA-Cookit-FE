import React, { FC, useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdAddShoppingCart, MdModeComment, MdFavorite, MdMoreVert, MdDeleteForever, MdOutlineReply } from 'react-icons/md'
import { ImLoop2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Swal from 'sweetalert2'
import ButtonLike from './ButtonLike'

interface CardPostProps {
    children?: React.ReactNode
    username: string
    profileID: number
    recipeID: number
    profilePicture: string
    postType: string
    postPicture?: string
    recipeName: string | null
    description: string | null
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
        profileID,
        recipeID,
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
    }) => {
        const navigate = useNavigate()
        const [cookies, setCookie] = useCookies(['user'])
        const handleToPost = () => {
            if (postType === "Cooked") {
                navigate(`/posts/${recipeID}`)
            } else {
                navigate(`/recipes/${recipeID}`)
            }
        }

        // Delete Post
        const [deleted, setDeleted] = useState(false)

        const handleDeletePost = () => {
            Swal.fire({
                title: `Are you sure you want to delete this post?`,
                text: "You cannot undo this action!",
                icon: "warning",
                iconColor: "#DC2F02",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                confirmButtonColor: "#D9D9D9",
                cancelButtonColor: "#E85D04",
            }).then((willDelete) => {
                if (willDelete.isConfirmed) {
                    axios.delete(`https://cookit.my-extravaganza.site/recipes/${recipeID}`, {
                        headers: {
                            Authorization: `Bearer ${cookies.user.token}`,
                            Accept: 'application/json'
                        }
                    }).then((response) => {
                        Swal.fire({
                            icon: 'success',
                            iconColor: '#04e885',
                            padding: '1em',
                            title: 'Successfuly Deleted Post',
                            showConfirmButton: false,
                            timer: 1200
                        })
                    }).finally(() => setDeleted(true))
                }
            })
        }


        return (
            <div className={`w-full bg-base-100 border-2 border-t-0 gap-2 p-4 ${deleted ? 'hidden' : 'flex'}`}>
                {/* Profile Picture */}
                <div className='w-2/12'>
                    <div
                        className='h-0 pb-1/1 relative hover:cursor-pointer'
                        onClick={() => navigate(`/profile/${profileID}`)} >
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
                            </button>
                            :
                            <></>
                        }
                    </div>

                    {/* Recipe Name / Description*/}
                    {postType === "Original" || postType === "Mixed" ?
                        <p onClick={handleToPost} className='font-semibold text-primary hover:text-accent hover:cursor-pointer'>{recipeName}</p> :
                        <p className='font-light'>{description}</p>
                    }

                    {/* Recipe Photo */}
                    {postPicture !== null ?
                        <div onClick={handleToPost} className='h-0 pb-2/3 relative hover:cursor-pointer mt-4'>
                            <img
                                src={postPicture}
                                className='inset-0 absolute w-full h-full object-cover rounded-lg'
                            />
                        </div> : <></>}


                    {/* Quoted Recipe */}
                    <div>{children}</div>

                    <div className='grid grid-cols-3 text-secondary mt-1'>
                        {/* Comments */}
                        <div className='flex justify-self-start'>
                            <button
                                className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'
                                onClick={handleToPost}
                            >
                                <MdModeComment className='text-lg' />
                                {commentAmt}
                            </button>
                        </div>

                        {/* Likes */}
                        <div className='flex justify-self-center'>
                            <ButtonLike
                                id={recipeID}
                            />
                        </div>

                        {/* More */}
                        <div className='flex justify-self-end dropdown dropdown-end'>
                            <label tabIndex={0} className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'>
                                <MdMoreVert className='text-lg' />
                            </label>
                            <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
                                <li onClick={() => navigate(`/recipes/${recipeID}/reply`)}>
                                    <p>
                                        <MdOutlineReply />
                                        Reply
                                    </p>
                                </li>
                                <li
                                    onClick={() => navigate(`/recipes/${recipeID}/recook`)}
                                    className={`${postType === 'Cooked' ? 'hidden' : 'block'}`}>
                                    <p>
                                        <ImLoop2 />
                                        Recook
                                    </p>
                                </li>
                                <li
                                    onClick={handleDeletePost}
                                    className={`text-error ${profileID == cookies.user.id ? 'block' : 'hidden'}`}>
                                    <p>
                                        <MdDeleteForever />
                                        Delete Post
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default CardPost