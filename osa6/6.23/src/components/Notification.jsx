// Notification.jsx or wherever you are rendering the notification
import React from 'react';
import { useNotificationValue } from '../NotificationContext'; // Update the path accordingly

const Notification = () => {
  const notifications = useNotificationValue();

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
