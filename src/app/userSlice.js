import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';

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

export const verify = createAsyncThunk(
	'user/verify',
	async (tokenToVerify) => {
		const isTokenValid = await api.verifyToken(tokenToVerify);
		return isTokenValid;
	}
)

export const getCurrentUserInfo = createAsyncThunk(
	'user/getCurrent',
	async (token) => {
		const response = await api.getCurrentUser(token);
		return response.data;
	}
)

export const getFriends = createAsyncThunk(
	'user/getFriends',
	async (username) => {
		const response = await api.getAllFriends(username);
		return response.data;
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		token: {
			token: localStorage.getItem('token'),
			status: 'idle',
			error: null,
		},
		userInfo: {
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			birthDate: 0,
			displayName: '',
			userPage: {},
			userID: 0
		},
		friends: [],
	},
	reducers: {
		setToken: (state, action) => {
			state.token.token = action.payload;
		},
		clearToken: (state) => {
			state.token.token = '';
			localStorage.setItem("token", '');
			state.userInfo = {};
		},
		setInfo: (state, action) => {
			state.userInfo = {...state.userInfo, ...action.payload}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				if (state.token.status === 'idle') {
					state.token.status = 'pending'
					state.token.token = ''
				}
			})
			.addCase(login.fulfilled, (state, action) => {
				if (state.token.status === 'pending') {
					state.token.status = 'idle'
					state.token.token = action.payload.jwt
					localStorage.setItem("token", action.payload.jwt);
				}
			})
			.addCase(login.rejected, (state, action) => {
				if (action.payload) {
					state.token.error = action.payload.errorMessage
				  } else {
					state.token.error = action.error.message
				  }
			})
			.addCase(verify.fulfilled, (state, action) => {
				if (action.payload) {
					return
				  } else {
					state.token.token = '';
				  }
			})
			.addCase(getCurrentUserInfo.fulfilled, (state, action) => {
				state.userInfo = {...state.userInfo, ...action.payload}
			})
			.addCase(getFriends.fulfilled, (state, action) => {
				let friendsarr = action.payload.map((f) => f.userID);
				state.friends = friendsarr;
			})
		},
})

export const selectToken = (state) => {
	if (state && state.user.token.token) {
		return state.user.token.token;
	} else {
		return '';
	}
}

export const selectUserInfo = (state) => {
	if (state && state.user.userInfo.username) {
		return state.user.userInfo;
	} else {
		return {};
	}
}

export const selectFriends = (state) => {
	return state.user.friends;
}

export const { setToken, clearToken, } = userSlice.actions

export default userSlice.reducer