import React, { useState, useEffect } from 'react'
import { BsFileImageFill } from 'react-icons/bs'
import axios, { AxiosRequestConfig } from 'axios';
import FormInput from '../Components/FormInput'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import { BiCheck } from 'react-icons/bi'
import Alert from '../Components/Alert'
import NavBack from '../Components/NavBack';
import LoadingSpinner from '../Components/LoadingSpinner';

const EditProfile = () => {
    const [loading, setLoading] = useState(true)
    const [isHover, setIsHover] = useState(false)
    const [cookies, setCookies] = useCookies<any>(['user'])
    const [data, setData] = useState([])
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [length, setLength] = useState(false)
    const [oneNumber, setOneNumber] = useState(false)
    const [upperCase, setUpperCase] = useState(false)
    const [confirmPw, setConfirmPw] = useState('')
    const [alert, setAlert] = useState('')
    const [pict, setPict] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [bigSizes, setBigSizes] = useState("false");

    // ALERT
    function isAlert() {
        return new Promise(resolve => {
            setTimeout(() => {
                setAlert('')
            }, 5000);
        });
    }

    // GET DATA PROFILE
    const getData = () => {
        axios.get(`https://cookit.my-extravaganza.site/users`, {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
            .then((response) => {
                const res: any = [response.data.data]
                setData(res)
                setUsername(response.data.data.username)
                setBio(response.data.data.bio)
                setLoading(false)
            })
            .catch((err) => { console.log(err) })
    }

    // CHECK VALIDATION PASSWORD
    const changePassword = (inputValues: any) => {
        setOldPw(inputValues[0])
        setNewPw(inputValues[1])
        setConfirmPw(inputValues[2])

        const regex = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        const isValidLength: any = /[a-zA-Z0-9]{8,}/.test(newPw);
        const isValidNumber = /[0-9]/.test(newPw);
        const isValidUpperCase = /[A-Z]/.test(newPw);
        setLength(isValidLength);
        setOneNumber(isValidNumber);
        setUpperCase(isValidUpperCase);
    }

    // UPDATE PASSWORD
    const updatePassword = () => {
        axios.put(`https://cookit.my-extravaganza.site/users/password`, {
            "old_password": oldPw,
            "new_password": newPw,
            "password_confirmation": confirmPw
        }, {
            headers: {
                Authorization: `Bearer ${cookies.user.token}`
            }
        })
    }

    // UPDATE DATA PROFILE
    const updateProfile = async () => {

        setLoading(true)
        if (oldPw && newPw && confirmPw != '') {
            if (newPw == confirmPw) {
                updatePassword()
            } else {
                setAlert('error')
                setLoading(false)
                const result = await isAlert();
                return false
            }
        }

        let formData = new FormData();
        formData.append("profile_picture", pict);
        formData.append("username", username);
        formData.append("bio", bio);
        if (formData != null) {
            axios.put('https://cookit.my-extravaganza.site/users', formData, {
                headers: {
                    Authorization: `Bearer ${cookies.user.token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
                .then((response) => {
                    setLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Update profile has been successful',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((err) => {
                    setLoading(false)
                    return (Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Maximum image size is 500kb',
                    }))
                });
        }
    }

    // REQUEST UPDATE ROLE  
    const upgradeAccount = () => {
        setLoading(true)
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.user.token}`
            },
        };

        fetch(`https://cookit.my-extravaganza.site/users/upgrade`, headers)
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Request has been successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => console.error(error));
        setLoading(false)
    }

    // GET URL IMG
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPict(e.target.files?.[0])
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target?.result?.toString() ?? '');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='bg-gray-100 h-screen'>
            <Alert type={alert} message='Please input the password correctly' />
            <NavBack title='Edit Profile' />
            {loading
                ? <div className='absolute w-full h-full bg-transparent flex items-center justify-center z-50'>
                    <LoadingSpinner />
                </div>
                : <div className='grid grid-cols-1 gap-3 lg:grid-cols-2 bg-gray-100 px-5 mx-auto'>
                    {data?.map((item: any, index: number) => {
                        return (
                            <div key={index} className='p-3 lg:h-screen  bg-white rounded-lg my-4'>
                                <input onChange={handleImageChange} className='hidden' id='pict' type="file" />
                                <div className='grid grid-cols-2 place-content-end items-center mb-10'>
                                    <label htmlFor='pict' onMouseLeave={() => setIsHover(false)} onMouseOver={() => setIsHover(true)} className='w-24 h-24 rounded-full cursor-pointer relative overflow-hidden flex justify-center items-center hover:brightness-50'>
                                        <BsFileImageFill className={`${isHover ? 'block' : 'hidden'} text-4xl text-white absolute z-30`} />
                                        <img className='rounded-full w-24 h-24' src={imageUrl ? imageUrl : item.profile_picture} alt="" />
                                    </label>
                                    <button onClick={updateProfile} className='w-24 lg:w-32 py-1 rounded-md place-self-center bg-secondary text-white'>Save</button>
                                </div>
                                <form action="" className='flex flex-col'>
                                    <label className='mt-5 font-bold'>Username</label>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='border-r border-l border-t border-b border-1 border-primary outline-none rounded-md px-2 py-1' />
                                    <label className='mt-5 font-bold'>Bio</label>
                                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='border-r border-l border-t border-b border-1 border-primary outline-none rounded-md px-2 py-1'></textarea>
                                    <label className='mt-5 font-bold '>Change password</label>
                                    <FormInput
                                        width='full'
                                        mdWidth='96'
                                        lgWidth='full'
                                        inputCount={3}
                                        placeholder={['Enter current password', 'Enter new password', 'Confirm new password']}
                                        inputType={['password', 'password', 'password']}
                                        onChange={changePassword}
                                    />
                                </form>
                                <div className='text-start pt-3 text-xs'>
                                    <p className='font-semibold'>Yor password need to have :</p>
                                    <div className='px-2'>
                                        <p className={`flex ${length ? 'text-green-600' : ''}`}>{length ? <BiCheck /> : ''} At least 8 characters with no space</p>
                                        <p className={`flex ${upperCase ? 'text-green-600' : ''}`}>{upperCase ? <BiCheck /> : ''} At least 1 upper case letter</p>
                                        <p className={`flex ${oneNumber ? 'text-green-600' : ''}`}>{oneNumber ? <BiCheck /> : ''} At least 1 number</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className='bg-white rounded-lg my-4'>
                        <section id="skills ">
                            <div className="container px-5 py-10 mx-auto">
                                <div className="pt-3">
                                    <h2 className="w-full text-center leading-border-text -mb-3 pr-2 pl-2">
                                        <span className="bg-white text-primary text-sm font-semibold">Request to be Verified</span>
                                    </h2>
                                    <div className="flex flex-wrap justify-center gap-5 px-5 pb-5 pt-4 border-b border-t border-r border-l border-primary rounded-md">
                                        <p>Verified users gain a purple checkmark and the ability to sell their recipes</p>
                                        <button onClick={() => upgradeAccount()} className='w-24 py-1 bg-secondary font-semibold rounded-md text-white'>Request</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditProfile
