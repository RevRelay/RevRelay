import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiBaseUrl, baseHeaders} from '../../API/APIQuery';

export const jwtSlice = createSlice({
	name: 'jwt',
	initialState: {
		jwt: '',
		status: '',
		error: {},
	},
	reducers: {
		setJWT: (state, action) => {
			state.jwt = action.payload;
		},
		clearJWT: (state) => {
			state.jwt = '';
		}
	},
})

export const selectJWT = state => state.jwt.jwt;

export const { setJWT, clearJWT } = jwtSlice.actions

export default jwtSlice.reducer