import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import food1 from '../assets/food1.jpg'
import CartData from '../Components/CartData.json'
import ItemCart from './ItemCart';

const ToPay = () => {
    const [cookies, setCookies] = useCookies(['user'])
    const token = cookies.user.token

    const carts: any = CartData.data.carts;
    const cartsBySeller: any = {};
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const initCard: any = []

    for (const cart of carts) {
        const { id_seller } = cart;
        if (!cartsBySeller[id_seller]) {
            cartsBySeller[id_seller] = [];
        }
        initCard.push(id_seller)
        cartsBySeller[id_seller].push(cart);
    }
    useEffect(() => {
    }, [])
        const idCard = parseInt(initCard[0].toString())
        console.log('c', cartsBySeller[idCard])

    // handle quantity changes
    const handleIncrement = (price: any, id: number, quantity: number) => {
        axios.put(`https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/carts/${id}`, {
            "quantity": quantity + 1
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setTotalPrice(totalPrice + price)
            })
    }

    const handleDecrement = (price: any, id: number, quantity: number) => {
        axios.put(`https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/carts/${id}`, {
            "quantity": quantity + 1
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setTotalPrice(totalPrice - price)
            })
    }

    const deleteCartItem = (id: number) => {
        console.log(id)
        axios.delete(`https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/carts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
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

    const responsive = screen.width
    return (
        <div className='bg-gray-100'>
            {responsive > 1024
                ? <div className='w-full sticky top-0 z-50 h-12 grid grid-cols-5 lg:mb-3 items-center bg-white font-semibold text-center'>
                    <p className='col-span-2'>Product</p>
                    <p>Unit Price </p>
                    <p>Quantity</p>
                </div>
                : ''
            }
            <div className='bg-gray-100 flex flex-col gap-5'>
                {Object.keys(cartsBySeller[idCard]).map((key, index) => {

                    const cartItems = cartsBySeller[idCard];
                    const sellerName = cartsBySeller[idCard][0].seller_name
                    console.log(cartsBySeller)
                    return (
                        <div key={index}>
                            <ItemCart cartItems={cartItems} sellerName={sellerName} increment={(price, id, quantity) => handleIncrement(price, id, quantity)} decrement={(price, id, quantity) => handleDecrement(price, id, quantity)} deleteCartItem={deleteCartItem} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ToPay
