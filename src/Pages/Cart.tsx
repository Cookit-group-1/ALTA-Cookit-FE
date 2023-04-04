import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCart from '../Components/ItemCart'

import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import NavBack from '../Components/NavBack'
import Format from '../Components/Format'
import trolley from '../assets/trolley.png'
import LoadingSpinner from '../Components/LoadingSpinner'


const Cart = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user', 'cart'])
    const token = cookies.user.token
    const [carts, setCarts] = useState<any>([])
    const cartsBySeller: any = {};
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [dataCartChecked, setDataCartChecked] = useState<any[]>([])
    const [quantity, setQuantity] = useState(0)
    const [loading, setLoading] = useState(false)

    // get cart data
    const getCartData = () => {
        setLoading(true)
        axios.get('https://cookit.my-extravaganza.site/users/carts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setCarts(response.data.data)
            })
            .catch((error) => console.log(error))
        setLoading(false)
    }

    // collect price data to array
    let dataPrice: any = []
    const arr = dataCartChecked?.map((item: any) => {
        let oneProduct = 0
        if (quantity >= 1) {
            oneProduct = item.price * item.quantity
        } else {
            oneProduct = item.price * item.quantity
        }
        dataPrice.push(oneProduct)
    })
    useEffect(() => {
        setQuantity(0)
    }, [setDataCartChecked])

    // collect carts data to array
    for (const cart of carts) {
        const { id_seller } = cart;
        if (!cartsBySeller[id_seller]) {
            cartsBySeller[id_seller] = [];
        }
        cartsBySeller[id_seller].push(cart);
    }

    // handle quantity changes +
    const handleIncrement = (price: any, id: number, quantity: number) => {
        axios.put(`https://cookit.my-extravaganza.site/users/carts/${id}`, {
            "quantity": quantity + 1
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setTotalPrice(totalPrice + price)
                setQuantity(quantity + 1)
            })
    }

    // handle quantity changes -
    const handleDecrement = (price: any, id: number, quantity: number) => {
        axios.put(`https://cookit.my-extravaganza.site/users/carts/${id}`, {
            "quantity": quantity - 1
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setTotalPrice(totalPrice - price)
                setQuantity(quantity - 1)
            })
    }

    // delete cart
    const deleteCartItem = (id: number) => {
        axios.delete(`https://cookit.my-extravaganza.site/users/carts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                let sum: any = cookies.cart - 1
                setCookie('cart', sum, { path: "/" })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Delete has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    const goToPayment = () => {
        navigate(`/payment`, {
            state: {
                data: dataCartChecked,
                total: totalPrice
            }
        })
    }

    // total price
    useEffect(() => {
        setLoading(true)
        getCartData()
        let sum: number = 0;
        for (let i = 0; i < dataPrice.length; i++) {
            sum += dataPrice[i]
        }
        setTotalPrice(sum)
    }, [deleteCartItem, handleIncrement, quantity])

    let idCart = carts.map((item: any) => item.id)

    // remove data unchecked
    let checkedIndex = dataCartChecked.map((item: any) => item.id)
    const removeData = (e: any) => {
        let arr = [...dataCartChecked]
        let index = checkedIndex.indexOf(e)
        arr.splice(index, 1);
        setDataCartChecked(arr)
    }


    const responsive = screen.width
    return (
        <div className={`bg-gray-100 ${carts.length >= 1 ? '' : 'h-screen'} `}>
            {loading
                ? <div className='absolute w-full h-full bg-primary flex items-center justify-center z-50'>
                    <LoadingSpinner />
                </div>
                : <>
                    <NavBack title='Cart' />
                    {responsive > 1024
                        ? <div className='w-full fixed mt-16 top-0 z-50 h-16 grid grid-cols-5 lg:mb-3 items-center bg-white font-semibold text-center'>
                            <p className='col-span-2'>Product</p>
                            <p>Unit Price </p>
                            <p>Quantity</p>
                        </div>
                        : ''
                    }
                    {carts.length >= 1
                        ? <>
                            <div className={`bg-gray-100 lg:mt-20 flex flex-col gap-5`}>
                                {Object.keys(cartsBySeller)?.map((key, index) => {
                                    const cartItems = cartsBySeller[key];
                                    const sellerName = cartsBySeller[key][0].seller_user_username
                                    return (
                                        <>
                                            <div key={key}>
                                                <ItemCart
                                                    getIdProduct={(e) => { !e.target.checked ? removeData(parseInt(e.target.value)) : setDataCartChecked(dataCartChecked.concat(carts[idCart.indexOf(parseInt(e.target.value))])) }}
                                                    cartItems={cartItems} sellerName={sellerName}
                                                    increment={(price, id, quantity) => handleIncrement(price, id, quantity)}
                                                    decrement={(price, id, quantity) => handleDecrement(price, id, quantity)}
                                                    deleteCartItem={deleteCartItem} />
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                            <div className='w-full h-16 px-5 lg:px-10 grid grid-cols-3 place-content-center items-center fixed bottom-0 bg-gray-100'>
                                <p className='col-span-2 font-semibold '>Total : <span className='text-Primary'> <Format>{totalPrice}</Format> </span> </p>
                                {dataCartChecked.length != 0
                                    ? <button onClick={goToPayment} className='w-full md:w-2/3 lg:w-1/3 py-2 place-self-end text-center text-white font-semibold rounded-md bg-primary'>Checkout</button>
                                    : <button className='w-full md:w-2/3 lg:w-1/3 py-2 place-self-end text-white font-semibold rounded-md bg-gray-400'>Checkout</button>
                                }
                            </div>
                        </>
                        : <div className='flex justify-center mt-[30vh]'>
                            <img src={trolley} className='w-2/6 md:w-1/6 lg:w-1/12' alt="" />
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Cart
