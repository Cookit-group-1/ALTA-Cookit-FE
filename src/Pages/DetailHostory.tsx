import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import DeliveryData from '../Components/DeliveryData.json'
import { useLocation } from 'react-router-dom'

import food1 from '../assets/food1.jpg'

import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'



const DetailHostory = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(['user'])
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(location.state.total)
    const cartsBySeller: any = [];
    const arrDetail = location?.state.data.transaction_details

    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
    }, [])

    for (const cart of arrDetail) {
        const { id_seller } = cart;
        if (!cartsBySeller[id_seller]) {
            cartsBySeller[id_seller] = [];
        }
        cartsBySeller[id_seller].push(cart);
    }

    console.log(location.state.data)

    return (
        <>
            <Header title='Detail Purchase' />
            <div className='px-5 py-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {/* payment */}
                <div className='bg-gray-100  realtive px-3 py-2 rounded-md'>
                    <p className='my-5 font-semibold text-primary'>Order completed</p>
                    <div className=''>
                        <div className='grid grid-cols-2 justify-between my-5 gap-4'>
                            <p>Merchandise subtotal</p>
                            <p className='text-end'>Rp{totalPrice}</p>
                            <p>Shipping fee</p>
                            <p className='text-end'>Rp{deliveryPrice}</p>
                            <p>Order Total</p>
                            <p className='text-end'>Rp{totalPrice + deliveryPrice}</p>
                            <p>Payment Method</p>
                            <p className='text-end'>QRIS</p>
                        </div>
                    </div>
                </div>

                <div className='lg:h-[80vh] relative overflow-auto'>
                    {cartsBySeller?.map((data: any, index: number) => {
                        return (
                            <div key={index} className='bg-gray-100 mb-5 py-3'>
                                <div className='w-full h-12  flex items-center border-b-2 mb-5 '>
                                    <h1 className='text-xl lg:ml-5 font-semibold px-4'>{data[0].seller_name}</h1>
                                </div>
                                {/* card product */}
                                {data.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className='grid grid-cols-3 mb-6 lg:mb-1 ml-5 gap-5 '>
                                            <div className='w-6/6 h-4/4 lg:h-2/3 relative overflow-hidden rounded-md'>
                                                <img src={food1} className='rounded-lg' alt="" />
                                            </div>
                                            <div className='col-span-2'>
                                                <p className='text-lg md:text-2xl font-semibold'>{item.recipe_name}</p>
                                                <span className='text-sm'>{item.ingredient_name}</span>
                                                <p className='text-sm md:text-xl text-primary'>Rp{item.price}</p>
                                                <p className='text-sm md:text-xl'>Amount: {item.quantity}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DetailHostory
