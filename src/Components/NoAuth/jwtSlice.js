import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../app/api';

export const login = createAsyncThunk(
	'user/login',
	async (userLoginData, { rejectWithValue }) => {
		try {
			const { username, password } = userLoginData;
			const response = await api.login({username, password});
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
		token: '',
		status: 'idle',
		error: null,
	},
	reducers: {
		setJWT: (state, action) => {
			state.token = action.payload;
		},
		clearJWT: (state) => {
			state.token = '';
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				if (state.status === 'idle') {
					state.status = 'pending'
					state.token = ''
				}
			})
			.addCase(login.fulfilled, (state, action) => {
				if (state.status === 'pending') {
					state.status = 'idle'
					state.token = action.payload.jwt
				}
			})
			.addCase(login.rejected, (state, action) => {
				console.log(action);
				if (action.payload) {
					state.error = action.payload.errorMessage
				  } else {
					state.error = action.error.message
				  }
			})
		},
})

export const selectJWT = (state) =>{
	if (state && state.jwt.token) {
		return state.jwt.token;
	} else {
		return '';
	}
}

export const { setJWT, clearJWT } = jwtSlice.actions

export default jwtSlice.reducer