import React, { useEffect, useState } from 'react'
import FormInput from '../Components/FormInput'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useGoogleLogin } from '@react-oauth/google';

import loginImg from '../assets/login.jpg'
import graph from '../assets/graph.png'
import googleImg from '../assets/google.png'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Alert from '../Components/Alert'

const Login = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user'])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [token, setToken] = useState('')

    const handleInputChange = (inputValues: string[]) => {
        setUsername(inputValues[0]);
        setPassword(inputValues[1]);
    }

    // oauth
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            setToken(tokenResponse.access_token)
        },
    });

    const handleOauth = () => {
        if (token != '') {
            axios.post('https://95d1-2001-448a-20e0-90f-34bf-1b6d-b57-7961.ap.ngrok.io/login/google',
                {
                    "token": `${token}`
                })
                .then((response) => {
                    setCookie('user', JSON.stringify(response.data.data), { path: "/" });
                    navigate(`/timeline`)
                })
                .catch((error) => console.log(error))
        }
    }

    // extract token from google
    useEffect(() => {
        handleOauth()
        // axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`)
        //     .then((res) => console.log('res', res.data))
    }, [token])

    useEffect(() => {
        if (cookies.user) {
            navigate('/timeline')
        }
    }, [cookies.user])

    function isAlert() {
        return new Promise(resolve => {
            setTimeout(() => {
                setAlert('')
            }, 5000);
        });
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        axios.post('https://cookit.my-extravaganza.site/login', {
            "username": username,
            "password": password
        })
            .then(async (response) => {
                setCookie('user', JSON.stringify(response.data.data), { path: "/" });
                const id = response.data.data.id
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'sign in has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(`/timeline`)
            })
            .catch(async err => {
                // set value alert to active alert and call isAlert to remove alert (5 seconds)
                setAlert('error')
                const result = await isAlert();
            })
    }

    const responsive = screen.width
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 row-end-3 h-screen relative overflow-hidden justify-center items-center '>
            <Alert type={alert} message='Please enter a valid username or password..' />
            <div className='w-full flex lg:col-span-2 justify-center items-center px-16 md:px-20'>
                <img className='md:h-[50vh] lg:h-[90vh] ' src={loginImg} alt="" />
            </div>
            <div className='w-full h-full px-5 lg:mb-16 md:h-[60vh] flex flex-col items-center'>
                <h1 className='font-bold text-3xl'>Login</h1>
                <form className='sm:w-72 md:w-2/3 lg:px-10 lg:w-72 px-5 pb-8 text-center flex flex-col items-center border-b-2 border-gray-300  '>
                    <FormInput
                        width='full'
                        mdWidth='96'
                        lgWidth='full'
                        inputCount={2}
                        placeholder={['Username', 'Password']}
                        inputType={['text', 'password']}
                        onChange={handleInputChange} />
                    <button onClick={(e) => handleLogin(e)} className='w-full md:w-96 lg:w-full h-8 my-5 rounded-lg text-white font-semibold bg-orange-500' >Login</button>
                    <p className='text-sm'>Create new account <span className='font-semibold cursor-pointer' onClick={() => navigate('/register')}>Sign up</span></p>
                </form>
                <div className='w-56 h-12 mt-5 flex flex-row bg-white items-center rounded-md lg:border-2 shadow-md cursor-pointer '>
                    <img className='w-auto h-full' src={googleImg} alt="" />
                    <p onClick={() => login()} >Continue with Google</p>
                </div>
            </div>
            {responsive < 767
                ? < img className=' -z-10 mt-[95vh] ml-[20vw] absolute' src={graph} alt="" />
                : ''}
        </div>
    )
}

export default Login
