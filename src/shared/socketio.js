import { io } from "socket.io-client";


const token = localStorage.getItem("token");


const socket = io.connect("https://seuchidabackend.shop", {
  auth: {
    auth: token,
  },
});

export const initSocketConnection = () => {
  if (socket) return;
  socket = io.connect("https://seuchidabackend.shop", {
    auth: {
      auth: token,
    },
  });
};

export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return;
  }
  socket.disconnect();
  socket = undefined;
};

