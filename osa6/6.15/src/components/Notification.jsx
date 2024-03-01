// Notification.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification.notification);
  console.log(notification);

  const [displayNotification, setDisplayNotification] = useState(notification);

  useEffect(() => {
    // Update the local state when the Redux notification changes
    setDisplayNotification(notification);

    // Clear the notification after 5 seconds
    const timeoutId = setTimeout(() => {
      setDisplayNotification('');
    }, 5000);

    // Cleanup the timeout on component unmount or when notification changes
    return () => clearTimeout(timeoutId);
  }, [notification]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      {displayNotification}
    </div>
  );
};

export default Notification;
