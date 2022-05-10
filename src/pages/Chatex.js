//./component/socket.js
import React from 'react';
import io from "socket.io-client";
// import { SOCKET_URL } from "config";

export const socket = io('localhost:5000');
export const SocketContext = React.createContext();

//client

