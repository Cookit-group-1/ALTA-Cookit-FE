import React, { useEffect } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdModeComment, MdFavorite } from 'react-icons/md'
import Carousel from '../Components/Carousel'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import CardComment from '../Components/CardComment'
import PostBox from '../Components/PostBox'
import Swal from 'sweetalert2'
interface Ingredients {
    id: number,
    name: string,
    quantity: number,
    unit: string
}
interface Steps {
    id: number,
    name: string
}

const Recipe = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const { recipeID } = useParams();
    const [recipe, setRecipe] = useState<any>([])
    const [serving, setServing] = useState(1)

    // Get Recipe
    const [loading, setLoading] = useState(true)
    const endpoint = `https://cookit.my-extravaganza.site`

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

    const handleComment = () => {
        console.log("Handle Comment")
    }

    const handleLike = () => {
        console.log("Handle Like")
    }

    const handleChangeServing = (amount: number) => {
        // setRecipeDetails({ ...recipeDetails, serving: Math.max(0, amount) })
        setServing(Math.max(0, amount))
    }

    // add to cart
    const addToCart = (id: number) => {
        axios.post(`https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/carts`, {
            "ingredient_id": id,
            "quantity": 1
        }, {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
            .then((response) => {
                console.log("add to cart: ", response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'successful add to cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((err) => { console.log(err) })
    }

    // Fetch Comments
    const [comments, setComments] = useState<any[]>([])
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${endpoint}/recipes/${recipeID}/comments?page=0&limit=10`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            console.log("Comments: ", response.data.data)
            setComments(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    // New Comment
    const [profilePicture, setProfilePicture] = useState<any>()
    const fetchDataUser = async () => {
        try {
            const response = await axios.get(`${endpoint}/users`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            console.log(response.data.data)
            setProfilePicture(response.data.data.profile_picture)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const postComment = async (post: string) => {
        setLoading(true)
        try {
            const response = await axios.post(`${endpoint}/recipes/${recipeID}/comments`,
                {
                    comment: post
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
            console.log(response.data.data)
            setProfilePicture(response.data.data.profile_picture)
        } catch (error) {
            console.error(error);
        } finally {
            fetchRecipeDetails();
            fetchDataUser();
            fetchComments();
        }
    };


    const handleSubmitComment = (post: string) => {
        postComment(post)
        console.log("New Comment", post)

    }

    // Fetching Data
    useEffect(() => {
        fetchRecipeDetails();
        fetchDataUser();
        fetchComments();
    }, [endpoint]);

    return (
        <Layout>
            <NavBack
                title={"Recipe"}
            />

            {loading ? <LoadingSpinner /> : <>

                <div className='flex w-full flex-col items-center px-4 gap-4 py-4 border-x-2'>
                    {/* Title Block */}
                    <div className='flex flex-col justify-center items-center text-center'>
                        {/* Recipe Name */}
                        <h1 className='font-bold flex text-3xl'>
                            {recipe.name}

                            {recipe.status === "OpenForSale" ?
                                <IoIosCheckmarkCircle className='text-accent text-xl' /> :
                                <></>
                            }
                        </h1>
                        <h2>{`by ${recipe.username}`}</h2>

                        <div className='grid grid-cols-2 gap-10 text-secondary justify-items-center mt-1'>
                            {/* Comments */}
                            <div className='flex'>
                                <button
                                    className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'
                                    onClick={handleComment}
                                >
                                    <MdModeComment className='text-lg' />
                                    {recipe.total_comment}
                                </button>
                            </div>

                            {/* Likes */}
                            <div className='flex'>
                                <button
                                    className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'
                                    onClick={handleLike}
                                >
                                    <MdFavorite className='text-xl' />
                                    {recipe.total_like}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className='self-start'>{recipe.description}</p>

                    {/* Image Carousel */}
                    {recipe.images ?
                        (recipe.images.length > 1 ?
                                <Carousel
                                    images={recipe.images}
                                /> :
                                <div className='w-full'>
                                    <div className='h-0 pb-2/3 relative mt-4'>
                                        <img
                                            src={recipe.images[0].url_image}
                                            className='inset-0 absolute w-full h-full object-cover rounded-lg'
                                        />
                                    </div>
                                </div>
                        )
                        : <></>
                    }


                    {/* Ingredients */}
                    {recipe.ingredients ?
                        <div className="w-full flex flex-col gap-2">
                            <h3 className='text-primary font-semibold'>Ingredients</h3>

                            {/* Servings */}
                            <div className='flex items-center font-bold'>
                                <button
                                    className='btn rounded-l-lg rounded-r-none text-primary text-2xl'
                                    onClick={() => handleChangeServing(serving - 1)}
                                >-</button>
                                <input
                                    type="number"
                                    name='serving'
                                    value={serving.toString()}
                                    className='input input-neutral w-14 border-neutral rounded-none text-center'
                                    onChange={(event) => handleChangeServing(Number(event.target.value))}
                                    min={1}
                                />
                                <button
                                    className='btn rounded-r-lg rounded-l-none text-primary text-2xl'
                                    onClick={() => handleChangeServing(serving + 1)}
                                >+</button>
                                <p className='ml-4 font-semibold'>Servings</p>
                            </div>

                            {/* Table */}
                            <table className="table table-auto table-zebra -z-10 w-full">
                                <tbody>
                                    {recipe.ingredients[0].ingredient_details.map((ingredient: Ingredients) => {
                                        return (
                                            <tr key={ingredient.id}>
                                                <td className='whitespace-normal py-2'>{ingredient.name}</td>
                                                <td className='py-2'>{ingredient.quantity * serving}</td>
                                                <td className='py-2'>{ingredient.unit}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {/* Purchase */}
                            {recipe.status !== "None" ?
                                <div className='flex flex-col border-2 border-primary mt-1 px-2 pb-2'>
                                    <p className='self-center text-primary font-semibold bg-white -mt-3 px-2'>Buy Ingredients</p>
                                    <p>This is a verified recipe, you can directly purchase the ingredients for
                                        <span className='text-primary'> {recipe.ingredients[0].price} / batch</span>
                                    </p>
                                    <div className='grid grid-cols-2 items-center font-bold'>
                                        <div className='flex'>
                                            <button
                                                className='btn rounded-l-lg rounded-r-none text-primary text-2xl'
                                                onClick={() => handleChangeServing(serving - 1)}
                                            >-</button>
                                            <input
                                                type="number"
                                                name='serving'
                                                value={serving.toString()}
                                                className='input input-neutral w-14 border-neutral rounded-none text-center'
                                                onChange={(event) => handleChangeServing(Number(event.target.value))}
                                                min={1}
                                            />
                                            <button
                                                className='btn rounded-r-lg rounded-l-none text-primary text-2xl'
                                                onClick={() => handleChangeServing(serving + 1)}
                                            >+</button>
                                        </div>
                                        <button onClick={() => addToCart(recipe.id, serving)} className='btn btn-secondary w-40 justify-self-end'>Add to Cart</button>
                                    </div>
                                </div> :
                                <></>}
                        </div>
                        : <></>}

                    {/* Steps */}
                    {recipe.steps ?
                        <div className="w-full flex flex-col gap-2">
                            <h3 className='text-primary font-semibold'>Preparation</h3>
                            <ol className='list-decimal ml-6'>
                                {recipe.steps.map((step: Steps) => {
                                    return (
                                        <li key={step.id} className='mb-2'>{step.name}</li>
                                    )
                                })}

                            </ol>
                        </div>
                        : <></>}

                    {/* Comments */}
                    <div className="w-full flex flex-col gap-2">
                        <h3 className='text-primary font-semibold'>Comments</h3>
                        <PostBox
                            onSubmit={handleSubmitComment}
                            profilePicture={profilePicture}
                        />
                    </div>

                </div>

                {comments.map((comment: any) => {
                    return (
                        <CardComment
                            key={comment.id}
                            profileID={18}
                            username={comment.username}
                            userRole={comment.user_role}
                            profilePicture={comment.profile_picture}
                            comment={comment.comment}
                        />
                    )
                })}

            </>}

            <NavBottom />
        </Layout >
    )
}

export default Recipe