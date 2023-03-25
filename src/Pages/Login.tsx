import React, { useState } from 'react'
import FormInput from '../Components/FormInput'
import axios from 'axios'
import { useCookies } from 'react-cookie'


import loginImg from '../assets/login.jpg'
import graph from '../assets/graph.png'
import googleImg from '../assets/google.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['dataUser'])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleInputChange = (inputValues: string[]) => {
        const firstInputValue = inputValues[0];
        const secondInputValue = inputValues[1];
        setEmail(firstInputValue);
        setPassword(secondInputValue);
    };

    const handleLogin = (e: any) => {
        e.preventDefault()
        axios.post('https://virtserver.swaggerhub.com/STARCON10_1/ALTA-Cookit-BE/1.0/login', {
            "email": email,
            "password": password
        })
            .then(response => {
                setCookie('dataUser', JSON.stringify(response.data.data))
                const id = response.data.data.id
                console.log(id)
                // navigate(`/home/${id}`)
                console.log(email)
                console.log(password)
            })
            .catch(err => console.log(err))
    }

    const responsive = screen.width
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 row-end-3 h-screen relative overflow-hidden justify-center items-center '>
            <div className='w-full flex lg:col-span-2 justify-center items-center px-16 md:px-20'>
                <img className='md:h-[50vh] lg:h-[90vh] ' src={loginImg} alt="" />
            </div>
            <div className='w-full h-full px-5 lg:mb-16 md:h-[60vh] flex flex-col items-center'>
                <h1 className='font-bold text-3xl'>Login</h1>
                <form className='sm:w-72 md:w-2/3 lg:w-72 px-5 pb-8 text-center flex flex-col items-center border-b-2 border-gray-300  '>
                    <FormInput
                        width='full'
                        mdWidth='96'
                        lgWidth='full'
                        inputCount={2}
                        placeholder={['Email', 'Password']}
                        inputType={['email', 'password']}
                        onChange={handleInputChange} />
                    <button onClick={(e) => handleLogin(e)} className='w-full md:w-96 lg:w-full h-8 my-5 rounded-lg text-white font-semibold bg-orange-500' >Login</button>
                    <p>Create new account <span className='font-bold cursor-pointer' onClick={() => navigate('/register')}>Sign up</span></p>
                </form>
                <div className='w-56 h-12 mt-5 flex flex-row bg-white items-center border-2 rounded-md '>
                    <img className='w-auto h-full' src={googleImg} alt="" />
                    <p>Continue with Google</p>
                </div>
            </div>
            {responsive < 767
                ? < img className=' -z-10 mt-[95vh] ml-[20vw] absolute' src={graph} alt="" />
                : ''}
        </div>
    )
}

export default Login
