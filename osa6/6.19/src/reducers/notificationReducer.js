import { createSlice } from '@reduxjs/toolkit';
import store from '../store'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: null },
  reducers: {
    setNotification: (state, action) => {
      const { message, timeout } = action.payload;

      // Clear previous timeout
      if (state.notification && state.notification.timeoutId) {
        clearTimeout(state.notification.timeoutId);
      }

      // Set new timeout
      const timeoutId = setTimeout(() => {
        // Use Immer's draft syntax to directly modify the state
        store.dispatch(clearNotification())
      }, timeout * 1000);

      // Update state directly using Immer's draft syntax
      state.notification = {
        message,
        timeoutId,
      };
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
