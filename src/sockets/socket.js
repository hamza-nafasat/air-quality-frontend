import { io } from 'socket.io-client';
import getEnv from '../config/config';
// import getEnv from '../../config/config.js'; // adjust path

const baseUrl = getEnv('SERVER_URL'); // e.g. http://localhost:4000

export const socket = io(baseUrl, {
  autoConnect: false,
});

socket.on('connect', () => {
  console.log('✅ [Frontend] Connected to server via socket:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('❌ [Frontend] Disconnected from server:', reason);
});

socket.on('connect_error', (err) => {
  console.error('🚨 [Frontend] Socket connection error:', err.message);
});

// Listen for confirmation from backend
socket.on('registration-success', (data) => {
  console.log('🎉 [Frontend] Registration confirmed by server:', data);
});
