import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import Followers from '../Components/Followers'
import Following from '../Components/Following'
import Header from '../Components/Header'
import Swal from 'sweetalert2'
import NavBack from '../Components/NavBack'

const Follow = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isNavigate, setIsNavigate] = useState(location.state.title)
    const [followers, setFollowers] = useState<any>([])
    const [following, setFollowing] = useState<any>([])
    const [cookies, setCookies] = useCookies(['user'])
    const [toUserId, setToUserId] = useState<any>([])
    const [fromUserId, setFromUserId] = useState<any>([])
    const token = cookies.user.token

    // get followers
    const getFollowers = async () => {
        await axios.get('https://cookit.my-extravaganza.site/users/follower', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log('d', response.data.data)
                setFollowers(response.data.data)

            })
            .catch((error) => [
                console.error('err', error)
            ])
        console.log(cookies.user.id)
    }

    // follow back user
    const handleFollback = async (id: number) => {
        const headers = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookies.user.token}`
            },
        };

        fetch(`https://cookit.my-extravaganza.site/users/follow/${id}`, headers)
            .then(response => response.json())
            .then(data => {
                console.log('fre', data.data)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Request has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => console.error(error));
    }

    // unFollow user
    const handleUnfollow = async (id: number) => {
        console.log(id)
        await axios.delete(`https://cookit.my-extravaganza.site/users/unfollow/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
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
        await axios.get('https://cookit.my-extravaganza.site/users/following', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log('f', response.data.data)
                setFollowing(response.data.data)
            })
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
                {/* <Header link={`/timeline/:${cookies.user.id}`} title={isNavigate ? isNavigate : 'followers'} /> */}
                <nav className='w-full h-12 bg-primary sticky top-0 grid grid-cols-2 justify-center items-center text-center'>
                    <p onClick={() => setIsNavigate('Followers')} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate == 'Followers' ? 'border-b-[3px] border-secondary font-semibold' : ''} `} >Followers</p>
                    <p onClick={() => setIsNavigate('Following')} className={`text-white place-self-center cursor-pointer w-fit py-2  ${isNavigate == 'Following' ? 'border-b-[3px] border-secondary font-semibold' : ''} `} >Following</p>
                </nav>
                <div className='w-full md:w-1/2 px-2 py-3 '>
                    {isNavigate == 'Followers'
                        ? <>
                            {followers?.map((item: any, index: number) => {
                                console.log('3', item)
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
                                console.log('fr', item.id)
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
            </div>
        </div>
    )
}

export default Follow
