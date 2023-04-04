import React, { useEffect, useState } from 'react'
import FormInput from '../Components/FormInput'
import signupImg from '../assets/signup.jpg'
import graph from '../assets/graph.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Cookies, useCookies } from 'react-cookie'
import Alert from '../Components/Alert'
import { BiCheck } from 'react-icons/bi'

const Register = () => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user'])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [alert, setAlert] = useState('')
    const [length, setLength] = useState(false)
    const [oneNumber, setOneNumber] = useState(false)
    const [upperCase, setUpperCase] = useState(false)

    // handle validation password
    const handleInputChange = (inputValues: string[]) => {
        setUsername(inputValues[0])
        setEmail(inputValues[1])
        setPassword(inputValues[2])
        const regex = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

        const isValidLength:any = /[a-zA-Z0-9]{8,}/.test(password);
        const isValidNumber = /[0-9]/.test(password);
        const isValidUpperCase = /[A-Z]/.test(password);

        setLength(isValidLength);
        setOneNumber(isValidNumber);
        setUpperCase(isValidUpperCase);
    };

    function isAlert() {
        return new Promise(resolve => {
            setTimeout(() => {
                setAlert('')
            }, 5000);
        });
    }

    const handleRegister = (e: any) => {
        e.preventDefault()
        axios.post('https://cookit.my-extravaganza.site/register', {
            "username": username,
            "email": email,
            "password": password
        })
            .then((response) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'sign up has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/login')
            })
            .catch(async (err) => {
                // set value alert to active alert and call isAlert to remove alert (5 seconds)
                setAlert('error')
                const result = await isAlert();
            })
    }

    useEffect(() => {
        if (cookies.user) {
            navigate('/timeline')
        }
    }, [cookies.user])

    const responsive = screen.width
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 row-end-3 h-screen relative overflow-hidden justify-center items-center'>
            <Alert type={alert} message='Please input your email, username and password..' />
            <div className='w-full flex lg:col-span-2 justify-center items-center px-16 md:px-20'>
                <img className='md:h-[50vh] lg:h-[90vh] ' src={signupImg} alt="" />
            </div>
            <div className='w-full h-full px-5 lg:mb-16 md:h-[60vh] flex flex-col items-center'>
                <h1 className='font-bold text-3xl'>Sign up</h1>
                <form className='sm:w-72 lg:px-10 md:w-2/3 lg:w-72 px-5 pb-8 text-center flex flex-col items-center  '>
                    <FormInput
                        width='full'
                        mdWidth='96'
                        lgWidth='full'
                        inputCount={3}
                        placeholder={['username', 'Email', 'Password']}
                        inputType={['text', 'email', 'password']}
                        onChange={handleInputChange} />
                    <div className='text-start pt-3 text-xs'>
                        <p className='font-semibold'>Yor password need to have :</p>
                        <div className='px-2'>
                            <p className={`flex ${length ? 'text-green-600' : ''}`}>{length ? <BiCheck /> : ''} At least 8 characters with no space</p>
                            <p className={`flex ${upperCase ? 'text-green-600' : ''}`}>{upperCase ? <BiCheck /> : ''} At least 1 upper case letter</p>
                            <p className={`flex ${oneNumber ? 'text-green-600' : ''}`}>{oneNumber ? <BiCheck /> : ''} At least 1 number</p>
                        </div>
                    </div>
                    <button onClick={(e) => handleRegister(e)} className='w-full md:w-96 lg:w-full h-8 my-5 rounded-lg text-white font-semibold bg-orange-500'>Sign up</button>
                    <p className='text-sm'>Already have an account <span className='font-bold cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
                </form>
            </div>
            {responsive < 767
                ? < img className=' -z-10 mt-[95vh] ml-[20vw] absolute' src={graph} alt="" />
                : ''}
        </div>
    )
}

export default Register
