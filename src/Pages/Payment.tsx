import React, { useState } from 'react'
import Header from '../Components/Header'
import DeliveryData from '../Components/DeliveryData.json'

import food1 from '../assets/food1.jpg'
import gofood from '../assets/gofood.png'
import shopeefood from '../assets/shopeefood.png'
import grabfood from '../assets/grabfood.png'
import cod from '../assets/cod.jpg'
import bni from '../assets/bni.png'
import mandiri from '../assets/mandiri.jpg'
import bca from '../assets/bca.png'
import seabank from '../assets/seabank.png'
import banktransfer from '../assets/banktransfer.png'

const Payment = () => {
    const [deliveryPrice, setDeliveryPrice] = useState<number>()
    const [thisDelivery, setThisDelivery] = useState<number>()
    const [paymentOptions, setPaymentOptions] = useState('')

    const delivery = DeliveryData.data
    console.log(delivery)

    const handleDelivery = (index: any, price: number) => {
        setDeliveryPrice(price)
        setThisDelivery(index)
    }

    return (
        <>
            <Header title='Payment' />
            <div className='px-5 py-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {/* order */}
                <div className='grid grid-cosl-1'>
                    <div className='bg-gray-100 w-full h-fit px-4 rounded-lg md:max-h-[60vh] md:overflow-auto'>
                        <p className='my-5 font-semibold'>Order</p>
                        <div className='grid grid-cols-3 gap-5 '>
                            <div className='w-6/6 h-3/4 lg:h-2/3 relative overflow-hidden rounded-md'>
                                <img src={food1} className='rounded-lg' alt="" />
                            </div>
                            <div className='col-span-2'>
                                <p className='text-lg md:text-2xl font-semibold'>Soto Betawi</p>
                                <p className='text-sm md:text-xl text-primary'>Rp35.000</p>
                                <p className='text-sm md:text-xl'>Amount: 1</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 mt-3 gap-5 '>
                            <div className='w-6/6 h-3/4 lg:h-2/3 relative overflow-hidden rounded-md'>
                                <img src={food1} className=' rounded-lg' alt="" />
                            </div>
                            <div className='col-span-2'>
                                <p className='text-lg md:text-2xl font-semibold'>Soto Betawi</p>
                                <p className='text-sm md:text-xl text-primary'>Rp35.000</p>
                                <p className='text-sm md:text-xl'>Amount: 1</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 mt-3 gap-5 '>
                            <div className='w-6/6 h-3/4 lg:h-2/3 relative overflow-hidden rounded-md'>
                                <img src={food1} className=' rounded-lg' alt="" />
                            </div>
                            <div className='col-span-2'>
                                <p className='text-lg md:text-2xl font-semibold'>Soto Betawi</p>
                                <p className='text-sm md:text-xl text-primary'>Rp35.000</p>
                                <p className='text-sm md:text-xl'>Amount: 1</p>
                            </div>
                        </div>
                    </div>

                    {/* delivery */}
                    <div className='bg-gray-100 mt-5 rounded-md px-3'>
                        <p className='my-5 font-semibold'>Delivery</p>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                            {delivery.map((item: any, index: number) => {
                                return (
                                    <div key={index} onClick={() => handleDelivery(index, item.price)} className={`${index == thisDelivery ? 'border-2 border-primary shadow-none' : ''} h-16 py-2 px-3 grid gap-2 grid-cols-5 items-center justify-between rounded-md bg-gray-100 shadow-md`}>
                                        <img src={index == 0 ? gofood : index == 1 ? shopeefood : index == 2 ? grabfood : ''} className='h-auto w-full' alt="" />
                                        <p className='text-xs col-span-3'>{item.receive}</p>
                                        <p className='text-xs text-primary'>Rp{item.price}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* payment */}
                <div className='bg-gray-100 realtive px-3 py-2 rounded-md'>
                    <p className='my-5 font-semibold'>Payment methods</p>
                    <div className=''>
                        <label htmlFor="my-modal-6" className="btn w-full px-2 py-2 grid grid-cols-5 items-center justify-center text-start rounded-md bg-gray-100 shadow-md ">
                            <p className='text-xs col-span-2'>Payment Option</p>
                            <p className='text-end col-span-2 text-xs'>{paymentOptions}</p>
                            <p className='text-center text-xl '>{'>'}</p>
                        </label>
                        <div className='grid grid-cols-2 justify-between my-5 gap-4'>
                            <p>Merchandise subtotal</p>
                            <p className='text-end'>Rp70.000</p>
                            <p>Shipping subtotal</p>
                            <p className='text-end'>Rp{deliveryPrice == null ? '0' : deliveryPrice}</p>
                            <p>Order Total</p>
                            <p className='text-end'>Rp79.000</p>
                        </div>
                        <div className='flex w-full mt-10 justify-end'>
                            <button className='btn bg-primary hover:bg-secondary text-white'>Order</button>
                        </div>
                    </div>
                </div>

                {/* Modal payment option */}
                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Payment Option</h3>
                        <div>
                            <label onClick={() => setPaymentOptions('COD')} htmlFor="my-modal-6" className='border-b-2 py-4 flex items-center gap-4'>
                                <img className='w-8' src={cod} alt="" />
                                Cash on Delivery</label>
                            <label className='border-b-2 py-4 flex items-center gap-4'>
                                <img className='w-8' src={banktransfer} alt="" />
                                Bank Transfer</label>
                            <label onClick={() => setPaymentOptions('Seabank')} htmlFor="my-modal-6" className='border-b-2 py-4 pl-10 flex items-center gap-4'>
                                <img className='w-8' src={seabank} alt="" />
                                Seabank</label>
                            <label onClick={() => setPaymentOptions('Bank BCA')} htmlFor="my-modal-6" className='border-b-2 py-4 pl-10 flex items-center gap-4'>
                                <img className='w-8' src={bca} alt="" />
                                Bank BCA</label>
                            <label onClick={() => setPaymentOptions('Bank BNI')} htmlFor="my-modal-6" className='border-b-2 py-4 pl-10 flex items-center gap-4'>
                                <img className='w-8' src={bni} alt="" />
                                Bank BNI</label>
                            <label onClick={() => setPaymentOptions('Bank mandiri')} htmlFor="my-modal-6" className='border-b-2 py-4 pl-10 flex items-center gap-4'>
                                <img className='w-8' src={mandiri} alt="" />
                                Bank Mandiri</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment
