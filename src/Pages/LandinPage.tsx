import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AiFillHeart } from 'react-icons/ai'
import { MdModeComment } from 'react-icons/md'
import React, { useEffect } from "react";
import ScrollAnimation from "../Components/ScrollAnimation";

import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/food1.jpg'
import pic3 from '../assets/food2.jpg'
import pic4 from '../assets/food3.jpg'
import pic5 from '../assets/post1.png'
import pic6 from '../assets/pic2.png'
import pic7 from '../assets/pic3.png'
import pic8 from '../assets/pic4.png'
import pic9 from '../assets/pp1.jpg'
import pic10 from '../assets/pp2.jpg'
import pic12 from '../assets/pp3.jpg'

import pic11 from '../assets/bg2.png'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const LandingPage: React.FC = () => {
    const responsive = screen.width
    const [cookies, setCookie] = useCookies(['user'])
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.user) {
            navigate('/timeline')
        }
    }, [cookies.user])

    return (
        <div className='px-5 pb-16 flex flex-col gap-10' >
            <header className='w-full h-20 md:h-20 2xl:h-24 flex items-center justify-between '>
                <ScrollAnimation duration={1.5}>
                    <h1 className='text-2xl 2xl:text-3xl font-bold text-orange-500'>Cookit</h1>
                </ScrollAnimation>
                <Link to='/login'>
                    <button className={`lg:w-32 px-4 py-2 lg:py-3 ${responsive > 767 ? 'text-orange-500 bg-white border2' : 'text-white rounded-md  bg-orange-500 '} md:font-bold 2xl:font-bold 2xl:text-xl rounded-md text-center`}>Sign in</button>
                </Link>
            </header>
            <section className='w-full md:h-96 lg:h-[80vh] py-4 grid grid-cols-1 md:grid-cols-2 text-center ' >
                <ScrollAnimation duration={3}>
                    <div className='flex flex-col mb-16 justify-center lg:mt-16 xl:mt-24 2xl:mt-44 gap-5 2xl:gap-10'>
                        <p className='text-3xl md:text-4xl 2xl:text-5xl font-bold '>What are you going to <br /> <span className='text-orange-500'>cook</span> today</p>
                        <p className='font-semibold lg:text-xl 2xl:text-3xl'>Keep it easy with these simple but delicious recipes
                            From make-ahead lunches and midweek meals to
                            fuss-free sides.
                        </p>
                    </div>
                </ScrollAnimation>
                {responsive > 767
                    ? <div>
                        <img className='w-2/3 lg:h-screen lg:w-auto absolute top-0 right-0 -z-10' src={pic11} alt="" />
                    </div>
                    : ''
                }
            </section>
            <section id='1' className='w-full grid grid-cols-2 items-center gap-5'>
                <ScrollAnimation duration={2}>
                    <img src={pic1} alt="" />
                </ScrollAnimation>
                <ScrollAnimation duration={1}>
                    <p className='font-semibold md:text-3xl lg:text-3xl'>Discover recipes from around the <span className='text-orange-500'>world</span> </p>
                </ScrollAnimation>
            </section>
            <section >
                <ScrollAnimation duration={1}>
                    <p className='mb-10 mt-10  text-center text-xl lg:text-3xl font-bold'>Most Popular <span className='text-orange-500'>Food</span></p>
                </ScrollAnimation>
                <div className='w-full mt-5 lg:px-32 grid grid-cols-3 gap-3 lg:gap-10'>
                    <ScrollAnimation duration={3}>
                        <div className='w-full h-fit lg:pb-10 bg-white rounded-md relative shadow-md overflow-hidden '>
                            <img src={pic2} alt="" />
                            <p className='text-xs lg:text-2xl md:font-bold mt-1 '>Franch Sausage</p>
                            <div className='mt-5 pl-5 text-sm md:text-xl lg:text-xl grid grid-cols-2 md:grid-cols-3 gap-2 items-center'>
                                <div className='flex items-center'>
                                    <MdModeComment className=' text-orange-500 ' />
                                    <p>757</p>
                                </div>
                                <div className='flex items-center' >
                                    <AiFillHeart className='text-red-500' />
                                    <p>1250</p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation duration={1}>
                        <div className='w-full h-fit mt-8 lg:pb-10 bg-white rounded-md relative shadow-md overflow-hidden'>
                            <img src={pic3} alt="" />
                            <p className='text-xs lg:text-2xl md:font-bold mt-1 '>Franch Sausage</p>
                            <div className='mt-5 pl-5 text-sm md:text-xl lg:text-xl grid grid-cols-2 md:grid-cols-3 gap-2 items-center'>
                                <div className='flex items-center'>
                                    <MdModeComment className=' text-orange-500 ' />
                                    <p>983</p>
                                </div>
                                <div className='flex items-center' >
                                    <AiFillHeart className='text-red-500' />
                                    <p>3500</p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation duration={3}>
                        <div className='w-full h-fit lg:pb-10 bg-white rounded-md relative shadow-md overflow-hidden '>
                            <img src={pic4} alt="" />
                            <p className='text-xs lg:text-2xl md:font-bold mt-1 '>Franch Sausage</p>
                            <div className='mt-5 pl-5 text-sm md:text-xl lg:text-xl grid grid-cols-2 md:grid-cols-3 gap-2 items-center'>
                                <div className='flex items-center'>
                                    <MdModeComment className=' text-orange-500 ' />
                                    <p>703</p>
                                </div>
                                <div className='flex items-center' >
                                    <AiFillHeart className='text-red-500' />
                                    <p>1200</p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </section>
            <ScrollAnimation duration={3}>
                <p className='text-center mt-10 text-xl lg:text-3xl font-bold' >Sell Your <span className='text-orange-500'>Food</span></p>
            </ScrollAnimation>
            <section>
                <div className={`grid px-10 ${responsive > 800 ? 'grid-cols-2' : 'grid-cols-1'} items-center gap-10`}>
                    <ScrollAnimation duration={1}>
                        {responsive > 800
                            ? <p className='text-3xl font-semibold'><span className='text-orange-500'>Tell</span> the  whole <span className='text-orange-500'>world</span> your
                                recipe or sell your <span className='text-orange-500'>food</span> so the
                                whole world knows</p>
                            : ''
                        }
                    </ScrollAnimation>
                    <ScrollAnimation duration={2}>
                        <img className='lg:h-auto lg:w-full' src={pic5} alt="" />
                    </ScrollAnimation>
                </div>
            </section>
            <ScrollAnimation duration={1}>
                <p className='mt-10 text-center text-xl lg:text-3xl font-bold'>Why Choose Our <span className='text-orange-500'>Food</span></p>
            </ScrollAnimation>
            <section className='h-fit px-5 grid grid-cols-1 md:grid-cols-3 gap-5'>
                <ScrollAnimation duration={1}>
                    <div className='w-full h-full py-10 px-10 grid grid-row-2 gap-5 rounded-xl shadow-xl '>
                        <img src={pic6} className='w-2/3 mx-auto' alt="" />
                        <p className='text-orange-500 font-bold text-xl md:mt-8'>Quality Food</p>
                        <p className='font-bold md:text-sm '>Keep healthy food readily available.
                            When you get hungry, you're mroe
                            likely to eat
                        </p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation duration={2}>
                    <div className='w-full h-full py-10 px-10 grid grid-row-2 gap-5 rounded-xl shadow-xl '>
                        <img src={pic7} className='w-2/3 mx-auto' alt="" />
                        <p className='text-orange-500 font-bold text-xl'>Super Taste</p>
                        <p className='font-bold md:text-sm'>Keep healthy food readily
                            available. When you get hungry,
                            you're moe likely to eat
                        </p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation duration={3}>
                    <div className='w-full h-full py-10 px-10 grid grid-row-2 gap-5 rounded-xl shadow-xl '>
                        <img src={pic8} className='w-2/3 mx-auto' alt="" />
                        <p className='text-orange-500 font-bold text-xl'>Fast Delivery</p>
                        <p className='font-bold md:text-sm  '>Keep healthy food readily available.
                            When you get hungry, you're mroe
                            likely to eat
                        </p>
                    </div>
                </ScrollAnimation>
            </section>
            <ScrollAnimation duration={2}>
                <section className='w-full h-72 px-5'>
                    <ScrollAnimation duration={1}>
                        <p className='mt-10 text-center text-xl lg:text-3xl font-bold'>Customer  <span className='text-orange-500'>say</span></p>
                    </ScrollAnimation>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                    >
                        <SwiperSlide>
                            <div className='md:px-16 lg:px-24'>
                                <div className='mt-10 mb-5'>
                                    <img className='rounded-full w-10' src={pic9} alt="" />
                                    <p className='col-span-3 font-bold'>Mary Luketch</p>
                                </div>
                                <p className='md:text-xl lg:text-2xl '>“ really good for those who are just learning to cook, the recipe is very complete, simple, you can recook too, very happy, thank you "
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='md:px-16 lg:px-24'>
                                <div className='mt-10 mb-5'>
                                    <img className='rounded-full w-10' src={pic10} alt="" />
                                    <p className='col-span-3 font-bold'>Tom Michle</p>
                                </div>
                                <p className='md:text-xl lg:text-2xl '>“ Thank you; it's not in vain that I use this application. At first I couldn't cook, but I learned from here for a long time, so I can cook. "
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='md:px-16 lg:px-24'>
                                <div className='mt-10 mb-5'>
                                    <img className='rounded-full w-10 ' src={pic12} alt="" />
                                    <p className='col-span-3 font-bold'>William boy</p>
                                </div>
                                <p className='md:text-xl lg:text-2xl '>“ so it's easy if you want to cook, just open Cookit, before I couldn't cook but now I can"
                                </p>
                            </div>
                        </SwiperSlide>
                        <p className='font-bold text-3xl text-center text-orange-500'>. . .</p>
                    </Swiper>
                </section>
            </ScrollAnimation>
        </div>
    )
}

export default LandingPage
