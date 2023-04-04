import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'

interface Ingredient {
    name: string
    quantity: number
    unit: string
}

interface NewRecipeVariables {
    verified: boolean
    username: string
    name: string
    type: string
    description: string
    ingredients: Ingredient[]
    serving: number
    price: number
    steps: string[]
    images: FileList | null
    editMode: boolean
}

const initialNewRecipe: NewRecipeVariables = {
    verified: false,
    username: "",
    name: "",
    type: "Original",
    description: "",
    ingredients: [],
    serving: 1,
    price: 0,
    steps: [],
    images: null,
    editMode: false
}

const RecipeForm = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [loading, setLoading] = React.useState(true)
    const endpoint = `https://cookit.my-extravaganza.site`
    // const endpoint = 'https://82d3-2001-448a-20e0-4958-d97e-b05f-e535-46c3.ap.ngrok.io'
    const navigate = useNavigate()

    // Edit Recipe
    const { recipeID } = useParams()
    const { editType } = useParams()
    const [recipe, setRecipe] = useState<any>()

    const fetchRecipeDetails = async () => {
        try {
            const response = await axios.get(`${endpoint}/recipes/${recipeID}/detail`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            if ((cookies.user.id !== response.data.data.user_id && editType === "edit") ||
                (editType !== "edit" && editType !== "recook")) {
                navigate(`/recipes/${recipeID}`)
            }
            const steps = response.data.data.steps !== undefined ? response.data.data.steps.map((item: any) => item.name) : ['']
            setSteps(steps)
            const ingredients = response.data.data.ingredients !== undefined ? response.data.data.ingredients[0].ingredient_details.map(({ id, ...rest }: any) => rest) : ['', 0, '']
            setIngredients(ingredients)
            if (response.data.data.status === "OpenForSale") {
                setShowPrice(true)
            }
            setNewRecipeDetails({
                verified: false,
                username: response.data.data.username,
                name: response.data.data.name,
                type: "Original",
                description: response.data.data.description,
                ingredients: ingredients,
                serving: 1,
                price: response.data.data.ingredients[0].price,
                steps: steps,
                images: response.data.data.images,
                editMode: true
            })
            // setNewRecipeDetails({
            //     ...newRecipeDetails,
            //     name: response.data.data.name,
            //     description: response.data.data.description,
            //     ingredients: ingredients,
            // })
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

    const [newRecipeDetails, setNewRecipeDetails] = useState<NewRecipeVariables>(initialNewRecipe)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRecipeDetails({ ...newRecipeDetails, [e.target.name]: e.target.value });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewRecipeDetails({ ...newRecipeDetails, [e.target.name]: e.target.value });
    };

    // Images
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imagesArray = Array.from(files).filter((file) => file.type.startsWith('image/'));
            setImages(imagesArray);
            setNewRecipeDetails({ ...newRecipeDetails, images: files })
        }
    };


    // Recipe Ingredients
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: 0, unit: '' }]);

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
        const newIngredients: Ingredient[] = [...ingredients];
        if (typeof value === 'string' && field === 'quantity') {
            // Trim leading zeros from the string value
            value = parseInt(value.replace(/^0+/, ''));
        }
        newIngredients[index][field] = value as never;
        setIngredients(newIngredients);
        setNewRecipeDetails({ ...newRecipeDetails, ingredients: newIngredients })
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }]);
    };

    const handleDeleteIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
        setNewRecipeDetails({ ...newRecipeDetails, ingredients: newIngredients });
    };

    // Recipe Steps
    const [steps, setSteps] = useState<string[]>(['']);


    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
        setNewRecipeDetails({ ...newRecipeDetails, steps: newSteps })
    };

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleDeleteStep = (index: number) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps)
        setNewRecipeDetails({ ...newRecipeDetails, steps: newSteps })
    };

    // Handle Price
    const [showPrice, setShowPrice] = useState(false);

    const handleShowPrice = () => {
        setShowPrice(!showPrice)
    }

    // Handle Submit
    const postImage = async (recipeID: number) => {
        if (newRecipeDetails.images) {
            try {
                const formData = new FormData();
                for (let image = 0; image < newRecipeDetails.images.length; image++) {
                    formData.append('image', newRecipeDetails.images[image])
                }
                const response = await axios.post(`${endpoint}/recipes/${recipeID}/images`,
                    formData,
                    {
                        headers: {
                            Accept: 'application/json',
                            "Content-Type": 'multipart/form-data',
                            Authorization: `Bearer ${cookies.user.token}`
                        }
                    });
            } catch (error) {
                console.error(error);
            } finally {
                navigate(`/recipes/${recipeID}`);
            }
        } else {
            navigate(`/recipes/${recipeID}`);
        }
    }

    const postRecipe = async () => {
        setLoading(true)
        try {
            const steps = newRecipeDetails.steps.map(str => ({ name: str }));
            const status = showPrice ? "OpenForSale" : "None"
            const price = parseInt(newRecipeDetails.price.toString())
            const ingredients = [
                {
                    name: newRecipeDetails.name,
                    price: price,
                    ingredient_details: newRecipeDetails.ingredients
                }
            ];
            const data =
            {
                name: newRecipeDetails.name,
                description: newRecipeDetails.description,
                status: status,
                steps: steps,
                ingredients: ingredients,
                recipe_id: editType === "recook" && recipeID !== undefined ? parseInt(recipeID) : null,
                type: editType === "recook" ? "Mixed" : "Original"
            }

            const response = await axios.post(`${endpoint}/recipes`,
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        // "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
            postImage(response.data.data.id)
        } catch (error) {
            console.error(error);
        }
    };

    const editRecipe = async () => {
        setLoading(true)
        try {
            const steps = newRecipeDetails.steps.map(str => ({ name: str }));
            const status = showPrice ? "OpenForSale" : "None"
            const price = parseInt(newRecipeDetails.price.toString())
            const ingredients = [
                {
                    name: newRecipeDetails.name,
                    price: price,
                    ingredient_details: newRecipeDetails.ingredients
                }
            ];
            const data =
            {
                name: newRecipeDetails.name,
                description: newRecipeDetails.description,
                status: status,
                steps: steps,
                ingredients: ingredients,
                recipe_id: editType === "recook" && recipeID !== undefined ? parseInt(recipeID) : null,
                type: recipe.type
            }

            const response = await axios.put(`${endpoint}/recipes/${recipeID}`,
                data,
                {
                    headers: {
                        Accept: 'application/json',
                        // "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
        } catch (error) {
            console.error(error);
        } finally {
            if (images.length > 0) {
                if (recipe.images === undefined) {
                    postImage(recipe.id)
                } else {
                    deleteAllImages()
                }
            } else {
                navigate(`/recipes/${recipeID}`);
            }
        }
    };

    const deleteAllSteps = async () => {
        setLoading(true)
        try {
            const response = await axios.delete(`${endpoint}/recipes/${recipeID}/steps`,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
        } catch (error) {
            console.error(error);
        } finally {
            deleteAllIngredients()
        }
    };

    const deleteAllIngredients = async () => {
        setLoading(true)
        try {
            const response = await axios.delete(`${endpoint}/recipes/${recipeID}/ingredients`,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
        } catch (error) {
            console.error(error);
        } finally {
            editRecipe()
        }
    };

    const deleteAllImages = async () => {
        setLoading(true)
        try {
            const response = await axios.delete(`${endpoint}/recipes/${recipeID}/images`,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
        } catch (error) {
            console.error(error);
        } finally {
            postImage(recipe.id)
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (editType === "edit") {
            deleteAllSteps()
        } else {
            postRecipe()
        }
    }

    const [userRole, setUserRole ] = useState('')
    useEffect(() => {
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookies.user.token}`
            },
        };
        fetch(`${endpoint}/users`, headers)
            .then(response => response.json())
            .then(response => {
                setUserRole(response.data.role)
            })
            .catch(error => console.error(error));
    })

    return (
        <Layout>
            {/* Todo: edit mode using useparam */}
            {recipeID !== undefined ?
                (editType === "edit" ?
                    <NavBack
                        title='Edit Recipe'
                    /> :
                    <NavBack
                        title='Recook Recipe'
                    />) :
                <NavBack
                    title='New Recipe'
                />}


            {loading ? <LoadingSpinner /> : <>
                <form className='w-full flex flex-col my-2 gap-2 px-4' onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className='flex flex-col'>
                        <label htmlFor='name' className='font-semibold'>
                            Recipe Title
                        </label>
                        <input
                            required
                            className='input input-primary'
                            name='name'
                            id='name'
                            type="text"
                            placeholder='Give your recipe a title'
                            value={newRecipeDetails.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Description */}
                    <div className='flex flex-col'>
                        <label htmlFor='description' className='font-semibold'>
                            Description
                        </label>
                        <textarea
                            required
                            className='input input-primary py-2 h-40'
                            name='description'
                            id='description'
                            placeholder='Share the story behind your recipe'
                            value={newRecipeDetails.description}
                            onChange={handleTextAreaChange}
                        />
                    </div>

                    {/* Images */}
                    <div className='flex flex-col'>
                        <label className='font-semibold' htmlFor="imageInput">
                            {(editType === "edit" || editType === "recook") && recipe.images !== undefined && editType !== "recook" ?
                                'Replace Images ' : 'Choose Images '}
                            <span className='font-light'>(Optional)</span>
                        </label>
                        <div className='flex flex-col gap-2 border border-primary rounded-lg min-h-40 px-4 py-4'>
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange} />
                            {images.map((image, index) => (
                                <img className='rounded-lg' key={index} src={URL.createObjectURL(image)} alt={`Selected image ${index}`} />
                            ))}

                            {images.length === 0 && recipe != undefined && editType !== "recook" ?
                                (
                                    recipe.images?.map((image: any) => (
                                        <div>
                                            <img className='rounded-lg' key={image.id} src={image.url_image} alt={`Selected image ${image.id}`} />
                                        </div>
                                    ))
                                ) : <></>
                            }
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-end'>
                            <p className='font-semibold'>
                                Ingredients
                            </p>
                            <button type="button"
                                className='btn btn-circle btn-sm btn-ghost text-2xl text-primary'
                                onClick={handleAddIngredient}>
                                +
                            </button>
                        </div>

                        <p className='font-light'>List the ingredients needed for your recipe</p>

                        {ingredients.map((ingredient, index) => (

                            <div className='grid grid-cols-12 gap-2 ' key={index}>
                                <label className='col-span-12 -mb-2' htmlFor="">
                                    {`Ingredient ${index + 1}`}
                                </label>
                                <input
                                    required
                                    className='input py-2 input-primary col-span-5'
                                    placeholder='Ingredient name'
                                    value={ingredient.name}
                                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                />
                                <input
                                    required
                                    className='input py-2 input-primary col-span-3'
                                    placeholder='Quantity'
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                    type='number'
                                />
                                <input
                                    required
                                    className='input py-2 input-primary col-span-3'
                                    placeholder='Unit'
                                    value={ingredient.unit}
                                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                />
                                <button type="button"
                                    className={`btn btn-sm btn-circle btn-ghost col-span-1 ${index == 0 ? 'hidden' : ''}`}
                                    onClick={() => handleDeleteIngredient(index)}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Directions */}
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-end'>
                            <p className='font-semibold'>
                                Directions
                            </p>
                            <button type="button"
                                className='btn btn-circle btn-sm btn-ghost text-2xl text-primary'
                                onClick={handleAddStep}>
                                +
                            </button>
                        </div>

                        <p className='font-light'>Explain how to make your recipe</p>

                        {steps.map((step, index) => (
                            <div className='grid grid-cols-12 gap-2 ' key={index}>
                                <label className='col-span-12 -mb-2' htmlFor="">
                                    {`Step ${index + 1}`}
                                </label>
                                <textarea
                                    required
                                    className='input h-20 py-2 input-primary col-span-11'
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                />
                                <button type="button"
                                    className={`btn btn-sm btn-circle btn-ghost col-span-1 ${index == 0 ? 'hidden' : ''}`}
                                    onClick={() => handleDeleteStep(index)}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Sell Price */}
                    <div className={`items-center gap-1 mt-2 ${userRole === "VerifiedUser" ? 'flex' : 'hidden'}`}>
                        <p className='font-light'>Sell ingredients for your recipe?</p>
                        <input readOnly onClick={handleShowPrice} checked={showPrice} type="checkbox" className='checkbox checkbox-primary rounded-full checkbox-sm' />
                    </div>

                    {showPrice ?
                        <div className={`flex-col flex`}>
                            <label htmlFor='price' className='font-semibold'>
                                Price
                            </label>
                            <input
                                required
                                className={`input input-primary `}
                                name='price'
                                id='price'
                                type="number"
                                placeholder='e.g. 5000'
                                value={newRecipeDetails.price}
                                onChange={handleInputChange}
                            />
                        </div> :
                        <></>
                    }


                    <button
                        className='btn btn-primary w-1/2 self-end mt-2'>
                        Submit
                    </button>

                </form>

            </>}

            <NavBottom />
        </Layout>

    )
}

export default RecipeForm