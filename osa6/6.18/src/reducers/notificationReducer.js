import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: 'Test notification' },
  reducers: {
    setNotification: (state, action) => {
      return { ...state, notification: action.payload }; y
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
