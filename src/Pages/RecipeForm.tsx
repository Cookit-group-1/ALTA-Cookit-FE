import React, { useState } from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

interface Ingredient {
    name: string
    amount: number
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
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', amount: 0, unit: '' }]);

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
        const newIngredients = [...ingredients];
        if (typeof value === 'string' && field === 'amount') {
            // Trim leading zeros from the string value
            value = value.replace(/^0+/, '');
        }
        newIngredients[index][field] = value as never;
        setIngredients(newIngredients);
        setNewRecipeDetails({ ...newRecipeDetails, ingredients: newIngredients })
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: 0, unit: '' }]);
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
    const [loading, setLoading] = React.useState(true)
    const [recipeID, setRecipeID] = React.useState(27)
    const endpoint = `https://cookit.my-extravaganza.site`
    // const endpoint = `https://a670-2001-448a-20e0-3ddf-e52b-c1b9-12aa-ad85.ap.ngrok.io`



    const postRecipe = async () => {
        try {
            const steps = newRecipeDetails.steps.map(str => ({ name: str }));
            const status = showPrice ? "OpenForSale" : "None"
            const ingredients = [
                {
                    "name": "Original",
                    "price": newRecipeDetails.price,
                    "ingredient_details": newRecipeDetails.ingredients
                }
            ];
            let formdata = new FormData();
            formdata.append('name', newRecipeDetails.name)
            formdata.append('description', newRecipeDetails.description)
            formdata.append('status', status)
            formdata.append('steps', JSON.stringify(steps))
            formdata.append('ingredients', JSON.stringify(ingredients))
            console.log("Form Data: ", formdata)

            console.log("Steps: ", steps);
            console.log("Ingredients: ", ingredients);
            const response = await axios.post(`${endpoint}/recipes`,
                // formdata,
                {
                    name: newRecipeDetails.name,
                    description: newRecipeDetails.description,
                    status: status,
                    image: newRecipeDetails.images ? newRecipeDetails.images[0] : null,
                    steps: steps,
                    ingredients: ingredients
                },
                {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
            setRecipeID(response.data.data.id)
            console.log(response)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
                    <label className='font-semibold' htmlFor="imageInput">Choose Images</label>
                    <div className='flex flex-col gap-2 border border-primary rounded-lg min-h-40 px-4 py-4'>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            // multiple
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
                                className='input py-2 input-primary col-span-5'
                                placeholder='Ingredient name'
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            />
                            <input
                                className='input py-2 input-primary col-span-3'
                                placeholder='Amount'
                                value={ingredient.amount}
                                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                type='number'
                            />
                            <input
                                className='input py-2 input-primary col-span-3'
                                placeholder='Unit'
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            />
                            <button type="button"
                                className='btn btn-sm btn-circle btn-warning col-span-1'
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
                                className='input h-20 py-2 input-primary col-span-11'
                                value={step}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                            />
                            <button type="button"
                                className='btn btn-sm btn-circle btn-warning col-span-1'
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

                <div className={`flex-col ${showPrice ? 'flex' : 'hidden'}`}>
                    <label htmlFor='price' className='font-semibold'>
                        Price
                    </label>
                    <input
                        className={`input input-primary `}
                        name='price'
                        id='price'
                        type="number"
                        placeholder='e.g. 5000'
                        value={newRecipeDetails.price}
                        onChange={handleInputChange}
                    />
                </div>



                <button className='btn btn-primary w-1/2 self-end mt-2'>Submit</button>

            </form>

            <NavBottom />
        </Layout>

    )
}

export default RecipeForm