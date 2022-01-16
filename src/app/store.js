import { configureStore } from '@reduxjs/toolkit'
import jwtReducer from '../Components/NoAuth/jwtSlice'

export default configureStore({
  reducer: {
	  jwt: jwtReducer,
  },
})