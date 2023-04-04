import React, { FC } from 'react'

import food1 from '../assets/food1.jpg'
import Format from './Format'

interface myProps {
    title?: string
    titleBtn: string
    route?: string
    transactionDetails: any[]
    totalPrice: number
    orderReceived?: React.MouseEventHandler<HTMLButtonElement>
    handleDetailHistory: React.MouseEventHandler

}

const CardHistory: FC<myProps> = ({ title, titleBtn, route, transactionDetails, totalPrice, orderReceived, handleDetailHistory }) => {
    return (
        <>
            <div className='bg-white pb-10 mb-5'>
                <div className='w-full h-12  flex items-center border-b-2 '>
                    <h1 className='text-xl lg:ml-5 font-semibold px-4'>{transactionDetails[0].seller_user_username}</h1>
                </div>
                {/* card product */}
                <div onClick={handleDetailHistory} className='py-2 px-3'>
                    <div className='grid grid-cols-5 md:grid-cols-4 '>
                        <figure className='w-full lg:w-2/3 h-5/6 lg:pl-5 col-span-2 md:col-span-1 relative overflow-hidden rounded-md'>
                            <img src={food1} className='' alt="" />
                        </figure>
                        <div className='col-span-3 pl-5 relative  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 md:gap-5'>
                            <p className='text-md md:text-2xl col-span-1'>
                                {transactionDetails[0].recipe_name} <br />
                                <span className='text-sm'>{transactionDetails[0].ingredient_name}</span>
                            </p>
                            <p className='text-orange-500 md:text-2xl lg:text-xl lg:font-semibold lg:mt-[20%]'><Format>{totalPrice}</Format> </p>
                            <div className='w-2/3 h-7 lg:h-7 md:w-1/5 lg:w-2/3 lg:text-xl lg:mt-[20%] text-center '>
                                <p className='text-start w-full'>Amount : {transactionDetails[0].quantity}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-16 px-5 grid grid-cols-2'>
                    <p className='text-start font-regular lg:font-semibold'>{transactionDetails.length} {transactionDetails.length > 1 ? 'more products' : 'product'} </p>
                    <p className='text-end'>Order Total: <span className='text-primary'>Rp{totalPrice}</span> </p>
                    {route == 'Unpaid'
                        ? <button onClick={handleDetailHistory} className='w-44 col-start-2 bg-primary place-self-end py-1 rounded-md text-white'>{titleBtn}</button>
                        : route == 'Shipped' ? <button disabled className='w-44 col-start-2 bg-gray-200 py-1 place-self-end rounded-md text-gray-400'>{titleBtn}</button>
                            : route == 'Received' ? <button onClick={orderReceived} className='w-44 col-start-2 bg-primary place-self-end py-1 rounded-md text-white'>{titleBtn}</button>
                                : <button className='w-44 col-start-2 bg-white place-self-end py-1 rounded-md text-black'>{titleBtn}</button>
                                
                    }
                </div>
            </div>
        </>
    )
}

export default CardHistory
