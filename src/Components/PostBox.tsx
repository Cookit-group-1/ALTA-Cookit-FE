import React, { FC, useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi'
import { useCookies } from 'react-cookie';
import axios from 'axios';

interface PostBoxProps {
    onSubmit: (post: string, postImage: File | null) => void;
    profilePicture?: string,
    placeholderText: string
}

interface PostBoxState {
    post: string;
    postImage: File | null;
}

const PostBox: FC<PostBoxProps> = ({ onSubmit, profilePicture, placeholderText }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [post, setPost] = useState('');
    const [postImage, setPostImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Profile Picture
    const [img, setImg] = React.useState<any>()

    const [loading, setLoading] = React.useState(true)
    const endpoint = `https://cookit.my-extravaganza.site/users`
    const fetchDataUser = async () => {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            setImg(response.data.data.profile_picture)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, [endpoint]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(post, postImage);
        setPost('');
        setPostImage(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost(event.target.value);
    };

    return (
        <form className='flex gap-2' onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className='w-2/12'>
                <div className='h-0 pb-1/1 relative hover:cursor-pointer'>
                    <img
                        src={loading ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` : img}
                        className='inset-0 absolute w-full h-full object-cover rounded-full'
                    />
                </div>
            </div>

            <div className='w-10/12 flex flex-col gap-2 items-end'>
                <textarea
                    className='input w-full input-primary h-20 py-2 font-light'
                    placeholder={placeholderText}
                    value={post}
                    onChange={handleChange} />
                {imagePreview && (
                    <div className='h-0 w-full pb-2/3 relative'>
                        <img
                            src={imagePreview} alt="Image preview"
                            className="inset-0 absolute w-full h-full object-cover rounded-lg"
                        />
                    </div>

                )}
                <div className='flex justify-between w-full flex-col sm:flex-row gap-2'>
                    <label className="btn btn-secondary  w-full sm:w-20 sm:btn-sm flex gap-2">
                        <input type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setPostImage(file || null);
                                if (file) {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onloadend = () => {
                                        setImagePreview(reader.result as string);
                                    };
                                } else {
                                    setImagePreview(null);
                                }
                            }}
                            style={{ display: 'none' }} />
                        <span className='text-3xl'>
                            <BiImageAdd />
                        </span>
                        {imagePreview ?
                            <span className='sm:hidden'>Change Image</span> :
                            <span className='sm:hidden'>Add Image</span>
                        }

                    </label>
                    <button className='btn btn-primary sm:w-20 w-full sm:btn-sm' type="submit">Submit</button>
                </div>

            </div>

        </form>
    );
};

export default PostBox;