import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import PostBox from '../Components/PostBox'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import CardQuote from '../Components/CardQuote'


const NewCooking = () => {
    const [loading, setLoading] = React.useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const endpoint = `https://cookit.my-extravaganza.site`

    const { recipeID } = useParams()
    const [recipe, setRecipe] = useState<any>()

    const fetchRecipeDetails = async () => {
        try {
            const response = await axios.get(`${endpoint}/recipes/${recipeID}/detail`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            console.log("recipe: ", response.data.data)
            setRecipe(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (recipeID != undefined) {
            fetchRecipeDetails()
        } else {
            setLoading(false)
        }
    }, [endpoint]);

    const postCooking = async (description: string, image: File | null) => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('description', description)
            formData.append('type', "Cooked")
            if (recipeID !== undefined) {
                formData.append('recipe_id', recipeID)
            }
            if (image !== null) {
                formData.append('image', image)
            }
            const response = await axios.post(`${endpoint}/recipes`,
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
            console.log("Post Recipe: ", response)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            {recipeID !== undefined ?
                <NavBack
                    title='Reply to'
                /> :
                <NavBack
                    title='New Cooking'
                />}


            <div className='w-full p-4'>
                <PostBox
                    placeholderText="Describe what you've made"
                    onSubmit={(post, postImage) => postCooking(post, postImage)}
                />
            </div>
            {loading ? <LoadingSpinner /> :
                <>
                    {recipeID !== undefined ?
                        <div className='w-10/12 p-4 self-end'>
                            <CardQuote
                                username={recipe.username}
                                profileID={recipe.user_id}
                                recipeID={recipe.id}
                                profilePicture={recipe.profile_picture}
                                postType={recipe.type}
                                recipeName={recipe.name}
                                description={recipe.description}
                                recipePicture={recipe.images ? recipe.images[0].url_image : null}
                                verifiedUser={recipe.user_role === "Verified"}
                                verifiedRecipe={recipe.status === "OpenForSale"}
                            />
                        </div> : <></>}
                </>}

            <NavBottom />
        </Layout>
    )
}

export default NewCooking