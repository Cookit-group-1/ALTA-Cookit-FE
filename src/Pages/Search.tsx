import React, { useEffect, useState } from 'react'
import CardPost from '../Components/CardPost'
import CardQuote from '../Components/CardQuote'
import Layout from '../Components/Layout'
import NavBottom from '../Components/NavBottom'
import NavSearch from '../Components/NavSearch'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import LoadingSpinner from '../Components/LoadingSpinner'
import Swal from 'sweetalert2'
import CardUser from '../Components/CardUser'

const Search = () => {
    const [cookies, setCookie] = useCookies(['user', 'cart'])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [loadnew, setLoadnew] = useState(false)
    const [recipeMode, setRecipeMode] = useState(true)

    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
    })

    // Get Recipe Data
    const [recipes, setRecipes] = useState([])
    const [people, setPeople] = useState([])
    const endpoint = `https://cookit.my-extravaganza.site`
    const [limit, setLimit] = useState(10)

    const fetchRecipes = async (query: string) => {
        try {
            const response = await axios.get(`${endpoint}/recipes?page=0&limit=${limit}&name=${query}`, {
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
        }
    };

    const fetchPeople = async (query: string) => {
        try {
            const response = await axios.get(`${endpoint}/users/search?offset=${limit}&q=${query}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            setPeople(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setLoadnew(false);
        }
    };

    useEffect(() => {
        if (recipeMode) {
            fetchRecipes("");
        } else {
            fetchPeople("")
        }
    }, [endpoint, recipeMode, limit]);

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

    const handleSearch = (query: string) => {
        setLoading(true)
        if (recipeMode) {
            fetchRecipes(query);
        } else {
            fetchPeople(query);
        }
    }

    return (
        <Layout>
            <NavSearch
                onSubmit={(query) => handleSearch(query)}
                handleRecipe={() => setRecipeMode(true)}
                handlePeople={() => setRecipeMode(false)}
            />

            {loading ? <LoadingSpinner /> : <>
                {recipeMode ?
                    (
                        recipes.map((post: any) => {
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
                                                recipePicture={post.replied_recipe.images ? post.replied_recipe.images[0].url_image : null}
                                                verifiedUser={post.replied_recipe.user_role === "VerifiedUser"}
                                                verifiedRecipe={post.replied_recipe.status === "OpenForSale"}
                                                handleCart={() => handleCart(post.replied_recipe.ingredients[0].id)}
                                            />
                                        </> :
                                        <></>}
                                </CardPost>
                            )
                        })
                    ) :

                    (people.map((person: any) => {
                        return (
                            <CardUser
                                key={person.id}
                                username={person.username}
                                profileID={person.id}
                                profilePicture={person.profile_picture}
                                verifiedUser={person.role === "VerifiedUser"}
                                profileBio={person.bio}
                            />
                        )
                    }))}

            </>}

            <button
                className={`w-full ${loadnew ? 'animate-pulse bg-neutral-100' : ''} border-x-2 text-neutral-400 py-2 text-light hover:bg-neutral-100`}
                onClick={() => setLimit(limit + 10)}
            > Load More </button>

            <NavBottom />
        </Layout>
    )
}

export default Search