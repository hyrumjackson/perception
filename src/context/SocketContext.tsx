import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('https://perception-server.onrender.com');

export const SocketContext = createContext<Socket>(socket);

export const useSocket = () => useContext(SocketContext);
