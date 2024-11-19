// Notification.jsx
import { useSelector } from 'react-redux';

const Notification = () => {
  const state = useSelector((state) => state); // Log the entire state
  console.log('Redux State:', state);

  const notification = useSelector((state) => state.notification.notification); // Correct the path to the notification property
  console.log(notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
