import React, { useEffect, useRef } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdModeComment, MdFavorite, MdModeEdit, MdDeleteForever, MdMoreVert, MdOutlineReply } from 'react-icons/md'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Link, useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import CardComment from '../Components/CardComment'
import PostBox from '../Components/PostBox'
import Swal from 'sweetalert2'
import CardPost from '../Components/CardPost'
import CardQuote from '../Components/CardQuote'
import ButtonLike from '../Components/ButtonLike'
import { ImLoop2 } from 'react-icons/im'
import Format from '../Components/Format'
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
    const navigate = useNavigate();
    const { recipeID } = useParams();
    const { postType } = useParams();
    const [recipe, setRecipe] = useState<any>([])
    const [serving, setServing] = useState(1)

    // Draggable scroll
    // const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    // const { events } = useDraggable(ref);


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


    const handleChangeServing = (amount: number) => {
        // setRecipeDetails({ ...recipeDetails, serving: Math.max(0, amount) })
        setServing(Math.max(0, amount))
    }

    // add to cart
    const addToCart = (id: number) => {
        axios.post(`https://cookit.my-extravaganza.site/users/carts`, {
            "ingredient_id": id,
            "quantity": 1
        }, {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
            .then((response) => {
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
            setComments(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    // New Comment
    const postComment = async (post: string, postImage: File | null) => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('comment', post)
            if (postImage !== null) {
                formData.append('image', postImage)
            }
            const response = await axios.post(`${endpoint}/recipes/${recipeID}/comments`,
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
        } catch (error) {
            console.error(error);
        } finally {
            fetchRecipeDetails();
            fetchComments();
        }
    };


    const handleSubmitComment = (post: string, postImage: File | null) => {
        postComment(post, postImage)
    }

    // Delete
    const handleDeletePost = () => {
        Swal.fire({
            title: `Are you sure you want to delete this post?`,
            text: "You cannot undo this action!",
            icon: "warning",
            iconColor: "#DC2F02",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            confirmButtonColor: "#D9D9D9",
            cancelButtonColor: "#E85D04",
        }).then((willDelete) => {
            if (willDelete.isConfirmed) {
                axios.delete(`https://cookit.my-extravaganza.site/recipes/${recipeID}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.user.token}`,
                        Accept: 'application/json'
                    }
                }).then((response) => {
                    Swal.fire({
                        icon: 'success',
                        iconColor: '#04e885',
                        padding: '1em',
                        title: 'Successfuly Deleted Post',
                        showConfirmButton: false,
                        timer: 1200
                    })
                }).finally(() => navigate(-1))
            }
        })
    }


    // Fetching Data
    useEffect(() => {
        if (postType !== "posts" && postType !== "recipes") {
            navigate(-1)
        }
        fetchRecipeDetails();
        fetchComments();
    }, [endpoint]);

    return (
        <Layout>
            {postType === "recipes" ?
                <NavBack
                    title={"Recipe"}
                /> :
                <NavBack
                    title={"Post"}
                />}


            {loading ? <LoadingSpinner /> : <>

                {postType === "recipes" ?
                    <div className='flex w-full flex-col items-center px-4 gap-4 py-4 border-x-2'>
                        {/* Title Block */}
                        <div className='flex flex-col justify-center items-center text-center'>
                            {/* Recipe Name */}
                            <h1 className='font-bold flex text-3xl'>
                                <p className='flex'>
                                    {recipe.name}
                                    {recipe.status === "OpenForSale" ?
                                        <IoIosCheckmarkCircle className='text-accent text-xl' /> :
                                        <></>
                                    }
                                </p>

                            </h1>
                            <h2>{`by ${recipe.username}`}</h2>

                            <div className='grid grid-cols-3 gap-10 text-secondary justify-items-center mt-1'>
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
                                <div className='flex gap-1'>
                                    <ButtonLike
                                        id={recipe.id}
                                    />
                                </div>

                                {/* More */}
                                <div className='flex justify-self-end dropdown dropdown-end'>
                                    <label tabIndex={0} className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'>
                                        <MdMoreVert className='text-lg' />
                                    </label>
                                    <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
                                        <li onClick={() => navigate(`/recipes/${recipeID}/reply`)}>
                                            <p>
                                                <MdOutlineReply />
                                                Reply
                                            </p>
                                        </li>
                                        <li
                                            onClick={() => navigate(`/recipes/${recipeID}/recook`)}
                                            className={`${recipe.type === 'Cooked' ? 'hidden' : 'block'}`}>
                                            <p>
                                                <ImLoop2 />
                                                Recook
                                            </p>
                                        </li>
                                        <li className={`${recipe.user_id == cookies.user.id ? 'block' : 'hidden'}`}>
                                            <Link to={`edit`} >
                                                <MdModeEdit />
                                                Edit
                                            </Link>
                                        </li>
                                        <li
                                            // onClick={handleDeletePost}
                                            className={`text-error ${recipe.user_id == cookies.user.id ? 'block' : 'hidden'}`}>
                                            <p>
                                                <MdDeleteForever />
                                                Delete Post

                                            </p>

                                        </li>

                                    </ul>
                                </div>


                            </div>
                        </div>

                        {/* Description */}
                        <p className='self-start'>{recipe.description}</p>

                        {/* Image Carousel */}
                        {recipe.images ?
                            (recipe.images.length > 1 ?
                                <div className='carousel carousel-center inner-shadow p-4 space-x-2 rounded-box w-full'>
                                    {recipe.images.map((image: any) => {
                                        return (
                                            <div className='carousel-item h-0 w-full pb-2/3 relative'>
                                                <img className='inset-0 absolute w-full h-full object-cover rounded-lg' src={image.url_image} alt="Recipe Image" />
                                            </div>
                                        )
                                    })}

                                </div>
                                :
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
                                    <div className='flex flex-col gap-5 border-2 border-primary mt-1 px-2 pb-2'>
                                        <p className='self-center text-primary font-semibold bg-white -mt-3 px-2'>Buy Ingredients</p>
                                        <p>{'This is a verified recipe, you can directly purchase the ingredients for '}
                                            <span className='text-primary'><Format>{recipe.ingredients[0].price}</Format> / batch</span>
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
                                            <button onClick={() => addToCart(recipe.ingredients[0].id)} className='btn btn-secondary w-40 justify-self-end'>Add to Cart</button>
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
                            : <></>
                        }
                    </div> :
                    <CardPost
                        key={recipe.id}
                        verifiedUser={recipe.user_role === "VerifiedUser"}
                        verifiedRecipe={recipe.status === "OpenForSale"}
                        username={recipe.username}
                        profileID={recipe.user_id}
                        recipeID={recipe.id}
                        profilePicture={recipe.profile_picture}
                        postType={recipe.type}
                        postPicture={recipe.images ? recipe.images[0].url_image : null}
                        recipeName={recipe.name}
                        description={recipe.description}
                        commentAmt={recipe.total_comment}
                        likeAmt={recipe.total_like}
                        handleToPost={() => navigate(`/recipes/${recipe.id}`)}
                        handleToProfile={() => navigate(`/profile/${recipe.user_id}`)}
                    >
                        {recipe.replied_recipe !== undefined ?
                            <>
                                <CardQuote
                                    username={recipe.replied_recipe.username}
                                    profileID={recipe.replied_recipe.user_id}
                                    recipeID={recipe.replied_recipe.id}
                                    profilePicture={recipe.replied_recipe.profile_picture}
                                    postType={recipe.replied_recipe.type}
                                    recipeName={recipe.replied_recipe.name}
                                    description={recipe.replied_recipe.description}
                                    recipePicture={recipe.replied_recipe.images[0].url_image}
                                    verifiedUser={recipe.replied_recipe.user_role === "VerifiedUser"}
                                    verifiedRecipe={recipe.replied_recipe.status === "OpenForSale"}
                                />
                            </> :
                            <></>}
                    </CardPost>

                }

                {/* Comments */}
                <div className="w-full flex flex-col gap-2 border-x-2 px-4">
                    <h3 className='text-primary font-semibold'>Comments</h3>
                    <PostBox
                        placeholderText='Add your comment'
                        onSubmit={handleSubmitComment}
                    />
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
                            image={comment.comment_image}
                        />
                    )
                })}

            </>}

            <NavBottom />
        </Layout >
    )
}

export default Recipe