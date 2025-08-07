import { useEffect } from 'react';
import { socket } from '../sockets/socket';
// import { socket } from '../sockets/socket';

export const useSocketNotifications = (userId, onNotification) => {
  useEffect(() => {
    if (!userId) return;

    // Connect socket
    socket.connect();

    // Register user ID with server
    socket.emit('register', userId);

    // Listen for notifications
    socket.on('new-notification', (data) => {
      console.log('🔔 Notification received:', data);
      onNotification(data); // call passed handler
    });

    // Clean up on unmount
    return () => {
      socket.off('new-notification');
      socket.disconnect();
    };
  }, [userId]);
};
