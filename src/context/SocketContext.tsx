import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

// Local dev: adjust to match your server URL/port
const socket: Socket = io('http://localhost:3001');

export const SocketContext = createContext<Socket>(socket);

export const useSocket = () => useContext(SocketContext);
