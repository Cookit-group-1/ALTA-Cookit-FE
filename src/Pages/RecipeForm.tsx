import React, { useState } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

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
        setSteps(newSteps);
    };

    // Handle Price
    const [showPrice, setShowPrice] = useState(false);

    const handleShowPrice = () => {
        setShowPrice(!showPrice)
    }

    // Handle Submit
    const [loading, setLoading] = React.useState(false)
    const [recipeID, setRecipeID] = React.useState(109)
    const endpoint = `https://cookit.my-extravaganza.site`
    // const endpoint = `https://f538-2001-448a-20e0-46c0-78d2-fc70-1cd7-8864.ap.ngrok.io`

    const postImage = async (recipeID: number) => {
        if (newRecipeDetails.images) {
            try {
                const formData = new FormData();
                for (let image = 0; image < newRecipeDetails.images.length; image++) {
                    formData.append('image', newRecipeDetails.images[image])
                    console.log(newRecipeDetails.images[image])
                }
                // formData.append('images', newRecipeDetails.images);

                console.log("Images: ", newRecipeDetails.images)

                const response = await axios.post(`${endpoint}/recipes/${recipeID}/images`,
                    // {
                    //     "image": newRecipeDetails.images[0]
                    // },
                    formData,
                    {
                        headers: {
                            Accept: 'application/json',
                            "Content-Type": 'multipart/form-data',
                            Authorization: `Bearer ${cookies.user.token}`
                        }
                    });
                console.log("Post Image: ", response)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
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
            console.log("Ingredients: ", ingredients)
            const data =
            {
                name: newRecipeDetails.name,
                description: newRecipeDetails.description,
                status: status,
                steps: steps,
                ingredients: ingredients
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
            setRecipeID(response.data.data.id)
            postImage(response.data.data.id)
            console.log("Post Recipe: ", response)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        postRecipe()
    }

    return (
        <Layout>
            {/* Todo: edit mode using useparam */}
            {newRecipeDetails.editMode ?
                <NavBack
                    title='Edit Recipe'
                /> :
                <NavBack
                    title='New Recipe'
                />}

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
                    <label className='font-semibold' htmlFor="imageInput">Choose Images <span className='font-light'>(Optional)</span></label>
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

                {/* Servings */}
                {/* <div className='flex flex-col'>
                    <label htmlFor='serving' className='font-semibold'>
                        Servings
                    </label>
                    <input
                        className='input input-primary'
                        name='serving'
                        id='serving'
                        type="number"
                        placeholder='e.g. 2'
                        value={newRecipeDetails.serving}
                        onChange={handleInputChange}
                    />
                </div> */}

                {/* Sell Price */}
                <div className='flex items-center gap-1 mt-2'>
                    <p className='font-light'>Sell ingredients for your recipe?</p>
                    <input onClick={handleShowPrice} type="checkbox" className='checkbox checkbox-primary rounded-full checkbox-sm' />
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

            <NavBottom />
        </Layout>

    )
}

export default RecipeForm