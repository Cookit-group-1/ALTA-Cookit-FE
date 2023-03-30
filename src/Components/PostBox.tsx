import React, { FC, useState } from 'react';

interface PostBoxProps {
    onSubmit: (post: string) => void;
    profilePicture: string
}

interface PostBoxState {
    post: string;
}

const PostBox: FC<PostBoxProps> = ({ onSubmit, profilePicture }) => {
    const [post, setPost] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(post);
        setPost('');
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
                        src={profilePicture}
                        className='inset-0 absolute w-full h-full object-cover rounded-full'
                    />
                </div>
            </div>

            <div className='w-10/12 flex flex-col gap-2 items-end'>
                <textarea className='input w-full input-primary h-20 py-2 font-light' placeholder='Add your comment' value={post} onChange={handleChange} />
                <button className='btn btn-primary sm:w-20 w-full sm:btn-sm' type="submit">Submit</button>
            </div>

        </form>
    );
};

export default PostBox;