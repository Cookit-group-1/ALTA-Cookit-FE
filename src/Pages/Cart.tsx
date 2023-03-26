import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCart from '../Components/ItemCart'
import CartData from '../Components/CartData.json'

import { IoIosArrowBack } from 'react-icons/io'


const Cart = () => {
    //put the response from api into carts 
    const carts: any = CartData.data.carts;
    const cartsBySeller: any = {};
    const [totalPrice, setTotalPrice] = useState<number>(0)

    // collect price data to array
    let dataPrice: any = []
    const arr = carts.map((item: any) => dataPrice.push(item.price))

    // total price
    useEffect(() => {
        let sum: number = 0;
        for (let i = 0; i < dataPrice.length; i++) {
            sum += dataPrice[i]
        }
        setTotalPrice(sum)
    }, [])

    for (const cart of carts) {
        const { id_seller } = cart;
        if (!cartsBySeller[id_seller]) {
            cartsBySeller[id_seller] = [];
        }
        cartsBySeller[id_seller].push(cart);
    }

    // handle quantity changes
    const handleIncrement = (price: any, id: number, quantity: number) => {
        axios.put(`https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/carts/${id}`, {
            "quantity": quantity + 1
        })
            .then((response) => {
                console.log(response.data)
                setTotalPrice(totalPrice + price)
            })
    }

    const handleDecrement = (price: any, id: number, quantity: number) => {
        axios.put(`https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/users/carts/${id}`, {
            "quantity": quantity + 1
        })
            .then((response) => {
                console.log(response.data)
                setTotalPrice(totalPrice - price)
            })
    }


    const responsive = screen.width
    return (
        <div className='bg-gray-100'>
            <div className='w-full h-16 px-5 grid grid-cols-3 items-center bg-primary'>
                <IoIosArrowBack className='text-2xl col-span-1 text-white' />
                <h1 className='text-xl font-semibold text-white text-center '>Cart</h1>
            </div>
            {responsive > 1024
                ? <div className='w-full sticky top-0 z-50 h-12 grid grid-cols-5 lg:mb-3 items-center bg-white font-semibold text-center'>
                    <p className='col-span-2'>Product</p>
                    <p>Unit Price </p>
                    <p>Quantity</p>
                </div>
                : ''
            }
            {/* card store */}
            <div className='bg-gray-100 flex flex-col gap-5'>
                {Object.keys(cartsBySeller).map((key, index) => {
                    const cartItems = cartsBySeller[key];
                    const sellerName = cartsBySeller[key][0].seller_name
                    return (
                        <div key={key}>
                            <ItemCart cartItems={cartItems} sellerName={sellerName} increment={(price, id, quantity) => handleIncrement(price, id, quantity)} decrement={(price, id, quantity) => handleDecrement(price, id, quantity)} />
                        </div>
                    );
                })}
            </div>
            <div className='w-full h-16 px-5 lg:px-10 grid grid-cols-3 place-content-center items-center sticky bottom-0 bg-gray-100'>
                <p className='col-span-2 font-semibold '>Total : <span className='text-primary'>Rp{totalPrice}</span> </p>
                <button className='w-full md:w-2/3 lg:w-1/3 py-2 place-self-end text-white font-semibold rounded-md bg-primary '>Checkout</button>
            </div>
        </div>
    )
}

export default Cart
