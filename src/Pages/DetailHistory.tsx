import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { useLocation } from 'react-router-dom'
import food1 from '../assets/food1.jpg'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { MdFileCopy } from 'react-icons/md'
import Format from '../Components/Format'


const DetailHostory = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const cartsBySeller: any = [];
    const arrDetail = location?.state.data.transaction_details
    const dataTransaction = location?.state.data
    const [cookies, setCookies] = useCookies(['user'])

    for (const cart of arrDetail) {
        const { id_seller } = cart;
        if (!cartsBySeller[id_seller]) {
            cartsBySeller[id_seller] = [];
        }
        cartsBySeller[id_seller].push(cart);
    }

    // copy virtual account number
    const copyVa = () => {
        navigator.clipboard.writeText(dataTransaction.virtual_account_number)
            .then(() => {
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <Header link='history' title='Detail Purchase' />
            <div className='px-5 py-5 h-fit grid grid-cols-1 lg:grid-cols-2 gap-5 bg-gray-100'>
                {/* payment */}
                <div className='bg-white h-fit lg:h-[90vh] realtive px-3 py-2 rounded-lg'>
                    <p className='my-5 font-semibold text-primary'>Order {dataTransaction.status}</p>
                    <div className=''>
                        <div className='grid  grid-cols-1 md:grid-cols-2 justify-between my-5 gap-4'>
                            <p className='sm:mt-5'>Merchandise subtotal</p>
                            <p className='text-start md:text-end -mt-4 md:mt-4 lg:mt-4 text-primary'><Format>{dataTransaction.total_price - dataTransaction.shipping_fee}</Format> </p>
                            <p className='sm:mt-5'>Shipping fee</p>
                            <p className='text-start md:text-end -mt-4 md:mt-4 lg:mt-4 text-primary'><Format>{dataTransaction.shipping_fee}</Format> </p>
                            <p className='sm:mt-5'>Shipping method</p>
                            <p className='text-start md:text-end -mt-4 md:mt-4 lg:mt-4 text-primary'>{dataTransaction.shipping_method}</p>
                            <p className='sm:mt-5'>Order Total</p>
                            <p className='text-start md:text-end -mt-4 md:mt-4 lg:mt-4 text-primary'><Format>{dataTransaction.total_price}</Format> </p>
                            <p className='sm:mt-5'>Payment Method</p>
                            <p className='text-start md:text-end -mt-4 md:mt-4 lg:mt-4 text-primary'>{dataTransaction.payment_method}</p>
                            <p className='sm:mt-5'>Order date</p>
                            <p className='text-start md:text-end -mt-4 md:mt-4 lg:mt-4 text-primary'>{dataTransaction.created_at}</p>
                            {dataTransaction.status == 'Complete' && 'Received' ? '' : <p className='sm:mt-5'>Virtual Account Number</p>}
                            <div className='text-start flex flex-row gap-2 items-center md:justify-end md:text-end -mt-4 md:mt-4 lg:mt-4 text-primary'>{dataTransaction.status == 'Complete' ? '' : <>{dataTransaction.virtual_account_number} <span className='cursor-pointer' onClick={copyVa}><MdFileCopy /></span></>} </div>
                        </div>
                    </div>
                </div>

                <div className='lg:h-[90vh] relative rounded-lg overflow-auto'>
                    {cartsBySeller?.map((data: any, index: number) => {
                        return (
                            <div key={index} className='bg-white mb-5 py-3'>
                                <div className='w-full h-12  flex items-center border-b-2 mb-5 '>
                                    <h1 className='text-xl lg:ml-5 font-semibold px-4'>{data[0].seller_user_username}</h1>
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
                                                <p className='text-sm md:text-xl text-primary'><Format>{dataTransaction.total_price}</Format></p>
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
