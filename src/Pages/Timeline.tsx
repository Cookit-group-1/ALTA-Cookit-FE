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

const Timeline = () => {
    const [cookies, setCookie] = useCookies(['user', 'cart'])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
        console.log(cookies.user.token)
    }, [])

    console.log(cookies.user.token)

    // Get Recipe Data
    const [recipes, setRecipes] = useState([])
    const endpoint = `https://cookit.my-extravaganza.site`
    const [limit, setLimit] = useState(10)
    const [loadnew, setLoadnew] = useState(false)

    const fetchRecipes = async () => {
        setLoadnew(true)
        try {
            const response = await axios.get(`${endpoint}/recipes?page=0&limit=${limit}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            console.log("user posts: ", response.data.data)
            setRecipes(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setLoadnew(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [endpoint, limit]);

    // add to cart
    const handleCart = (id: number) => {
        console.log('y', id)
        axios.post(`https://cookit.my-extravaganza.site/users/carts`, {
            "ingredient_id": id,
            "quantity": 1
        }, {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
            .then((response) => {
                console.log('re', response.data);
                let sum: any = 0
                if (cookies.cart) {
                    sum = parseInt(cookies.cart) + 1
                } else {
                    sum = 1
                }
                console.log('s', sum)
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
            <NavTop />

            {loading ? <LoadingSpinner /> : <>
                {recipes.map((post: any, index) => {
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

export default Timeline