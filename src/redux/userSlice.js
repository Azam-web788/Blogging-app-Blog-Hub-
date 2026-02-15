import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
  },
  reducers: {
    auth: (state , action) => {
    state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { auth } = userSlice.actions

export default userSlice.reducer