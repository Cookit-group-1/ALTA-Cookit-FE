import React, { FC } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Format from './Format';


interface myProps {
    sellerName: string
    cartItems: any
    increment: (price: any, id: number, quantity: number) => void
    decrement: (price: any, id: number, quantity: number) => void
    deleteCartItem: (id: number) => void
    getIdProduct: (id: any) => void
}


const ItemCart: FC<myProps> = ({ sellerName, cartItems, increment, decrement, deleteCartItem, getIdProduct }) => {
    return (
        <div className='bg-white'>
            <div className='w-full h-12  flex items-center border-b-2 '>
                <h1 className='text-xl lg:ml-5 font-semibold px-4'>{sellerName}</h1>
            </div>
            {/* card product */}
            {cartItems?.map((item: any, index: number) => {
                return (
                    <div key={index} className='py-2 px-3'>
                        <div className='grid grid-cols-5 md:grid-cols-4 '>
                            <figure className='w-full lg:w-2/3 h-5/6 lg:pl-5 flex gap-3  col-span-2 md:col-span-1 relative overflow-hidden rounded-md'>
                                <input className='w-5 h-5 text-secondary bg-secondary cursor-pointer' value={item.id} onChange={getIdProduct} type="checkbox" />
                                <img
                                    src={ item.recipe_images?.[0].url_image === undefined ? 'https://images.squarespace-cdn.com/content/v1/55ffc4d1e4b0bdeb0bf5f8ea/1611837194998-9YGLEXHGLPKSSC1HACIK/food-vector-illustration.jpg?format=1500w' : item.recipe_images?.[0].url_image}
                                    className=''
                                    alt=""
                                />
                            </figure>
                            <div className='col-span-3 pl-5 relative  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 md:gap-5'>
                                <p className='text-md md:text-2xl col-span-1'>
                                    {item.recipe_name} <br />
                                    <span className='text-sm'>{item.ingredient_name}</span>
                                </p>
                                <p className='text-orange-500 md:text-2xl lg:text-xl lg:font-semibold lg:mt-[20%]'><Format>{item.price}</Format> </p>
                                <div className='w-2/3 h-7 lg:h-7 md:w-1/5 lg:w-1/2 lg:text-xl  grid lg:mt-[20%] grid-cols-3 items-start justify-center text-center bg-gray-100'>
                                    <p onClick={() => decrement(item.price, item.id, item.quantity)} className='cursor-pointer'>-</p>
                                    <p>{item.quantity}</p>
                                    <p onClick={() => increment(item.price, item.id, item.quantity)} className='cursor-pointer'>+</p>
                                </div>
                                <RiDeleteBin6Line id={`${index}`} onClick={() => deleteCartItem(item.id)} className='cursor-pointer text-xl absolute md:absolute lg:static md:text-2xl lg:text-xl lg:mt-[20%] right-0 md:right-3 top-2/3 text-red-600' />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ItemCart
