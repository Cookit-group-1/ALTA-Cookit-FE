import React, { useEffect, useState } from 'react'
import CardPost from '../Components/CardPost'
import CardQuote from '../Components/CardQuote'
import NavBottom from '../Components/NavBottom'
import NavTop from '../Components/NavTop'
import Layout from '../Components/Layout'
import LoadingSpinner from '../Components/LoadingSpinner'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import LazyLoading from '../Components/LazyLoading'


const Timeline = () => {
    const [cookies, setCookie] = useCookies(['user', 'cart'])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [lazyLoad, setLazyLoad] = useState(false)


    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
    }, [])

    // Get Recipe Data
    const [recipes, setRecipes] = useState([])
    const endpoint = `https://cookit.my-extravaganza.site`
    const [limit, setLimit] = useState(10)
    const [loadnew, setLoadnew] = useState(false)
    const [timelineMode, setTimelineMode] = useState(false)


    const fetchRecipes = async () => {
        setLoadnew(true)
        setLazyLoad(true)
        const recipeUrl = timelineMode ?
            'users/recipes/timeline?' :
            'recipes?type=Original&type=Mixed&'
        try {
            const response = await axios.get(`${endpoint}/${recipeUrl}page=0&limit=${limit}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            setRecipes(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setLoadnew(false);
            setLazyLoad(false)
        }
    };



    useEffect(() => {
        const handleScroll = () => {
            const pageHeight = document.documentElement.scrollHeight;
            let position = pageHeight
            let y = window.scrollY;
            if (y > position - 916) {
                if (limit < recipes.length) {
                    setLazyLoad(true)
                } else {
                    setLazyLoad(false)
                }
                setLimit(limit + 10)
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [limit]);


    useEffect(() => {
        fetchRecipes();
    }, [endpoint, limit, timelineMode]);

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

    return (
        <Layout>
            <NavTop
                handleTimeline={() => {
                    setLoading(true)
                    setTimelineMode(true)
                }}
                handleRecipe={() => {
                    setLoading(true)
                    setTimelineMode(false)
                }}
            />
            {loading
                ? <div className='absolute w-full h-full bg-transparent flex items-center justify-center z-50'>
                    <LoadingSpinner />
                </div>
                : <>
                    {recipes.map((post: any, index) => {
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
                                            profileID={post.replied_recipe.user_id }
                                            recipeID={post.replied_recipe.id}
                                            profilePicture={post.replied_recipe.profile_picture}
                                            postType={post.replied_recipe.type}
                                            recipeName={post.replied_recipe.name}
                                            description={post.replied_recipe.description}
                                            recipePicture={post.replied_recipe.images ? post.replied_recipe.images[0].url_image : null}
                                            verifiedUser={post.replied_recipe.user_role === "VerifiedUser"}
                                            verifiedRecipe={post.replied_recipe.status === "OpenForSale"}
                                            handleCart={() => handleCart(post.replied_recipe.ingredients[0].id)}
                                        />
                                    </> :
                                    <></>}
                            </CardPost>
                        )
                    })}


                    {
                        lazyLoad
                            ? <div className='w-full h-10 py-2 '>
                                <LazyLoading color={'orange'} size={50} />
                            </div>
                            : ''
                    }
                </>}
            <NavBottom />
        </Layout>
    )
}

export default Timeline