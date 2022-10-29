import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users.service';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state) => {
            state.error;
            state.isLoading = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceived, usersRequestFailed } = actions;

export const loadingUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsers = () => (state) => state.users.entities;

export default usersReducer;
