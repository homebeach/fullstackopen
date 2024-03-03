// NotificationContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload);
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notifications, notificationDispatch] = useReducer(notificationReducer, []);

  const addNotification = (message) => {
    const newNotification = {
      id: new Date().getTime(),
      message,
    };
    notificationDispatch({ type: ADD_NOTIFICATION, payload: newNotification });

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      notificationDispatch({ type: REMOVE_NOTIFICATION, payload: newNotification.id });
    }, 5000);
  };

  const removeNotification = (notificationId) => {
    notificationDispatch({ type: REMOVE_NOTIFICATION, payload: notificationId });
  };

  const notificationContextValue = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const { notifications } = useContext(NotificationContext);
  return notifications;
};

export const useNotificationDispatch = () => {
  const { addNotification, removeNotification } = useContext(NotificationContext);
  return { addNotification, removeNotification };
};

export default NotificationContext;
