import React, { FC, useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

interface CardPostProps {
    username: string
    profileID: number
    profilePicture: string
    verifiedUser: boolean
    profileBio: string
    children?: React.ReactNode
}

const CardUser: FC<CardPostProps> =
    ({
        username,
        profileID,
        profilePicture,
        verifiedUser,
        profileBio,
        children
    }) => {
        const navigate = useNavigate()

        return (
            <div className={`w-full bg-base-100 border-2 border-t-0 gap-2 p-4 flex`}>
                {/* Profile Picture */}
                <div className='w-2/12'>
                    <div onClick={() => navigate(`/profile/${profileID}`)} className='h-0 pb-1/1 relative hover:cursor-pointer'>
                        <img
                            src={profilePicture}
                            className='inset-0 absolute w-full h-full object-cover rounded-full'
                        />
                    </div>
                </div>

                <div className='w-10/12 flex justify-between'>
                    <div className='flex flex-col justify-between items-start'>
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
                        </div>
                        <div>
                            <p>
                                {profileBio}
                            </p>
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        )
    }

export default CardUser