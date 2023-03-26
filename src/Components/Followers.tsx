import React, { FC } from 'react'

interface myProps {
    img: any
    name: string
    handleFollback: React.MouseEventHandler
    isFollback: boolean
    handleUnfollow: React.MouseEventHandler
}

const Followers: FC<myProps> = ({ name, img, handleFollback,handleUnfollow, isFollback }) => {
    return (
        <>
            <div className='grid grid-cols-5 my-5 items-center '>
                <img src={img} className='w-12 rounded-full' alt="" />
                <p className=' place-items-center col-span-2 text-start'>{name}</p>
                {isFollback
                    ? <button onClick={handleUnfollow} className=' col-span-2 w-3/4 lg:w-1/2 place-self-end bg-white border-2 border-black rounded-md h-8 text-black'>Friend</button>
                    : <button onClick={handleFollback} className=' col-span-2 w-3/4 lg:w-1/2 place-self-end bg-error rounded-md h-8 text-white'>Folow back</button>
                }
            </div>
        </>
    )
}

export default Followers
