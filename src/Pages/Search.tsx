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

const Search = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
    })

    // Get Recipe Data
    const [recipes, setRecipes] = useState([])
    const endpoint = `https://cookit.my-extravaganza.site`
    const [limit, setLimit] = useState(10)

    const fetchRecipes = async (query: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${endpoint}/recipes?page=0&limit=${limit}&name=${query}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            console.log("queried: ", response.data.data)
            setRecipes(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes("");
    }, [endpoint]);

    return (
        <Layout>
            <NavSearch
                onSubmit={(query) => fetchRecipes(query)}
            />

            {loading ? <LoadingSpinner /> : <>
                {recipes.map((post: any) => {
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
                        />
                    )
                })}
            </>}

            <NavBottom />
        </Layout>
    )
}

export default Search