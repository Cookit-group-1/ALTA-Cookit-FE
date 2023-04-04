import React,{FC} from 'react'

interface myprops {
    name: string;
    img: string;
    handleUnfoll: React.MouseEventHandler
}

const Following:FC<myprops> = ({name, img, handleUnfoll}) => {
    return (
        <>
            <div className='grid grid-cols-5 my-5 items-center'>
                <img src={img} className='w-12 rounded-full' alt="" />
                <p className=' place-items-center col-span-2 text-start'>{name}</p>
                <button onClick={handleUnfoll} className=' col-span-2 w-3/4 lg:w-1/2 place-self-end bg-red-600 rounded-md h-8 text-white'>Unfollow</button>
            </div>
        </>
    )
}

export default Following
