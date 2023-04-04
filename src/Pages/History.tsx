import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { Swiper, SwiperSlide } from 'swiper/react';
import CardHistory from '../Components/CardHistory';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingSpinner from '../Components/LoadingSpinner';
import clipboard from '../assets/clipboard.png'

const History = () => {
    const MAX_TIME = 10;
    let intervalId: any;
    const [cookies, setCookies] = useCookies(['user'])
    const navigate = useNavigate()
    const [data, setData] = useState<any>([])
    const [router, setRouter] = useState('Unpaid')
    const [count, setCount] = useState(0);
    const [idTransaction, setIdTransaction] = useState<any>([]);
    const [received, setReceived] = useState(false)
    const [loading, setLoading] = useState(false)

    // get data transactions 
    const getData = async () => {
        setLoading(true)
        setData([])
        await axios.get(`https://cookit.my-extravaganza.site/users/transactions?status=${router}`, {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
            .then((response) => {
                setData(response.data.data)
            })
            .catch((error) => { console.error(error) })
        setLoading(false)
    }

    // go to detail transaction page 
    const handleDetailHistory = (index: number) => {
        navigate('/detailhistory', {
            state: {
                data: data[index]
            }
        })
    }

    // useEffect will render every second until get data 
    useEffect(() => {
        intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    async function fetchData() {
        const response = await fetch('https://cookit.my-extravaganza.site/users/transactions?status=Shipped', {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        });
        const data = await response.json();
        if (data) {
            setIdTransaction(data.data[0].id);
            clearInterval(intervalId);
        }
    }

    // counts to 20 seconds then changes status 
    // This count will not be repeated if realoded
    useEffect(() => {
        if (idTransaction.length != 0) {
            let interval: NodeJS.Timeout;
            const storedCount = localStorage.getItem("count");
            if (storedCount) {
                setCount(parseInt(storedCount));
            }

            if (count < MAX_TIME) {
                interval = setInterval(() => {
                    setCount((prevCount) => {
                        const newCount = prevCount + 1;
                        localStorage.setItem("count", newCount.toString());
                        return newCount;
                    });
                }, 1000);
            }

            if (count === MAX_TIME) {
                const headers = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.user.token}`
                    },
                };

                fetch(`https://cookit.my-extravaganza.site/users/transactions/${idTransaction}/status`, headers)
                    .then(response => response.json())
                    .catch(error => console.error(error));
                localStorage.clear();
            }

            return () => {
                clearInterval(interval);
            };
        }
    }, [count, idTransaction]);

    const orderReceived = (id: number) => {
        const headers = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.user.token}`
            },
        };

        fetch(`https://cookit.my-extravaganza.site/users/transactions/${id}/status`, headers)
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Order Received',
                    showConfirmButton: false,
                    timer: 1500
                })
                setReceived(!received)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getData()
    }, [router, received])

    return (
        <div className={`bg-gray-100 ${data.length >= 1 ? '' : 'h-screen'} `}>
            <Header link='timeline' title='My Purchase' />
            {/* navigate */}
            <div className='w-full h-16 text-gray-100 px-3 text-center flex sticky top-16 z-50 items-center gap-10 bg-primary realtive overflow-hidden'>
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
            {loading
                ? <div className='absolute top-[10vh] w-full h-full bg-transparent flex justify-center z-50'>
                    <LoadingSpinner />
                </div>
                : <>
                    {data.length >= 1
                        ? <>
                            {data.map((item: any, index: number) => {
                                return (
                                    <div key={index} className='bg-white mt-3'>
                                        {
                                            router == 'Unpaid' ? <CardHistory handleDetailHistory={() => handleDetailHistory(index)} titleBtn='Pay' route='Unpaid' title='to pay' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                                : router == 'Shipped' ? <CardHistory handleDetailHistory={() => handleDetailHistory(index)} titleBtn='Order Received' route='Shipped' title='Shipped' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                                    : router == 'Received' ? <CardHistory handleDetailHistory={() => handleDetailHistory(index)} route='Received' orderReceived={() => orderReceived(data[index].id)} titleBtn='Order Received' title='Received' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                                        : router == 'Complete' ? <CardHistory handleDetailHistory={() => handleDetailHistory(index)} titleBtn={item.created_at} route='Complete' title='Complete' transactionDetails={item.transaction_details} totalPrice={item.total_price} />
                                                            : ''
                                        }
                                    </div>
                                )
                            })
                            }
                        </>
                        : <div className='flex justify-center mt-[30vh]'>
                            <img src={clipboard} className='w-2/6 md:w-1/6 lg:w-1/12' alt="" />
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default History
