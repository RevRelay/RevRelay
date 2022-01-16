import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiLogin from '../../API/APIQuery';
import axios from "axios";

export const login = createAsyncThunk(
	'user/login',
	async (userLoginData, { rejectWithValue }) => {
		try {
			//const { username, password } = userLoginData;
			//const response = await apiLogin({username, password})();
			const response = await axios({
				method: 'post',
				url: 'http://localhost:5000/public/users/login',
				headers: { "Content-Type": "application/json" },
				data: {...userLoginData}
			})
			return response.data;
		} catch (err) {
			let error = err;
			if (!error.response) {
				throw err
			}
			return rejectWithValue(error.response.data);
		}
	}
)

export const jwtSlice = createSlice({
	name: 'jwt',
	initialState: {
		jwt: '',
		status: 'idle',
		error: null,
	},
	reducers: {
		setJWT: (state, action) => {
			state.jwt = action.payload;
		},
		clearJWT: (state) => {
			state.jwt = '';
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder
			.addCase(login.pending, (state) => {
				if (state.status === 'idle') {
				state.jwt = ''
				state.status = 'pending'
				}
			})
			.addCase(login.fulfilled, (state, action) => {
				if (state.status === 'pending') {
				state.status = 'idle'
				state.jwt = action.payload.jwt
				}
			})
			.addCase(login.rejected, (state, action) => {
				if (action.payload) {
					// Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
					state.error = action.payload.errorMessage
				  } else {
					state.error = action.error.message
				  }
			})
		},
})

export const selectJWT = (state) =>{
	if (state && state.jwt) {
		return state.jwt.jwt;
	} else {
		return '';
	}
}

export const { setJWT, clearJWT } = jwtSlice.actions

export default jwtSlice.reducer