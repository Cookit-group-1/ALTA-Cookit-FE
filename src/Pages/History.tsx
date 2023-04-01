import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { Swiper, SwiperSlide } from 'swiper/react';
import Completed from '../Components/Completed';
import CardHistory from '../Components/CardHistory';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import historyData from '../components/historyData.json';
import axios from 'axios';


const History = () => {
    const [cookies, setCookies] = useCookies(['user'])
    const navigate = useNavigate()
    const [data, setData] = useState<any>([])
    const [router, setRouter] = useState('Unpaid')

    useEffect(() => {
        getData()
    }, [router])

    const getData = async () => {
        setData([])
        await axios.get(`https://cookit.my-extravaganza.site/users/transactions?status=${router}`,{
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
        .then((response) => {
            console.log('z',response.data.data)
            setData(response.data.data)
        })
        .catch((error) => {console.error(error)})
    }

    const handleDetailHistory = (index:number) => {
        console.log(index)
        navigate('/detailhistory',{
            state : {
                data : data[index]
            }
        })
    }

    return (
        <div className='bg-gray-100'>
            <Header link='cart' title='My Purchase' />
            {/* navigate */}
            <div className='w-full h-16 text-gray-100 px-3 text-center flex items-center gap-10 bg-primary realtive overflow-hidden'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={screen.width > 767 ? 4 : 2.5}
                >
                    <SwiperSlide>
                        <p onClick={() => setRouter('Unpaid')} className={`${router == 'Unpaid' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20 cursor-pointer`}>Unpaid</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p onClick={() => setRouter('Shipped')} className={`${router == 'Shipped' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20 cursor-pointer`}>Shipped</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p onClick={() => setRouter('Received')} className={`${router == 'Received' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20 cursor-pointer`}>Received</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p onClick={() => setRouter('Complete')} className={`${router == 'Complete' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20  cursor-pointer`}>Complete</p>
                    </SwiperSlide>
                </Swiper>
            </div>
            {data.map((item: any, index: number) => {
                console.log('f',item)
                return (
                    <div key={index} onClick={() => handleDetailHistory(index)} className='bg-white'>
                        {
                            router == 'Unpaid' ? <CardHistory titleBtn='Pay' title='to pay' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                : router == 'Shipped' ? <CardHistory titleBtn='Order Received' route='Shipped' title='Shipped' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                    : router == 'Received' ? <CardHistory titleBtn='Order Received' title='Received' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                        : router == 'Complete' ? <CardHistory titleBtn={item.created_at} route='Complete' title='Complete' transactionDetails={item.transaction_details} totalPrice={item.total_price}/>
                                            : ''
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default History
