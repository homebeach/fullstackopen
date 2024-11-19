import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: 'Test notification' },
  reducers: {
    setNotification: (state, action) => {
      return { ...state, notification: action.payload }; y
    },
    clearNotification: (state) => {
      // Clear notification immediately
      if (state.notification && state.notification.timeoutId) {
        clearTimeout(state.notification.timeoutId);
      }

      // Use Immer's draft syntax to directly modify the state
      state.notification = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
