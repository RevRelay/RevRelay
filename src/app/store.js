import { configureStore } from '@reduxjs/toolkit'
import jwtReducer from '../Components/NoAuth/JwtSlice'

export default configureStore({
  reducer: {
	  jwt: jwtReducer,
  },
})