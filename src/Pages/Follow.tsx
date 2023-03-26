import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoIosArrowBack } from 'react-icons/io'
import Followers from '../Components/Followers'
import Following from '../Components/Following'

const Follow = () => {
    const [isNavigate, setIsNavigate] = useState(false)
    const [followers, setFollowers] = useState<any>([])
    const [following, setFollowing] = useState<any>([])
    const [cookies, setCookies] = useCookies(['user'])
    const token = cookies.user.token

    // get followers
    const getFollowers = async () => {
        await axios.get('https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/followed?page=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data.data)
                setFollowers(response.data.data.followers)
            })
    }

    // follow back user
    const handleFollback = async (id: number) => {
        await axios.post('https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/followers', {
            "to_user_id": id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
            })
    }

    // unFollow user
    const handleUnfollow = async (id: number) => {
        await axios.delete(`https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/followers/1`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
            })
    }

    // get following data
    const getFollowing = async () => {
        await axios.get('https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/following?page=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log('f', response.data.data.following)
                setFollowing(response.data.data.following)
            })
    }


    useEffect(() => {
        getFollowers()
        getFollowing()
    }, [])


    return (
        <div className='flex justify-center '>
            <div className='w-full h-full flex flex-col items-center'>
                <div className='w-full h-16 px-5 grid grid-cols-3 items-center bg-primary'>
                    <IoIosArrowBack className='text-2xl col-span-1 text-white' />
                    <h1 className='text-xl font-semibold text-white text-center '>Followers</h1>
                </div>
                <nav className='w-full h-12 bg-primary sticky top-0 grid grid-cols-2 justify-center items-center text-center'>
                    <p onClick={() => setIsNavigate(false)} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate ? '' : 'border-b-[3px] border-secondary font-semibold'} `} >Following</p>
                    <p onClick={() => setIsNavigate(true)} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate ? 'border-b-[3px] border-secondary font-semibold' : ''} `} >Followers</p>
                </nav>
                <div className='w-full md:w-1/2 px-2 py-3 '>
                    {isNavigate
                        ? <>
                            {followers?.map((item: any, index: number) => {
                                return (
                                    <Followers key={index}
                                        img={item.profile_picture}
                                        name={item.username}
                                        handleFollback={() => handleFollback(item.id)}
                                        isFollback={item.is_followed_back}
                                        handleUnfollow={() => handleUnfollow(item.id)} />
                                )
                            })}
                        </>
                        :
                        <>
                            {following?.map((item: any, index: number) => {
                                return (
                                    <Following
                                        key={index}
                                        name={item.username}
                                        img={item.profile_picture}
                                        handleUnfoll={() => handleUnfollow(item.id)}
                                    />
                                )
                            })}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Follow
