import React from 'react'
import Layout from '../Components/Layout'
import NavBack from '../Components/NavBack'
import NavBottom from '../Components/NavBottom'
import { useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdModeComment, MdFavorite } from 'react-icons/md'

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

interface RecipeVariables {
    id: number
    verified: boolean
    username: string
    name: string
    description: string
    ingredients: Ingredients[]
    serving: number
    price: number
    steps: Steps[]
    total_like: number
    total_comment: number
    images: any[]
}

const initialRecipe: RecipeVariables = {
    id: 1,
    verified: true,
    username: "Benjamin29",
    name: "Indomie Spesial",
    description:
        "Indomie is a brand of instant noodle produced by the Indonesian company Indofood. Indofood itself is the largest instant noodle producer in the world with 16 factories. Over 15 billion packets of Indomie are produced annually. Indomie is also exported to more than 90 countries around the world.",
    ingredients: [
        {
            "id": 1,
            "name": "Bumbu Indomie (Original)",
            "quantity": 1,
            "unit": "pcs"
        },
        {
            "id": 2,
            "name": "Minyak Indomie (Original)",
            "quantity": 1,
            "unit": "pcs"
        }
    ],
    serving: 1,
    price: 5000,
    steps: [
        {
            "id": 1,
            "name": "Rebus air sebanyak 300ml dengan api sedang hingga mendidih"
        },
        {
            "id": 2,
            "name": "Sembari menunggu air yang mendidih, siapkan piring dan tuangkan bumbu ke piring tersebut"
        },
        {
            "id": 3,
            "name": "Setelah air mendidih, masukan mie"
        },
        {
            "id": 4,
            "name": "Setelah matang, tuangkan mie ke dalam mangkuk yang telah diisi bumbu"
        },
        {
            "id": 5,
            "name": "Indomie siap disajikan"
        }
    ],
    total_like: 120,
    total_comment: 32,
    images: [
        {
            "id": 1,
            "url_image": "https://awsimages.detik.net.id/community/media/visual/2022/10/24/duplikat-indomie-goreng_43.jpeg?w=1200"
        },
        {
            "id": 2,
            "url_image": "https://www.indomie.com/uploads/product/indomie-mi-goreng-special_detail_094906814.png"
        }
    ],
}

const Recipe = () => {
    const [recipeDetails, setRecipeDetails] = useState<RecipeVariables>(initialRecipe)

    const handleComment = () => {
        console.log("Handle Comment")
    }

    const handleLike = () => {
        console.log("Handle Like")
    }

    const handleChangeServing = (amount: number) => {
        setRecipeDetails({ ...recipeDetails, serving: Math.max(0, amount) })
    }

    return (
        <Layout>
            <NavBack
                title={"Recipe"}
            />

            <div className='flex flex-col items-center mx-4 gap-4 my-4'>
                {/* Title Block */}
                <div className='flex flex-col justify-center text-center'>
                    {/* Recipe Name */}
                    <h1 className='font-bold flex text-3xl'>
                        {recipeDetails.name}

                        {recipeDetails.verified ?
                            <IoIosCheckmarkCircle className='text-accent text-xl' /> :
                            <></>
                        }
                    </h1>
                    <h2>{`by ${recipeDetails.username}`}</h2>

                    <div className='grid grid-cols-2 text-secondary justify-items-center mt-1'>
                        {/* Comments */}
                        <div className='flex'>
                            <button
                                className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'
                                onClick={handleComment}
                            >
                                <MdModeComment className='text-lg' />
                                {recipeDetails.total_comment}
                            </button>
                        </div>

                        {/* Likes */}
                        <div className='flex'>
                            <button
                                className='flex items-center gap-1 hover:text-accent hover:cursor-pointer'
                                onClick={handleLike}
                            >
                                <MdFavorite className='text-xl' />
                                {recipeDetails.total_like}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p>{recipeDetails.description}</p>

                {/* Ingredients */}
                <div className="w-full flex flex-col gap-2">
                    <h3 className='text-primary font-semibold'>Ingredients</h3>

                    {/* Servings */}
                    <div className='flex items-center'>
                        <button
                            className='btn rounded-l-lg rounded-r-none text-primary'
                            onClick={() => handleChangeServing(recipeDetails.serving - 1)}
                        >-</button>
                        <input
                            type="number"
                            name='serving'
                            value={recipeDetails.serving.toString()}
                            className='input input-neutral w-20 border-neutral rounded-none text-center'
                            onChange={(event) => handleChangeServing(Number(event.target.value))}
                            min={1}
                        />
                        <button
                            className='btn rounded-r-lg rounded-l-none text-primary'
                            onClick={() => handleChangeServing(recipeDetails.serving + 1)}
                        >+</button>
                        <p className='ml-4 font-semibold'>Servings</p>
                    </div>

                    {/* Table */}
                    <table className="table table-auto table-zebra w-full">
                        <tbody>
                            {recipeDetails.ingredients.map((ingredient: Ingredients) => {
                                return (
                                    <tr>
                                        <td className='whitespace-normal py-2'>{ingredient.name}</td>
                                        <td className='py-2'>{ingredient.quantity * recipeDetails.serving}</td>
                                        <td className='py-2'>{ingredient.unit}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Steps */}
                <div className="w-full flex flex-col gap-2">
                    <h3 className='text-primary font-semibold'>Preparation</h3>
                    <ol className='list-decimal ml-6'>
                        {recipeDetails.steps.map((step: Steps) => {
                            return (
                                <li className='mb-2'>{step.name}</li>
                            )
                        })}
                    </ol>

                </div>
            </div>

            <NavBottom />
        </Layout >
    )
}

export default Recipe