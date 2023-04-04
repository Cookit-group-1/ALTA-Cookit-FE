import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { like, unlike } from '../store/features/likeButtonSlice';
import { MdFavorite } from 'react-icons/md';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface Props {
    id: number;
}

const LikeButton = ({ id }: Props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const endpoint = `https://cookit.my-extravaganza.site`
    const dispatch = useDispatch();
    const likedIds = useSelector((state: RootState) => state.likeButton.ids);
    const [likes, setLikes] = useState(0)

    const fetchRecipeDetails = async () => {
        try {
            const response = await axios.get(`${endpoint}/recipes/${id}/detail`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.user.token}`
                }
            });
            setLikes(response.data.data.total_like)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRecipeDetails;
    }, [endpoint]);

    useEffect(() => {
        localStorage.setItem('likeButton', JSON.stringify({ ids: likedIds }));
    }, [likedIds]);

    const handleLike = async () => {
        try {
            const response = await axios.post(`${endpoint}/recipes/${id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
        } catch (error) {
            console.error(error);
        }
    }

    const handleUnlike = async () => {
        try {
            const response = await axios.post(`${endpoint}/recipes/${id}/unlike`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${cookies.user.token}`
                    }
                });
        } catch (error) {
            console.error(error);
        }
    }

    const handleLikeClick = () => {
        if (!likedIds.includes(id)) {
            dispatch(like(id));
            handleLike();
        } else {
            dispatch(unlike(id));
            handleUnlike();
        }
    };

    return (
        <button
            className={`flex items-center gap-1 hover:cursor-pointer
                ${likedIds.includes(id) ? 'hover:text-secondary text-accent' : 'hover:text-accent'}`}
            onClick={handleLikeClick}
        >
            <MdFavorite className='text-xl' />
            {likedIds.includes(id) ? likes + 1 : likes}
        </button>
    );
};

export default LikeButton;
