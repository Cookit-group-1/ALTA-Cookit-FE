import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import Followers from '../Components/Followers'
import Following from '../Components/Following'
import Swal from 'sweetalert2'
import NavBack from '../Components/NavBack'
import LoadingSpinner from '../Components/LoadingSpinner'

const Follow = () => {
    const location = useLocation()
    const [isNavigate, setIsNavigate] = useState(location.state.title)
    const [followers, setFollowers] = useState<any>([])
    const [following, setFollowing] = useState<any>([])
    const [cookies, setCookies] = useCookies(['user'])
    const [toUserId, setToUserId] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const token = cookies.user.token

    // get followers
    const getFollowers = async () => {
        setLoading(true)
        await axios.get('https://cookit.my-extravaganza.site/users/follower', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setFollowers(response.data.data)
            })
            .catch((error) => [
                console.error( error)
            ])
        setLoading(false)
    }

    // follow back user
    const handleFollback = async (id: number) => {
        const headers = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookies.user.token}`
            },
        };
        console.log(id)
        fetch(`https://cookit.my-extravaganza.site/users/follow/${id}`, headers)
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'follow back user has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => console.error(error));
    }

    // unFollow user
    const handleUnfollow = async (id: number) => {
        await axios.delete(`https://cookit.my-extravaganza.site/users/unfollow/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Request has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    // get following data
    const getFollowing = async () => {
        setLoading(true)
        await axios.get('https://cookit.my-extravaganza.site/users/following', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setFollowing(response.data.data)
            })
        setLoading(false)
    }

    useEffect(() => {
        getFollowers()
        getFollowing()
    }, [])

    useEffect(() => {
        let toUser = []
        toUser = following.map((item: any) => item.to_user_id)
        setToUserId(toUser)

        let fromUser = []
        fromUser = followers.map((item: any) => item.from_user_id)
    }, [following])

    return (
        <div className='flex justify-center '>
            <div className='w-full h-full flex flex-col items-center'>
                <NavBack title={location.state.title} />
                <nav className='w-full h-12 bg-primary sticky top-0 grid grid-cols-2 justify-center items-center text-center'>
                    <p onClick={() => setIsNavigate('Followers')} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate == 'Followers' ? 'border-b-[3px] border-secondary font-semibold' : ''} `} >Followers</p>
                    <p onClick={() => setIsNavigate('Following')} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate == 'Following' ? 'border-b-[3px] border-secondary font-semibold' : ''} `} >Following</p>
                </nav>
                {loading
                    ? <div className='absolute w-full h-full bg-transparent flex items-center justify-center z-50'>
                        <LoadingSpinner />
                    </div>
                    : <div className='w-full md:w-1/2 px-2 py-3 '>
                        {isNavigate == 'Followers'
                            ? <>
                                {followers?.map((item: any, index: number) => {
                                    return (
                                        <Followers key={index}
                                            img={item.profile_picture}
                                            name={item.username}
                                            handleFollback={() => handleFollback(item.from_user_id)}
                                            fromUser={item.from_user_id}
                                            toUser={toUserId}
                                        />
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
                                            handleUnfoll={() => handleUnfollow(item.to_user_id)}
                                        />
                                    )
                                })}
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Follow
