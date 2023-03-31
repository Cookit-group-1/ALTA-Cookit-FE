import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import Followers from '../Components/Followers'
import Following from '../Components/Following'
import Header from '../Components/Header'

const Follow = () => {
    const navigate = useNavigate()
    const [isNavigate, setIsNavigate] = useState('following')
    const [followers, setFollowers] = useState<any>([])
    const [following, setFollowing] = useState<any>([])
    const [cookies, setCookies] = useCookies(['user'])
    const token = cookies.user.token

    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
    }, [])




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
        await axios.delete(`https://cookit.my-extravaganza.site/users/followers/${id}`, {
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
        await axios.get('https://cookit.my-extravaganza.site/users/following', {
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
                <Header title={isNavigate ? isNavigate : 'followers'} />
                <nav className='w-full h-12 bg-primary sticky top-0 grid grid-cols-2 justify-center items-center text-center'>
                    <p onClick={() => setIsNavigate('Following')} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate == 'Following' ? 'border-b-[3px] border-secondary font-semibold' : ''} `} >Following</p>
                    <p onClick={() => setIsNavigate('Followers')} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate == 'Followers' ? 'border-b-[3px] border-secondary font-semibold' : ''} `} >Followers</p>
                </nav>
                <div className='w-full md:w-1/2 px-2 py-3 '>
                    {isNavigate == 'Followers'
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
