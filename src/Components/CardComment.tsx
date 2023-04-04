import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosCheckmarkCircle } from 'react-icons/io'

interface CardCommentProps {
    profileID: number
    username: string
    comment: string
    profilePicture: string
    userRole: string
    image: string | null
}

const CardComment: FC<CardCommentProps> = ({
    profileID,
    username,
    comment,
    profilePicture,
    userRole,
    image
}) => {
    const navigate = useNavigate()

    return (
        <div className="w-full bg-base-100 border-2 border-t-0 flex gap-4 p-4">
            {/* Profile Picture */}
            <div className='w-2/12'>
                <div onClick={() => navigate(`/profile/${profileID}`)} className='h-0 pb-1/1 relative hover:cursor-pointer'>
                    <img
                        src={profilePicture}
                        className='inset-0 absolute w-full h-full object-cover rounded-full'
                    />
                </div>
            </div>

            {/* Comment */}
            <div className='w-10/12 flex flex-col'>
                <h1 className='font-semibold flex'>
                    {username}
                    {userRole == "VerifiedUser" ?
                        <IoIosCheckmarkCircle className='text-accent' /> :
                        <></>
                    }
                </h1>
                <p className='font-light'>{comment}</p>
                {/* Image */}
                {image != null ?
                    <div className='h-0 w-full pb-2/3 relative'>
                        <img
                            src={image} alt="Image preview"
                            className="inset-0 absolute w-full h-full object-cover rounded-lg"
                        />
                    </div> :
                    <></>}
            </div>
        </div>
    )
}

export default CardComment