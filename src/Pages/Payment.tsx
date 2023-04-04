import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import DeliveryData from '../Components/DeliveryData.json'
import { useLocation } from 'react-router-dom'

import food1 from '../assets/food1.jpg'
import gofood from '../assets/gofood.png'
import shopeefood from '../assets/shopeefood.png'
import grabfood from '../assets/grabfood.png'
import bni from '../assets/bni.png'
import bri from '../assets/bri.png'
import bca from '../assets/bca.png'
import banktransfer from '../assets/banktransfer.png'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Format from '../Components/Format'
import LoadingSpinner from '../Components/LoadingSpinner'

const Payment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0)
    const [deliveryName, setDeliveryName] = useState<string>('')
    const [totalPrice, setTotalPrice] = useState<number>(location.state.total)
    const [thisDelivery, setThisDelivery] = useState<number>()
    const [paymentOptions, setPaymentOptions] = useState('')
    const [alert, setAlert] = useState('')
    const [cookies, setCookies] = useCookies(['user'])
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const delivery = DeliveryData.data
    const handleDelivery = (index: any, price: number, name: string) => {
        setDeliveryPrice(price)
        setDeliveryName(name)
        setThisDelivery(index)
    }

    function isAlert() {
        return new Promise(resolve => {
            setTimeout(() => {
                setAlert('')
            }, 5000);
        });
    }

    const [transactionDetails, setTransactionDetails] = useState([])
    // collect data trasaction details
    useEffect(() => {
        let dataTransaction: any = []
        let arrTransactions = {}
        location.state.data.map((item: any, index: number) => {
            dataTransaction.push(arrTransactions = {
                "ingredient_id": item.ingredient_id,
                "quantity": item.quantity
            })
        })
        setTransactionDetails(dataTransaction)
    }, [])

    const handleAlert = async () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please select shipping options and payment options',
        })
    }

    const handlePayment = () => {
        setLoading(true)
        axios.post('https://cookit.my-extravaganza.site/login', {
            "username": cookies.user.username,
            "password": password
        }).then((response) => {
            axios.post('https://cookit.my-extravaganza.site/users/transactions', {
                "transaction_details": transactionDetails,
                "payment_method": paymentOptions,
                "shipping_method": deliveryPrice,
                "shipping_fee": deliveryName
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.user.token}`
                }
            }).then((response) => {
                setLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfull Order',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/detailhistory', {
                    state: {
                        data: response.data.data
                    }
                })
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter the password correctly',
            })
            setLoading(false)
        })
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
            {loading
                ? <div className='absolute w-full h-full bg-transparent flex items-center justify-center z-50'>
                    <LoadingSpinner />
                </div>
                : ''}
            <Header link='cart' title='Payment' />
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
                                        <p className='text-sm md:text-xl text-primary'><Format>{item.price}</Format> </p>
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
                                    <div key={index} onClick={() => handleDelivery(index, item.name, item.price)} className={`${index == thisDelivery ? 'border-2 border-primary shadow-none' : ''} h-16 py-2 px-3 grid gap-2 grid-cols-5 items-center cursor-pointer justify-between rounded-md bg-gray-100 shadow-md`}>
                                        <img src={index == 0 ? gofood : index == 1 ? shopeefood : index == 2 ? grabfood : ''} className='h-auto w-full' alt="" />
                                        <p className='text-xs col-span-3'>{`Receive by ${future1}-${future2}`}</p>
                                        <p className='text-xs md:text-[10px] text-primary'><Format>{item.price}</Format> </p>
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
                            <p className='text-end'><Format>{totalPrice}</Format> </p>
                            <p>Shipping subtotal</p>
                            <p className='text-end'><Format>{deliveryName ? deliveryName : 0}</Format> </p>
                            <p>Order Total</p>
                            <p className='text-end'><Format>{totalPrice + deliveryName}</Format></p>
                        </div>
                        <div className='flex w-full mt-10 justify-end'>
                            {deliveryPrice != 0 && paymentOptions != ''
                                ? <label htmlFor="my-modal-7" className='btn bg-primary hover:bg-secondary text-white'>Place Order</label>
                                : <button onClick={handleAlert} className='btn bg-primary hover:bg-secondary text-white'>Place Order</button>
                            }
                        </div>

                        <input type="checkbox" id="my-modal-7" className="modal-toggle " />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box flex gap-5 flex-col ">
                                <p className='text-center'>Please confirm your password</p>
                                <div className='flex flex-col gap-5 px-10'>
                                    <input type="password" className='border-2 border-black py-2 px-2 rounded-md' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                                </div>
                                <div className="modal-action">
                                    <label htmlFor="my-modal-7" className="btn bg-primary hover:bg-secondary text-white">close</label>
                                    <label htmlFor="my-modal-7" onClick={handlePayment} className="btn bg-primary hover:bg-secondary text-white">Confirm</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal payment option */}
                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Payment Option</h3>
                        <div>
                            <label className='border-b-2 py-4 flex items-center gap-4'>
                                <img className='w-8' src={banktransfer} alt="" />
                                Bank Transfer</label>
                            <label onClick={() => setPaymentOptions('BCA')} htmlFor="my-modal-6" className='border-b-2 py-4 pl-10 flex items-center gap-4'>
                                <img className='w-8' src={bca} alt="" />
                                Bank BCA</label>
                            <label onClick={() => setPaymentOptions('BNI')} htmlFor="my-modal-6" className='border-b-2 py-4 pl-10 flex items-center gap-4'>
                                <img className='w-8' src={bni} alt="" />
                                Bank BNI</label>
                            <label onClick={() => setPaymentOptions('BRI')} htmlFor="my-modal-6" className='border-b-2 py-4 pl-10 flex items-center gap-4'>
                                <img className='w-8' src={bri} alt="" />
                                Bank BRI</label>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Payment


