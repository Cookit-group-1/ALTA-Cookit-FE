import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import DeliveryData from '../Components/DeliveryData.json'
import { useLocation } from 'react-router-dom'

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
import gopay from '../assets/gopay.png'
import qris from '../assets/qris.png'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'
import Alert from '../Components/Alert'

const Payment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [cookies, setCookies] = useCookies(['user'])
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(location.state.total)
    const [thisDelivery, setThisDelivery] = useState<number>()
    const [paymentOptions, setPaymentOptions] = useState('')
    const [alert, setAlert] = useState('')

    useEffect(() => {
        if (cookies.user == undefined) {
            navigate('/login')
        }
    }, [])

    const delivery = DeliveryData.data
    const handleDelivery = (index: any, price: number) => {
        setDeliveryPrice(price)
        setThisDelivery(index)
    }

    function isAlert() {
        return new Promise(resolve => {
            setTimeout(() => {
                setAlert('')
            }, 5000);
        });
    }

    const handlePayment = async () => {
        if (deliveryPrice != 0 && paymentOptions != '') {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfull Order',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/history')
        }
        setAlert('warning')
        const result = await isAlert();
    }

    // delivery date received 
    const today = new Date();

    const futureDate1 = new Date(today.setDate(today.getDate() + 2));
    const futureDay1 = futureDate1.getDate();
    const futureMonth1 = futureDate1.toLocaleString('default', { month: 'long' });

    const futureDate2 = new Date(today.setDate(today.getDate() + 4));
    const futureDay2 = futureDate2.getDate();
    const futureMonth2 = futureDate2.toLocaleString('default', { month: 'long' });

    const future1 = `${futureDay1} ${futureMonth1}`
    const future2 = `${futureDay2} ${futureMonth2}`


    return (
        <>
            <Alert type={alert} message='please select shipping options and payment options' />
            <Header title='Payment' />
            <div className='px-5 py-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {/* order */}
                <div className='grid grid-cosl-1'>
                    <div className='bg-gray-100 w-full h-fit px-4 rounded-lg md:max-h-[60vh] md:overflow-auto'>
                        <p className='my-5 font-semibold'>Order</p>
                        {location?.state?.data.map((item: any, index: number) => {
                            return (
                                <div key={index} className='grid grid-cols-3 gap-5 '>
                                    <div className='w-6/6 h-3/4 lg:h-2/3 relative overflow-hidden rounded-md'>
                                        <img src={food1} className='rounded-lg' alt="" />
                                    </div>
                                    <div className='col-span-2'>
                                        <p className='text-lg md:text-2xl font-semibold'>{item.recipe_name}</p>
                                        <p className='text-sm md:text-xl text-primary'>Rp{item.price}</p>
                                        <p className='text-sm md:text-xl'>Amount: {item.quantity}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* delivery */}
                    <div className='bg-gray-100 mt-5 pb-8 rounded-md px-3'>
                        <p className='my-5 font-semibold'>Delivery</p>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                            {delivery.map((item: any, index: number) => {
                                return (
                                    <div key={index} onClick={() => handleDelivery(index, item.price)} className={`${index == thisDelivery ? 'border-2 border-primary shadow-none' : ''} h-16 py-2 px-3 grid gap-2 grid-cols-5 items-center cursor-pointer justify-between rounded-md bg-gray-100 shadow-md`}>
                                        <img src={index == 0 ? gofood : index == 1 ? shopeefood : index == 2 ? grabfood : ''} className='h-auto w-full' alt="" />
                                        <p className='text-xs col-span-3'>{`Receive by ${future1}-${future2}`}</p>
                                        <p className='text-xs text-primary'>Rp{item.price}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* payment */}
                <div className='bg-gray-100 realtive px-3 pb-8 rounded-md'>
                    <p className='my-5 font-semibold'>Payment methods</p>
                    <div className=''>
                        <label htmlFor="my-modal-6" className="btn w-full px-2 py-2 grid grid-cols-5 items-center justify-center text-start rounded-md hover:bg-gray-100 bg-gray-100 shadow-md ">
                            <p className='text-xs col-span-2'>Payment Option</p>
                            <p className='text-end col-span-2 text-xs'>{paymentOptions}</p>
                            <p className='text-center text-xl '>{'>'}</p>
                        </label>
                        <div className='grid grid-cols-2 justify-between my-5 gap-4'>
                            <p>Merchandise subtotal</p>
                            <p className='text-end'>Rp{totalPrice}</p>
                            <p>Shipping subtotal</p>
                            <p className='text-end'>Rp{deliveryPrice}</p>
                            <p>Order Total</p>
                            <p className='text-end'>Rp{totalPrice + deliveryPrice}</p>
                        </div>
                        <div className='flex w-full mt-10 justify-end'>
                            <button onClick={handlePayment} className='btn bg-primary hover:bg-secondary text-white'>Place Order</button>
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
                            <label onClick={() => setPaymentOptions('Qris')} htmlFor="my-modal-6" className='border-b-2 py-4 flex items-center gap-4'>
                                <img className='w-8' src={qris} alt="" />
                                Qris</label>
                            <label onClick={() => setPaymentOptions('GoPay')} htmlFor="my-modal-6" className='border-b-2 py-4 flex items-center gap-4'>
                                <img className='w-8' src={gopay} alt="" />
                                GoPay</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment
