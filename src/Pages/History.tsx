import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { Swiper, SwiperSlide } from 'swiper/react';
import ToPay from '../Components/ToPay';
import ToShip from '../Components/ToShip';
import ToReceive from '../Components/ToReceive';
import Completed from '../Components/Completed';
import CardHistory from '../Components/CardHistory';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import historyData from '../components/historyData.json';


const History = () => {
    const [cookies, setCookies] = useCookies(['user'])
    const navigate = useNavigate()
    const [data, setData] = useState<any>([])
    const [router, setRouter] = useState('toPay')

    useEffect(() => {
        getData()
        if (cookies.user == undefined) {
            navigate('/login')
        }
    }, [])

    const getData = () => {
        setData(historyData.data)
    }
    console.log('b',data)

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
            <Header title='My Purchase' />
            {/* navigate */}
            <div className='w-full h-16 text-white px-3 text-center flex items-center gap-10 bg-primary realtive overflow-hidden'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={screen.width > 767 ? 4 : 2.5}
                >
                    <SwiperSlide>
                        <p onClick={() => setRouter('toPay')} className={`${router == 'toPay' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20 cursor-pointer`}>To pay</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p onClick={() => setRouter('toShip')} className={`${router == 'toShip' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20 cursor-pointer`}>To Ship</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p onClick={() => setRouter('toReceive')} className={`${router == 'toReceive' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20 cursor-pointer`}>To Receive</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <p onClick={() => setRouter('completed')} className={`${router == 'completed' ? 'border-b-2 border-warning font-bold' : ''} h-9 lg:mx-20  cursor-pointer`}>Completed</p>
                    </SwiperSlide>
                </Swiper>
            </div>
            {data.map((item: any, index: number) => {
                // console.log('f',item)
                return (
                    <div key={index} onClick={() => handleDetailHistory(index)} className='bg-gray-100'>
                        {
                            router == 'toPay' ? <CardHistory titleBtn='Pay' title='to pay' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                : router == 'toShip' ? <CardHistory titleBtn='Order Received' route='toShip' title='to ship' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                    : router == 'toReceive' ? <CardHistory titleBtn='Order Received' title='to receive' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                        : router == 'completed' ? <CardHistory titleBtn={item.created_at} route='completed' title='completed' transactionDetails={item.transaction_details} totalPrice={item.total_price}/>
                                            : ''
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default History
