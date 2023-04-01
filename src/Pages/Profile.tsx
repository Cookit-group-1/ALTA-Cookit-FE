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
import CardQuote from '../Components/CardQuote'

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate()
    const { userID } = useParams();

    // Get User Data
    const [loading, setLoading] = useState(true)
    const [loadnew, setLoadnew] = useState(false)
    const [userData, setUserData] = useState<any>()
    const [userPosts, setUserPosts] = useState<any[]>([])
    const endpoint = `https://cookit.my-extravaganza.site`
    const [limit, setLimit] = useState(10)
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
            setLoadnew(false);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`${endpoint}/recipes?page=0&limit=${limit}&user_id=${userID}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            setUserPosts(response.data.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setLoadnew(true);
        fetchUserData();
        fetchUserPosts();
    }, [endpoint, userID, limit]);

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
                        console.log('gt', post)
                        return (
                            <CardPost
                                key={post.id}
                                verifiedUser={post.user_role === "Verified"}
                                verifiedRecipe={post.status === "OpenForSale"}
                                username={post.username}
                                profileID={post.user_id}
                                recipeID={post.id}
                                profilePicture={post.profile_picture}
                                postType={post.type}
                                postPicture={post.images ? post.images[0].url_image : null}
                                recipeName={post.name}
                                description={post.description}
                                commentAmt={post.total_comment}
                                likeAmt={post.total_like}
                                handleToPost={() => navigate(`/recipe/${post.id}`)}
                                handleToProfile={() => navigate(`/profile/${post.user_id}`)}
                            >
                                {post.replied_recipe !== undefined ?
                                    <>
                                        <CardQuote
                                            username={post.replied_recipe.username}
                                            profileID={post.replied_recipe.user_id}
                                            recipeID={post.replied_recipe.id}
                                            profilePicture={post.replied_recipe.profile_picture}
                                            postType={post.replied_recipe.type}
                                            recipeName={post.replied_recipe.name}
                                            description={post.replied_recipe.description}
                                            recipePicture={post.replied_recipe.images[0].url_image}
                                            verifiedUser={post.replied_recipe.user_role === "Verified"}
                                            verifiedRecipe={post.replied_recipe.status === "OpenForSale"}
                                        />
                                    </> :
                                    <></>}
                            </CardPost>
                        )
                    })}

                    <button
                        className={`w-full ${loadnew ? 'animate-pulse bg-neutral-100' : ''} border-x-2 text-neutral-400 py-2 text-light hover:bg-neutral-100`}
                        onClick={() => setLimit(limit + 10)}
                    > Load More </button>

                </>}

            <NavBottom />
        </Layout>
    )
}

export default Profile