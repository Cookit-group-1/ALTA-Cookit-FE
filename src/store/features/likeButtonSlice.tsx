import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

interface LikedUsersState {
    ids: number[];
}

const initialState: LikedUsersState = {
    ids: [],
};

export const likeButtonSlice = createSlice({
    name: 'likeButton',
    initialState,
    reducers: {
        like: (state, action: PayloadAction<number>) => {
            state.ids = [...state.ids, action.payload];
        },
        unlike: (state, action: PayloadAction<number>) => {
            state.ids = state.ids.filter((id) => id !== action.payload);
        },
        setStateFromStorage: (state) => {
            const savedState = JSON.parse(localStorage.getItem('likeButton') || '{}');
            state.ids = savedState.ids || [];
        },
    },
});

export const setStateFromStorage = createAction('likeButton/setStateFromStorage');

export const { like, unlike } = likeButtonSlice.actions;
export default likeButtonSlice.reducer;