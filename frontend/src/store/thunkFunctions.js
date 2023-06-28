import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const registerUser = createAsyncThunk( 
    //userSlice.js(registerUser의 진행 상황에 따라 state와 action 규정, rejected되면 payload 보내주기)와 
    //index.js(backend에 요청 & body 보내주기)에서 사용됨
    'user/registerUser', //이후로는 payloadCreator
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/register`, //해당 backend API로 요청(post)
                body, //email, password, name, image
                {withCredentials: true}
            )

            return response.data; //payload //userSlice.js의 action.payload로 들어감
        } catch (error) { //만약 backend로부터 error를 받으면,
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message); //역시나 userSlic.js의 catch err 부분 payload로 들어감
        }
    }
)

//아래도 위와 유사한 방식으로 이름만 달리 작성

export const loginUser = createAsyncThunk(
    "user/loginUser", //이후로는 payloadCreator
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/login`,
                body, //email, password
                {withCredentials: true}
            )

            return response.data; //payload //userSlice.js의 action.payload로 들어감
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message); //역시나 userSlic.js의 catch err 부분 payload로 들어감
        }
    }
)


export const authUser = createAsyncThunk(
    "user/authUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/users/auth`,
                {withCredentials: true}
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/logout`,
                {withCredentials: true}
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)