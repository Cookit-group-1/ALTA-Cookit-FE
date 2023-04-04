import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useCookies } from 'react-cookie'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import CardPost from '../Components/CardPost'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import CardQuote from '../Components/CardQuote'
import { BsPencilSquare } from 'react-icons/bs'
import Swal from 'sweetalert2'

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'cart']);
    const navigate = useNavigate()
    const location = useLocation()
    const { userID, profileID } = useParams();

    // add to cart
    const handleCart = (id: number) => {
        axios.post(`https://cookit.my-extravaganza.site/users/carts`, {
            "ingredient_id": id,
            "quantity": 1
        }, {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
            .then((response) => {
                let sum: any = 0
                if (cookies.cart) {
                    sum = parseInt(cookies.cart) + 1
                } else {
                    sum = 1
                }
                setCookie('cart', sum, { path: "/" })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'successfuly added to cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((err) => { console.log(err) })
    }

    // Get User Data
    const [loading, setLoading] = useState(true)
    const [loadnew, setLoadnew] = useState(false)
    const [userData, setUserData] = useState<any>()
    const [userPosts, setUserPosts] = useState<any[]>([])
    const endpoint = `https://cookit.my-extravaganza.site`
    const [limit, setLimit] = useState(10)

    const fetchUserData = async () => {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookies.user.token}`
            },
        };
        fetch(`${endpoint}/users`, headers)
            .then(response => response.json())
            .then(response => {
                setUserData(response.data)
                setLoading(false);
                setLoadnew(false);
                
            })
            .catch(error => console.error(error));
    };

    const fetchUserDataId = async () => {
        try {
            const response = await axios.get(`${endpoint}/users/${userID}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
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

    const goToFollow = (title: string) => {
        navigate(`/follow/${cookies.user.id}`, {
            state: {
                title: title,
            }
        })
    }

    const handleFollow = () => {
        const headers = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookies.user.token}`
            },
        };

        fetch(`https://cookit.my-extravaganza.site/users/follow/${userID}`, headers)
            .then(response => response.json())
            .then(data => {
                if (data.message == 'you already follow this user') {
                    Swal.fire({
                        text: "you already follow this user",
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'success follow this user',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'follow user has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    useEffect(() => {
        setLoadnew(true);

        if (cookies.user.id == userID) {
            fetchUserData()
        } else {
            fetchUserDataId()
        }
        fetchUserPosts();
    }, [endpoint, userID, limit]);


    return (
        <Layout>
            <NavBack
                title='Profile'
            />
            {loading ? <LoadingSpinner /> :
                <>
                    <div className='border-2 w-full'>
                        <div className=' gap-2 w-full  px-4 justify-between'>
                            <div className='grid grid-cols-3 lg:grid-cols-3 w-full gap-2'>
                                {/* Profile Picture */}
                                <div className={`w-32 justify-self-start ${loading ? 'animate-pulse' : ''}`}>
                                    <div className=' pb-1/1 mt-7 relative hover:cursor-pointer'>
                                        <img
                                            src={loading ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` : userData?.profile_picture}
                                            className='inset-0 absolute w-3/4 md:w-32 h-3/4 md:h-32 object-cover rounded-full'
                                        />
                                    </div>
                                </div>
                                {/* Username, Following-Follower, Bio */}
                                <div className='grid grid-cols-2 place-content-center gap-5 col-span-2 items-center'>
                                    <h1 className='font-bold col-span-2 text-xl md:text-xl flex'>
                                        {userData?.username}
                                        {userData.role == "VerifiedUser" ?
                                            <IoIosCheckmarkCircle className='text-accent' />
                                            : ''
                                        }
                                    </h1>
                                    <div className='absolute top-20 right-6'>
                                        {userID == cookies.user.id
                                            ? <button onClick={() => navigate('/editprofile')} className=' text-primary place-self-end mb-24 text-2xl rounded-full'><BsPencilSquare /></button>
                                            : <button onClick={handleFollow} className=' btn-primary place-self-end mb-24 w-fit px-7 py-1 rounded-full'>Follow</button>
                                        }
                                    </div>
                                    {cookies.user.id == userID
                                        ? <>
                                            <p onClick={() => goToFollow('Followers')} className='font-regular sm:text-sm md:text-lg lg:text-lg md:font-regular cursor-pointer' >{userData.followers} Followers</p>
                                            <p onClick={() => goToFollow('Following')} className='font-regular sm:text-sm md:text-lg lg:text-lg md:font-regular cursor-pointer'>{userData.following} Following</p>
                                        </>
                                        : ''
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-full py-5 pr-10 grid  px-5 border-b-2'>
                            <p>{userData?.bio}</p>
                        </div>
                    </div>

                    {userPosts.length > 0
                        ? <>{userPosts.map((post: any) => {
                            return (
                                <CardPost
                                    key={post.id}
                                    verifiedUser={post.user_role === "VerifiedUser"}
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
                                    handleToPost={() => navigate(`/recipes/${post.id}`)}
                                    handleToProfile={() => navigate(`/profile/${post.user_id}`)}
                                    handleCart={() => handleCart(post.ingredients[0].id)}
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
                                                verifiedUser={post.replied_recipe.user_role === "VerifiedUser"}
                                                verifiedRecipe={post.replied_recipe.status === "OpenForSale"}
                                            />
                                        </> :
                                        <></>}
                                </CardPost>
                            )
                        })
                        }
                        </>
                        : <div className='text-center'>
                            <p className='pt-32 text-2xl font-semibold'>Share your recipe now</p>
                            <p><span onClick={() => navigate('/newcooking')} className='text-primary cursor-pointer'>New cooking</span> or <span onClick={() => navigate('/recipes/new')} className='text-primary cursor-pointer'>New recipe</span></p>
                        </div>
                    }
                    {userPosts.length < 3
                        ? ''
                        : <button
                            className={`w-full ${loadnew ? 'animate-pulse bg-neutral-100' : ''} border-x-2 text-neutral-400 py-2 text-light hover:bg-neutral-100`}
                            onClick={() => setLimit(limit + 10)}
                        > Load More </button>
                    }
                </>}
            <NavBottom />
        </Layout>
    )
}

export default Profile