import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CardPost from '../Components/CardPost'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import { IoIosCheckmarkCircle } from 'react-icons/io'

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate()
    const { userID } = useParams();

    // Get User Data
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<any>()
    const [userPosts, setUserPosts] = useState<any[]>([])
    const endpoint = `https://cookit.my-extravaganza.site`
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${endpoint}/users/${userID}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            console.log(response.data.data)
            setUserData(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`${endpoint}/recipes?page=0&limit=3&user_id=${userID}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            setUserPosts(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetchUserData();
        fetchUserPosts();
    }, [endpoint, userID]);

    return (
        <Layout>
            <NavBack
                title='Profile'
            />

            {loading ? <LoadingSpinner /> :
                <>

                    <div className='flex gap-2 w-full py-4 px-4 border-2 justify-between'>
                        <div className='flex gap-2'>
                            {/* Profile Picture */}
                            <div className={`w-32 justify-self-start ${loading ? 'animate-pulse' : ''}`}>
                                <div className='h-0 pb-1/1 relative hover:cursor-pointer'>
                                    <img
                                        src={loading ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` : userData?.profile_picture}
                                        className='inset-0 absolute w-full h-full object-cover rounded-full'
                                    />
                                </div>
                            </div>
                            {/* Username, Following-Follower, Bio */}
                            <div className='flex flex-col justify-center'>
                                <h1 className='font-bold text-3xl flex'>
                                    {userData?.username}
                                    {userData.role == "Verified" ?
                                        <IoIosCheckmarkCircle className='text-accent' /> :
                                        <></>
                                    }
                                </h1>
                                <p></p>
                                <p>{userData?.bio}</p>
                            </div>
                        </div>
                        {userID == cookies.user.id ?
                            <button onClick={() => navigate('/editprofile')} className='btn btn-primary btn-sm rounded-full'>Edit Profile</button> :
                            <button className='btn btn-primary btn-sm rounded-full'>Follow</button>}
                    </div>

                    {userPosts.map((post: any) => {
                        console.log('gt',post )
                        return (
                            <CardPost
                                key={post.id}
                                verifiedUser={post.user_role === "Verified"}
                                verifiedRecipe={post.status === "OpenForSale"}
                                username={post.username}
                                profileID={post.user_id}
                                profilePicture={post.profile_picture}
                                postType={post.type}
                                postPicture={post.images ? post.images[0].url_image : null}
                                recipeName={post.name}
                                commentAmt={post.total_comment}
                                likeAmt={post.total_like}
                                handleToPost={() => navigate(`/recipe/${post.id}`)}
                            />
                        )
                    })}

                </>}

            <NavBottom />
        </Layout>
    )
}

export default Profile